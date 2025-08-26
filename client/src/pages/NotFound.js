import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-midnight flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="text-6xl font-bold mb-4" style={{color:'#C9B07A'}}>404</div>
        <h1 className="text-3xl font-serif font-bold text-linen mb-4">
          Page Not Found
        </h1>
        <p className="text-linen/80 mb-8">
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="space-y-4">
          <Link to="/" className="btn-gold inline-flex items-center">
            <FiHome className="mr-2 w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full btn-gold-outline inline-flex items-center justify-center"
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

