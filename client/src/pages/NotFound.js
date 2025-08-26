import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="text-6xl font-bold text-satwa-500 mb-4">404</div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="space-y-4">
          <Link to="/" className="btn-primary inline-flex items-center">
            <FiHome className="mr-2 w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full btn-secondary inline-flex items-center justify-center"
          >
            <FiArrowLeft className="mr-2 w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

