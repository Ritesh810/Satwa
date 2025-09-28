import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../contexts/WishlistContext';
import { FiHeart, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

// Constants for animation durations
const DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  MEDIUM: 0.4,
  SLOW: 0.5,
  SLOWER: 0.6,
  VERY_SLOW: 0.8
};

// Constants for delays
const DELAYS = {
  SHORT: 0.1,
  NORMAL: 0.2,
  MEDIUM: 0.3,
  LONG: 0.5,
  VERY_LONG: 0.7,
  EXTRA_LONG: 0.9,
  SUPER_LONG: 1.0
};

// Centralized Animation Variants
const ANIMATION_VARIANTS = {
  // Page-level animations
  page: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATIONS.SLOW }
  },

  // Header animations
  header: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATIONS.SLOWER, delay: DELAYS.NORMAL }
  },

  headerTitle: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATIONS.SLOWER, delay: DELAYS.MEDIUM }
  },

  headerSubtitle: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: DURATIONS.SLOWER, delay: DELAYS.VERY_LONG }
  },

  headerLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: DURATIONS.SLOWER, delay: DELAYS.MEDIUM }
  },

  // Stagger containers
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: DELAYS.SHORT,
        delayChildren: DELAYS.MEDIUM
      }
    }
  },

  // Item animations
  item: {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: DURATIONS.FAST } },
    transition: { duration: DURATIONS.MEDIUM }
  },

  itemHover: {
    y: -8,
    scale: 1.02,
    transition: { duration: DURATIONS.NORMAL }
  },

  itemShadow: {
    hover: {
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { duration: DURATIONS.NORMAL }
    }
  },

  // Empty state animations
  emptyState: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: DURATIONS.SLOWER, delay: DELAYS.NORMAL }
  },

  emptyHeartIcon: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { 
      duration: DURATIONS.VERY_SLOW, 
      delay: DELAYS.MEDIUM, 
      type: "spring", 
      stiffness: 100 
    }
  },

  emptyHeartPulse: {
    animate: { 
      scale: [1, 1.1, 1],
      opacity: [0.4, 0.6, 0.4]
    },
    transition: { 
      duration: 2, 
      repeat: Infinity,
      ease: "easeInOut"
    }
  },

  emptyTitle: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATIONS.SLOWER, delay: DELAYS.LONG }
  },

  emptyDescription: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATIONS.SLOWER, delay: DELAYS.VERY_LONG }
  },

  emptyButton: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATIONS.SLOWER, delay: DELAYS.EXTRA_LONG }
  },

  emptyButtonHover: {
    scale: 1.05,
    y: -2,
    transition: { duration: DURATIONS.NORMAL }
  },

  emptyButtonTap: {
    scale: 0.95,
    transition: { duration: DURATIONS.FAST }
  },

  // Clear button animations
  clearButton: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: DURATIONS.MEDIUM, delay: DELAYS.LONG }
  },

  clearButtonHover: {
    scale: 1.05,
    x: -2,
    transition: { duration: DURATIONS.NORMAL }
  },

  clearButtonTap: {
    scale: 0.95,
    transition: { duration: DURATIONS.FAST }
  },

  clearButtonIcon: {
    hover: {
      rotate: 10,
      transition: { duration: DURATIONS.FAST }
    }
  },

  // Wishlist badge animations
  wishlistBadge: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { 
      duration: DURATIONS.MEDIUM,
      type: "spring",
      stiffness: 200
    }
  },

  wishlistBadgeHover: {
    scale: 1.1,
    rotate: 10,
    transition: { duration: DURATIONS.NORMAL }
  },

  // Counter animation
  counter: {
    initial: { scale: 1.2, color: "#C9B07A" },
    animate: { scale: 1, color: "#6B7280" },
    transition: { duration: DURATIONS.NORMAL }
  },

  // Arrow animation
  arrow: {
    animate: { x: [0, 4, 0] },
    transition: { duration: 1.5, repeat: Infinity }
  },

  // Footer message
  footerMessage: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DURATIONS.SLOWER, delay: DELAYS.SUPER_LONG }
  },

  footerMessagePulse: {
    animate: { opacity: [0.7, 1, 0.7] },
    transition: { duration: 2, repeat: Infinity }
  }
};

// Animated Heart Icon Component
const AnimatedHeartIcon = React.memo(() => (
  <motion.div
    className="text-gray-400 mb-6"
    variants={ANIMATION_VARIANTS.emptyHeartIcon}
    initial="initial"
    animate="animate"
  >
    <motion.div
      variants={ANIMATION_VARIANTS.emptyHeartPulse}
      animate="animate"
    >
      <FiHeart className="w-24 h-24 mx-auto" />
    </motion.div>
  </motion.div>
));

// Animated Clear Button Component
const AnimatedClearButton = React.memo(({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
    aria-label="Clear entire wishlist"
    variants={ANIMATION_VARIANTS.clearButton}
    initial="initial"
    animate="animate"
    whileHover={ANIMATION_VARIANTS.clearButtonHover}
    whileTap={ANIMATION_VARIANTS.clearButtonTap}
  >
    <motion.div
      variants={ANIMATION_VARIANTS.clearButtonIcon}
      whileHover="hover"
    >
      <FiTrash2 />
    </motion.div>
    Clear All
  </motion.button>
));

// Animated Product Item Component
const AnimatedProductItem = React.memo(({ product, index, onRemove }) => (
  <motion.div
    key={product.id}
    variants={ANIMATION_VARIANTS.item}
    initial="initial"
    animate="animate"
    exit="exit"
    layout
    layoutId={`wishlist-item-${product.id}`}
    whileHover={ANIMATION_VARIANTS.itemHover}
  >
    <motion.div
      className="relative"
      variants={ANIMATION_VARIANTS.itemShadow}
      whileHover="hover"
    >
      <ProductCard
        product={product}
        onRemoveFromWishlist={onRemove}
      />
      
      {/* Wishlist Badge */}
      <motion.div
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm"
        variants={ANIMATION_VARIANTS.wishlistBadge}
        initial="initial"
        animate="animate"
        transition={{ 
          ...ANIMATION_VARIANTS.wishlistBadge.transition,
          delay: index * DELAYS.SHORT + DELAYS.LONG
        }}
        whileHover={ANIMATION_VARIANTS.wishlistBadgeHover}
      >
        <FiHeart className="w-4 h-4 fill-current" />
      </motion.div>
    </motion.div>
  </motion.div>
));

// Empty State Component
const EmptyState = React.memo(() => (
  <motion.div 
    className="pt-16 lg:pt-20 min-h-screen bg-gray-50"
    variants={ANIMATION_VARIANTS.page}
    initial="initial"
    animate="animate"
  >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div 
        className="text-center"
        variants={ANIMATION_VARIANTS.emptyState}
        initial="initial"
        animate="animate"
      >
        <AnimatedHeartIcon />
        
        <motion.h1 
          className="text-3xl font-serif font-bold text-gray-900 mb-4"
          variants={ANIMATION_VARIANTS.emptyTitle}
          initial="initial"
          animate="animate"
        >
          Your wishlist is empty
        </motion.h1>
        
        <motion.p 
          className="text-gray-600 mb-8 max-w-md mx-auto"
          variants={ANIMATION_VARIANTS.emptyDescription}
          initial="initial"
          animate="animate"
        >
          Start adding items to your wishlist to save them for later.
        </motion.p>
        
        <motion.div
          variants={ANIMATION_VARIANTS.emptyButton}
          initial="initial"
          animate="animate"
        >
          <Link to="/shop">
            <motion.button
              className="btn-primary inline-flex items-center gap-2"
              whileHover={ANIMATION_VARIANTS.emptyButtonHover}
              whileTap={ANIMATION_VARIANTS.emptyButtonTap}
            >
              <FiShoppingBag />
              <span>Start Shopping</span>
              <motion.span
                variants={ANIMATION_VARIANTS.arrow}
                animate="animate"
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
));

const PriceRangeSlider = React.memo(({ priceRange, setPriceRange }) => {
  const [localRange, setLocalRange] = useState(priceRange);
  
  // Debounce price changes
  useEffect(() => {
    const timer = setTimeout(() => setPriceRange(localRange), 300);
    return () => clearTimeout(timer);
  }, [localRange, setPriceRange]);

  return (
    <div className="space-y-4">
      {/* Dual range slider implementation */}
    </div>
  );
});

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
    return <EmptyState />;
  }

  return (
    <motion.div 
      className="pt-16 lg:pt-20 min-h-screen bg-gray-50"
      variants={ANIMATION_VARIANTS.page}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={ANIMATION_VARIANTS.header}
          initial="initial"
          animate="animate"
        >
          <motion.div
            variants={ANIMATION_VARIANTS.headerLeft}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-2"
              variants={ANIMATION_VARIANTS.headerTitle}
              initial="initial"
              animate="animate"
            >
              My Wishlist
            </motion.h1>
            
            <motion.p 
              className="text-gray-600"
              variants={ANIMATION_VARIANTS.headerSubtitle}
              initial="initial"
              animate="animate"
            >
              <motion.span
                key={items.length}
                variants={ANIMATION_VARIANTS.counter}
                initial="initial"
                animate="animate"
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
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="popLayout">
            {items.map((product, index) => (
              <AnimatedProductItem
                key={product.id}
                product={product}
                index={index}
                onRemove={() => handleRemoveItem(product.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer Message */}
        {items.length > 0 && (
          <motion.div
            className="mt-12 text-center"
            variants={ANIMATION_VARIANTS.footerMessage}
            initial="initial"
            animate="animate"
          >
            <motion.p 
              className="text-gray-500 text-sm"
              variants={ANIMATION_VARIANTS.footerMessagePulse}
              animate="animate"
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