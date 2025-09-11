import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const Wishlist = () => {
  // No changes needed here, the context hook is well-used
  const { items, removeFromWishlist, clearWishlist } = useWishlist();

  // The removal handler is now passed down to the child component
  const handleRemoveItem = (productId) => {
    removeFromWishlist(productId);
    toast.success('Removed from wishlist');
  };

  // ADDED: Confirmation dialog for a destructive action
  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
      toast.success('Wishlist cleared');
    }
  };

  // The empty state is already well-implemented, no changes needed
  if (items.length === 0) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-gray-400 mb-6">
              <FiHeart className="w-24 h-24 mx-auto" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Your wishlist is empty
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding items to your wishlist to save them for later.
            </p>
            <Link to="/shop" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600">
              {items.length} item{items.length !== 1 ? 's' : ''} in your wishlist
            </p>
          </div>
          <button
            onClick={handleClearWishlist}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            aria-label="Clear entire wishlist" // Added for accessibility
          >
            <FiTrash2 />
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            // MODIFIED: Pass the handler function as a prop
            <ProductCard
              key={product.id}
              product={product}
              onRemoveFromWishlist={() => handleRemoveItem(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;