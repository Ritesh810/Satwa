import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiX, FiPlus, FiMinus, FiShoppingBag, FiLock, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { useCart } from '../contexts/CartContext';

// Animation variants
const ANIMATION_VARIANTS = {
  fadeSlideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  },
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  },
  slideX: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
  },
  button: {
    hover: { scale: 1.02, y: -2 },
    tap: { scale: 0.98 }
  }
};

// Optimized Loading Skeleton Component
const CartLoadingSkeleton = React.memo(() => (
  <div className="min-h-screen bg-linen py-[100px]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-10 bg-gray-200 rounded w-48 mb-8 animate-pulse" />
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex space-x-4">
                <div className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

// Optimized Cart Header Component
const CartHeader = React.memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12 pt-16 lg:pt-20" // Added top padding here
  >
    <motion.h1 
      className="text-4xl font-serif font-bold text-gray-900 mb-4"
      animate={{ 
        textShadow: ["0 0 0px rgba(201, 176, 122, 0)", "0 0 20px rgba(201, 176, 122, 0.3)", "0 0 0px rgba(201, 176, 122, 0)"]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      Shopping Cart
    </motion.h1>
    <motion.div 
      className="w-24 h-1 bg-gradient-to-r from-polishedGold to-yellow-400 mx-auto rounded-full"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />
  </motion.div>
));

// Floating Particles Component for Empty Cart
const FloatingParticles = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-polishedGold/30 rounded-full"
        style={{
          left: `${30 + i * 10}%`,
          top: `${40 + i * 5}%`
        }}
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: 3 + i * 0.5,
          repeat: Infinity,
          delay: i * 0.3,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
));

// Optimized Empty Cart Component  
const EmptyCartComponent = React.memo(() => (
  <motion.div 
    className="text-center py-20 relative"
    variants={ANIMATION_VARIANTS.fadeSlideUp}
    initial="initial"
    animate="animate"
    transition={{ duration: 0.8 }}
  >
    <FloatingParticles />
    
    <motion.div
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <FiShoppingBag className="mx-auto text-6xl text-gray-400 mb-6" />
    </motion.div>
    
    <motion.h2 
      className="text-2xl font-semibold text-gray-900 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      Your cart is empty
    </motion.h2>
    
    <motion.p 
      className="text-gray-600 mb-8 max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      Discover our beautiful collection of handcrafted jewelry and find pieces that speak to your style.
    </motion.p>
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      whileHover={ANIMATION_VARIANTS.button.hover}
      whileTap={ANIMATION_VARIANTS.button.tap}
    >
      <Link
        to="/shop"
        className="btn-gold inline-flex items-center relative overflow-hidden group"
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-polishedGold opacity-0 group-hover:opacity-20"
          whileHover={{ scale: 1.5 }}
          transition={{ duration: 0.3 }}
        />
        <FiShoppingBag className="mr-2 w-5 h-5" />
        <span className="relative">Start Shopping</span>
      </Link>
    </motion.div>
  </motion.div>
));

// Optimized Quantity Controls Component
const QuantityControls = React.memo(({ item, updateQuantity }) => (
  <motion.div 
    className="flex items-center space-x-3"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.button
      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
      whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
      whileTap={{ scale: 0.9 }}
      disabled={item.quantity <= 1}
    >
      <FiMinus className="w-4 h-4" />
    </motion.button>
    
    <motion.span 
      className="w-12 text-center font-semibold"
      key={item.quantity}
      initial={{ scale: 1.2, color: "#C9B07A" }}
      animate={{ scale: 1, color: "#374151" }}
      transition={{ duration: 0.2 }}
    >
      {item.quantity}
    </motion.span>
    
    <motion.button
      onClick={() => updateQuantity(item.id, item.quantity + 1)}
      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
      whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
      whileTap={{ scale: 0.9 }}
    >
      <FiPlus className="w-4 h-4" />
    </motion.button>
  </motion.div>
));

// Optimized Cart Item Card Component
const CartItemCard = React.memo(({ item, updateQuantity, removeItem, formatPrice }) => (
  <motion.div
    layout
    variants={ANIMATION_VARIANTS.fadeSlideUp}
    initial="initial"
    animate="animate"
    exit="exit"
    className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden group"
    whileHover={{ 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      y: -2
    }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <motion.div
      className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-polishedGold to-yellow-400 origin-left"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    />

    <div className="flex space-x-4">
      <motion.div 
        className="relative w-24 h-24 bg-gray-200 rounded-lg overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-polishedGold/10 to-transparent opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{item.category}</p>
            <motion.p 
              className="text-lg font-bold text-midnight"
              key={item.price}
              initial={{ scale: 0.9, color: "#C9B07A" }}
              animate={{ scale: 1, color: "#0D1B2A" }}
              transition={{ duration: 0.3 }}
            >
              {formatPrice(item.price)}
            </motion.p>
          </motion.div>

          <motion.button
            onClick={() => {
              removeItem(item.id);
              toast.success('Item removed from cart');
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <QuantityControls 
            item={item}
            updateQuantity={updateQuantity}
          />
          
          <motion.div 
            className="text-lg font-bold text-gray-900"
            key={item.price * item.quantity}
            initial={{ scale: 0.9, color: "#C9B07A" }}
            animate={{ scale: 1, color: "#111827" }}
            transition={{ duration: 0.3 }}
          >
            {formatPrice(item.price * item.quantity)}
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
));

// Optimized Cart Items List Component
const CartItemsList = React.memo(({ items, updateQuantity, removeItem, clearCart, formatPrice }) => (
  <div className="lg:col-span-2">
    <motion.div 
      className="flex justify-between items-center mb-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold text-gray-900">
        Cart Items ({items.length})
      </h2>
      
      <motion.button
        onClick={() => {
          clearCart();
          toast.success('Cart cleared successfully!');
        }}
        className="text-red-600 hover:text-red-700 flex items-center text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiTrash2 className="mr-1 w-4 h-4" />
        Clear Cart
      </motion.button>
    </motion.div>

    <motion.div 
      className="space-y-4"
      variants={ANIMATION_VARIANTS.staggerContainer}
      initial="initial"
      animate="animate"
    >
      <AnimatePresence>
        {items.map((item) => (
          <CartItemCard 
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            formatPrice={formatPrice}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  </div>
));

// Optimized Summary Row Component
const SummaryRow = React.memo(({ label, value, valueKey, isShipping = false }) => (
  <motion.div 
    className="flex justify-between text-gray-600"
    variants={ANIMATION_VARIANTS.fadeSlideUp}
  >
    <span>{label}</span>
    <motion.span
      key={valueKey}
      initial={{ scale: 0.9, color: isShipping && value === 'Free' ? "#10b981" : "#C9B07A" }}
      animate={{ scale: 1, color: isShipping && value === 'Free' ? "#10b981" : "#6b7280" }}
      transition={{ duration: 0.3 }}
    >
      {value}
    </motion.span>
  </motion.div>
));

// Optimized Free Shipping Notice Component
const FreeShippingNotice = React.memo(({ shipping, subtotal, formatPrice }) => (
  <AnimatePresence>
    {shipping > 0 && (
      <motion.div 
        className="text-sm text-midnight bg-linen p-3 rounded-lg" 
        style={{border:'1px solid #C9B07A'}}
        initial={{ opacity: 0, height: 0, scale: 0.9 }}
        animate={{ opacity: 1, height: 'auto', scale: 1 }}
        exit={{ opacity: 0, height: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Add ${formatPrice(100 - subtotal).replace('$', '')} more for free shipping
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
));

// Optimized Checkout Buttons Component
const CheckoutButtons = React.memo(() => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      whileHover={ANIMATION_VARIANTS.button.hover}
      whileTap={ANIMATION_VARIANTS.button.tap}
    >
      <Link
        to="/checkout"
        className="w-full mt-6 btn-gold flex items-center justify-center relative overflow-hidden group"
      >
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-polishedGold to-yellow-400 opacity-0 group-hover:opacity-20"
          whileHover={{ scale: 1.5 }}
          transition={{ duration: 0.3 }}
        />
        <FiLock className="mr-2 w-5 h-5" />
        <span className="relative">Proceed to Checkout</span>
      </Link>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      whileHover={ANIMATION_VARIANTS.button.hover}
      whileTap={ANIMATION_VARIANTS.button.tap}
    >
      <Link
        to="/shop"
        className="w-full mt-4 btn-gold-outline flex items-center justify-center relative overflow-hidden group"
      >
        <motion.div
          animate={{ x: [0, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <FiArrowLeft className="mr-2 w-5 h-5" />
        </motion.div>
        Continue Shopping
      </Link>
    </motion.div>
  </>
));

// Optimized Security Notice Component
const SecurityNotice = React.memo(() => (
  <motion.div 
    className="mt-6 p-4 bg-gray-50 rounded-lg"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1, duration: 0.5 }}
    whileHover={{ backgroundColor: "#f3f4f6" }}
  >
    <motion.div 
      className="flex items-center space-x-2 text-sm text-gray-600"
      whileHover={{ color: "#4b5563" }}
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FiLock className="w-4 h-4" />
      </motion.div>
      <span>Secure checkout with SSL encryption</span>
    </motion.div>
  </motion.div>
));

// Optimized Order Summary Component
const OrderSummary = React.memo(({ items, cartTotals, formatPrice }) => {
  const { subtotal, shipping, tax, total } = cartTotals;

  return (
    <motion.div 
      className="lg:col-span-1"
      variants={ANIMATION_VARIANTS.fadeSlideUp}
      initial="initial"
      animate="animate"
      transition={{ delay: 0.3 }}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
        whileHover={{ 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.h2 
          className="text-xl font-semibold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Order Summary
        </motion.h2>
        
        <motion.div 
          className="space-y-4"
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="initial"
          animate="animate"
        >
          <SummaryRow label={`Subtotal (${items.length} items)`} value={formatPrice(subtotal)} valueKey={subtotal} />
          <SummaryRow 
            label="Shipping" 
            value={shipping === 0 ? 'Free' : formatPrice(shipping)} 
            valueKey={shipping}
            isShipping={true}
          />
          <SummaryRow label="Tax" value={formatPrice(tax)} valueKey={tax} />
          
          <FreeShippingNotice shipping={shipping} subtotal={subtotal} formatPrice={formatPrice} />
          
          <motion.div 
            className="border-t border-gray-200 pt-4"
            variants={ANIMATION_VARIANTS.fadeSlideUp}
          >
            <motion.div 
              className="flex justify-between text-lg font-bold text-gray-900"
              key={total}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <span>Total</span>
              <motion.span
                animate={{ color: ["#111827", "#C9B07A", "#111827"] }}
                transition={{ duration: 1 }}
              >
                {formatPrice(total)}
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>

        <CheckoutButtons />
        <SecurityNotice />
      </motion.div>
    </motion.div>
  );
});

// Lazy loaded Recommended Products
const RecommendedProducts = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-2xl font-serif font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              You might also like
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={ANIMATION_VARIANTS.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
            >
              {[...Array(4)].map((_, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-4 text-center group"
                  variants={ANIMATION_VARIANTS.fadeSlideUp}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className="w-full h-48 bg-gray-200 rounded-lg mb-4 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-polishedGold/10 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  <motion.h3 
                    className="font-semibold text-gray-900 mb-2"
                    whileHover={{ color: "#C9B07A" }}
                    transition={{ duration: 0.2 }}
                  >
                    Recommended Product
                  </motion.h3>
                  
                  <p className="text-gray-600 text-sm mb-2">Discover more beautiful pieces</p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/shop" 
                      className="text-midnight inline-flex items-center group" 
                      style={{color:'#0D1B2A'}}
                    >
                      Shop Now 
                      <motion.span
                        className="ml-1"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )
      });
    }, 500);
  });
});

// Skeleton for Recommended Products
const RecommendedProductsSkeleton = React.memo(() => (
  <div className="mt-16">
    <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-lg p-4">
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
        </div>
      ))}
    </div>
  </div>
));

// Optimized Main Cart Component
const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Optimized calculations with useMemo
  const cartTotals = useMemo(() => {
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  }, [items]);

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  if (isLoading) {
    return <CartLoadingSkeleton />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-linen py-12 pt-20 lg:pt-24" // Increased top padding
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CartHeader />

        {items.length === 0 ? (
          <EmptyCartComponent />
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <CartItemsList 
              items={items}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              clearCart={clearCart}
              formatPrice={formatPrice}
            />
            
            <OrderSummary 
              items={items}
              cartTotals={cartTotals}
              formatPrice={formatPrice}
            />
          </div>
        )}

        <Suspense fallback={<RecommendedProductsSkeleton />}>
          <RecommendedProducts />
        </Suspense>
      </div>
    </motion.div>
  );
};

export default Cart;
