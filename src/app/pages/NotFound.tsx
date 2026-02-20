
import React from 'react';
import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-600 mb-8">This page is lost in the wilderness.</p>
      <Link to="/" className="text-blue-600 font-semibold hover:underline">
        Go Home
      </Link>
    </div>
  );
}
