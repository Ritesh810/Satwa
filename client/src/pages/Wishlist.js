import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../contexts/WishlistContext';
import { FiHeart, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const headerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.2 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  transition: { duration: 0.4 }
};

const emptyStateVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, delay: 0.2 }
};

// Animated Heart Icon Component
const AnimatedHeartIcon = () => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
    className="text-gray-400 mb-6"
  >
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.4, 0.6, 0.4]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <FiHeart className="w-24 h-24 mx-auto" />
    </motion.div>
  </motion.div>
);

// Animated Clear Button Component
const AnimatedClearButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
    aria-label="Clear entire wishlist"
    whileHover={{ scale: 1.05, x: -2 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: 0.5 }}
  >
    <motion.div
      whileHover={{ rotate: 10 }}
      transition={{ duration: 0.2 }}
    >
      <FiTrash2 />
    </motion.div>
    Clear All
  </motion.button>
);

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();

  const handleRemoveItem = (productId) => {
    removeFromWishlist(productId);
    toast.success('Removed from wishlist');
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
      toast.success('Wishlist cleared');
    }
  };

  // Empty state with animations
  if (items.length === 0) {
    return (
      <motion.div 
        className="pt-16 lg:pt-20 min-h-screen bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            className="text-center"
            variants={emptyStateVariants}
            initial="initial"
            animate="animate"
          >
            <AnimatedHeartIcon />
            
            <motion.h1 
              className="text-3xl font-serif font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Your wishlist is empty
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 mb-8 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Start adding items to your wishlist to save them for later.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Link to="/shop">
                <motion.button
                  className="btn-primary inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiShoppingBag />
                  <span>Start Shopping</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="pt-16 lg:pt-20 min-h-screen bg-gray-50"
      {...pageVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={headerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h1 
              className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              My Wishlist
            </motion.h1>
            
            <motion.p 
              className="text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.span
                key={items.length}
                initial={{ scale: 1.2, color: "#C9B07A" }}
                animate={{ scale: 1, color: "#6B7280" }}
                transition={{ duration: 0.3 }}
              >
                {items.length}
              </motion.span>
              {' '}item{items.length !== 1 ? 's' : ''} in your wishlist
            </motion.p>
          </motion.div>

          <AnimatedClearButton onClick={handleClearWishlist} />
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="popLayout">
            {items.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
                layoutId={`wishlist-item-${product.id}`}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ 
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    product={product}
                    onRemoveFromWishlist={() => handleRemoveItem(product.id)}
                  />
                  
                  {/* Wishlist Badge */}
                  <motion.div
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.1 + 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 10
                    }}
                  >
                    <FiHeart className="w-4 h-4 fill-current" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer Message */}
        {items.length > 0 && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.p 
              className="text-gray-500 text-sm"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💡 Items in your wishlist are saved for 30 days
            </motion.p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Wishlist;