import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-polishedGold/40 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-xs font-bold px-2 py-1 rounded-full" style={{background:'#C9B07A', color:'#0D1B2A'}}>
            -{discountPercentage}%
          </span>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
          isInWishlist(product.id)
            ? 'bg-red-500 text-white'
            : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
        }`}
      >
        <FiHeart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden rounded-t-xl">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center space-x-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            className="bg-polishedGold text-midnight p-3 rounded-full hover:brightness-110 transition-colors duration-200"
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="bg-polishedGold text-midnight p-3 rounded-full hover:brightness-110 transition-colors duration-200"
          >
            <FiEye className="w-5 h-5" />
          </Link>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category */}
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
          {product.category}
        </p>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-polishedGold transition-colors line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Material */}
        <p className="text-sm text-gray-600 mb-4">
          {product.material}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`mt-auto w-full py-2 px-4 rounded-full font-medium transition-all duration-200 ${
            product.inStock
              ? 'bg-polishedGold text-midnight hover:brightness-110 transform hover:scale-[1.02]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
