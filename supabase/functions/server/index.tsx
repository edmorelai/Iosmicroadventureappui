import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper to get user from token
async function getUser(req: Request) {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  );
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) return null;
  
  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) return null;
  return user;
}

// Health check endpoint
app.get("/make-server-3db49237/health", (c) => {
  return c.json({ status: "ok" });
});

// Game State Routes
app.get("/make-server-3db49237/game-state", async (c) => {
  const user = await getUser(c.req.raw);
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const key = `user_state:${user.id}`;
    // Using kv.get(key)
    // The key value store returns { key, value } structure or just value depending on implementation
    // kv_store.tsx 'get' returns just the value (JSONB)
    const state = await kv.get(key);
    
    if (!state) {
      return c.json({ state: null });
    }
    
    return c.json({ state: state.value });
  } catch (error) {
    console.error("Error fetching game state:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

app.post("/make-server-3db49237/game-state", async (c) => {
  const user = await getUser(c.req.raw);
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const { state } = await c.req.json();
    if (!state) {
      return c.json({ error: "Missing state" }, 400);
    }

    const key = `user_state:${user.id}`;
    // We wrap state in an object just in case, or store directly.
    // Let's store { value: state } to match GET structure if needed, 
    // or just store 'state' directly. 
    // kv_store.ts 'get' returns 'data?.value'. If we store { value: ... } then we get { value: ... }.
    // Let's store the state object directly as the value.
    await kv.set(key, { value: state });
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving game state:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// Auth Routes (Sign Up) - As per instructions
app.post("/make-server-3db49237/signup", async (c) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );
  
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: "Email and password required" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || 'Explorer' },
      email_confirm: true
    });

    if (error) {
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

Deno.serve(app.fetch);
