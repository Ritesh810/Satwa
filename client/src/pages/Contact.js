import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiHelpCircle, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Ultra-Optimized Animation Variants with Hardware Acceleration
const ANIMATION_VARIANTS = {
  pageEnter: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    transition: { 
      duration: 0.4, 
      ease: [0.6, -0.05, 0.01, 0.99],
      when: "beforeChildren"
    }
  },
  
  heroText: {
    initial: { opacity: 0, y: 20, rotateX: -10 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100
    }
  },
  
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  },
  
  fastStagger: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  },
  
  fadeSlideUp: {
    initial: { opacity: 0, y: 25, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { 
      duration: 0.4, 
      ease: "easeOut",
      type: "spring",
      stiffness: 150,
      damping: 20
    }
  },
  
  fadeSlideLeft: {
    initial: { opacity: 0, x: -25, rotateY: -3 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    transition: { 
      duration: 0.5, 
      ease: "easeOut",
      type: "spring",
      stiffness: 120
    }
  },
  
  fadeSlideRight: {
    initial: { opacity: 0, x: 25, rotateY: 3 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    transition: { 
      duration: 0.5, 
      ease: "easeOut",
      type: "spring",
      stiffness: 120
    }
  },
  
  scaleIn: {
    initial: { scale: 0.9, opacity: 0, rotateZ: -1 },
    animate: { scale: 1, opacity: 1, rotateZ: 0 },
    transition: { 
      duration: 0.4, 
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 180
    }
  },
  
  button: {
    hover: { 
      scale: 1.03, 
      y: -3,
      rotate: 0.5,
      boxShadow: "0 15px 30px -5px rgba(201, 176, 122, 0.3)",
      backgroundColor: "#B8A067"
    },
    tap: { 
      scale: 0.97,
      y: 0,
      rotate: 0,
      transition: { duration: 0.1 }
    },
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 17,
      mass: 0.8
    }
  },
  
  formField: {
    focus: { 
      scale: 1.02,
      rotateZ: 0.2,
      boxShadow: "0 0 0 3px rgba(201, 176, 122, 0.15), 0 8px 25px -8px rgba(201, 176, 122, 0.2)",
      borderColor: "#C9B07A"
    },
    transition: { 
      duration: 0.2,
      type: "spring",
      stiffness: 300
    }
  },
  
  magneticHover: {
    rest: { x: 0, y: 0, scale: 1, rotate: 0 },
    hover: { 
      x: 2, 
      y: -2, 
      scale: 1.05,
      rotate: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    }
  },
  
  pulseGlow: {
    animate: {
      boxShadow: [
        "0 0 0px rgba(201, 176, 122, 0)",
        "0 0 20px rgba(201, 176, 122, 0.4)",
        "0 0 0px rgba(201, 176, 122, 0)"
      ],
      scale: [1, 1.02, 1]
    },
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  floatingOrb: {
    animate: {
      y: [0, -25, 0],
      x: [0, 15, 0],
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.3, 1],
      rotate: [0, 180, 360]
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "reverse"
    }
  }
};

// Ultra-Optimized Floating Orbs with GPU Acceleration
const FloatingOrbs = React.memo(() => {
  const orbsData = useMemo(() => 
    [...Array(8)].map((_, i) => ({
      id: i,
      left: 15 + (i * 12) % 70,
      top: 20 + (i * 8) % 60,
      delay: i * 0.3,
      duration: 5 + (i % 3),
      scale: 0.8 + (i % 3) * 0.2
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbsData.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full bg-gradient-to-br from-linen/30 to-polishedGold/20"
          style={{
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: `${orb.scale * 8}px`,
            height: `${orb.scale * 8}px`,
            willChange: 'transform, opacity'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [orb.scale, orb.scale * 1.5, orb.scale],
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
});

// Ultra-Optimized Form Field with Smart Validation
const FormField = React.memo(({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  rows,
  isTextarea = false 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(null);
  
  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => {
    setIsFocused(false);
    // Smart validation
    if (required && value) {
      if (type === 'email') {
        setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
      } else {
        setIsValid(value.length >= 2);
      }
    }
  }, [required, value, type]);

  const fieldVariants = useMemo(() => ({
    initial: { scale: 1, rotateZ: 0, borderColor: "#d1d5db" },
    focused: { 
      scale: 1.02,
      rotateZ: 0.2,
      borderColor: "#C9B07A",
      boxShadow: "0 0 0 3px rgba(201, 176, 122, 0.15), 0 8px 25px -8px rgba(201, 176, 122, 0.2)"
    },
    valid: {
      borderColor: "#10b981",
      boxShadow: "0 0 0 2px rgba(16, 185, 129, 0.1)"
    },
    invalid: {
      borderColor: "#ef4444",
      boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.1)"
    }
  }), []);

  const currentVariant = isFocused ? 'focused' : 
                        isValid === true ? 'valid' : 
                        isValid === false ? 'invalid' : 'initial';

  return (
    <motion.div 
      variants={ANIMATION_VARIANTS.fadeSlideUp}
      className="relative"
    >
      <motion.label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-2 relative"
        initial={{ opacity: 0, x: -10 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          color: isFocused ? "#C9B07A" : "#374151"
        }}
        transition={{ duration: 0.3 }}
      >
        {label}
        {required && (
          <motion.span 
            className="text-red-500 ml-1"
            animate={{ scale: isFocused ? 1.2 : 1 }}
            transition={{ duration: 0.2 }}
          >
            *
          </motion.span>
        )}
      </motion.label>
      
      <div className="relative">
        {isTextarea ? (
          <motion.textarea
            id={name}
            name={name}
            rows={rows}
            required={required}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="input-field resize-none transition-all duration-300"
            placeholder={placeholder}
            variants={fieldVariants}
            animate={currentVariant}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ willChange: 'transform, box-shadow, border-color' }}
          />
        ) : (
          <motion.input
            type={type}
            id={name}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="input-field transition-all duration-300"
            placeholder={placeholder}
            variants={fieldVariants}
            animate={currentVariant}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ willChange: 'transform, box-shadow, border-color' }}
          />
        )}
        
        {/* Validation Indicator */}
        <AnimatePresence>
          {isValid !== null && (
            <motion.div
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                isValid ? 'text-green-500' : 'text-red-500'
              }`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {isValid ? <FiCheck className="w-4 h-4" /> : <span>!</span>}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Animated Focus Ring */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1.02 : 1
          }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(201, 176, 122, 0.05), transparent)',
            borderRadius: '8px'
          }}
        />
      </div>
    </motion.div>
  );
});

// Ultra-Optimized Contact Info with Magnetic Effects
const ContactInfoItem = React.memo(({ icon: Icon, title, content, subtitle }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const iconVariants = useMemo(() => ({
    rest: { 
      scale: 1, 
      rotate: 0, 
      backgroundColor: "#F5F5DC",
      borderColor: "#C9B07A"
    },
    hover: { 
      scale: 1.15,
      rotate: 5,
      backgroundColor: "#C9B07A",
      borderColor: "#B8A067",
      boxShadow: "0 10px 20px -5px rgba(201, 176, 122, 0.4)"
    }
  }), []);

  const contentVariants = useMemo(() => ({
    rest: { x: 0, color: "#0D1B2A" },
    hover: { x: 8, color: "#C9B07A" }
  }), []);

  return (
    <motion.div 
      className="flex items-start space-x-4 group cursor-pointer relative"
      variants={ANIMATION_VARIANTS.fadeSlideLeft}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 0.05 : 0,
          scale: isHovered ? 1.02 : 0.8
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'radial-gradient(circle, rgba(201, 176, 122, 0.1) 0%, transparent 70%)'
        }}
      />
      
      <motion.div 
        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden border-2 transition-all duration-300" 
        variants={iconVariants}
        animate={isHovered ? "hover" : "rest"}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        style={{ willChange: 'transform, background-color, border-color' }}
      >
        {/* Icon Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isHovered 
              ? "inset 0 0 20px rgba(255, 255, 255, 0.2)" 
              : "inset 0 0 0px rgba(255, 255, 255, 0)"
          }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div
          animate={{ 
            rotate: isHovered ? [0, -5, 5, 0] : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ 
            duration: isHovered ? 0.6 : 0.3,
            type: "spring",
            stiffness: 400
          }}
        >
          <Icon 
            className="w-6 h-6 relative z-10 transition-colors duration-300" 
            style={{ color: isHovered ? '#ffffff' : '#0D1B2A' }}
          />
        </motion.div>
      </motion.div>
      
      <motion.div
        variants={contentVariants}
        animate={isHovered ? "hover" : "rest"}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        className="relative z-10"
      >
        <motion.h3 
          className="font-semibold mb-1 transition-colors duration-300"
          animate={{ 
            color: isHovered ? "#C9B07A" : "#0D1B2A",
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
        
        <motion.div 
          className="text-gray-600 transition-all duration-300"
          animate={{ 
            color: isHovered ? "#4b5563" : "#6b7280",
            x: isHovered ? 3 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {typeof content === 'string' ? (
            <p>{content}</p>
          ) : content}
        </motion.div>
        
        {subtitle && (
          <motion.p 
            className="text-sm text-gray-500 mt-1 transition-all duration-300"
            initial={{ opacity: 0.7 }}
            animate={{ 
              opacity: isHovered ? 1 : 0.7,
              x: isHovered ? 5 : 0,
              color: isHovered ? "#C9B07A" : "#6b7280"
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
      
      {/* Hover Trail Effect */}
      <motion.div
        className="absolute right-0 top-1/2 w-2 h-2 rounded-full bg-polishedGold/30"
        initial={{ opacity: 0, scale: 0, x: -10 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
          x: isHovered ? 0 : -10
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </motion.div>
  );
});

// Optimized Business Hours Component
const BusinessHours = React.memo(() => {
  const hours = useMemo(() => [
    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM', isToday: true },
    { day: 'Saturday', time: '10:00 AM - 4:00 PM', isToday: false },
    { day: 'Sunday', time: 'Closed', isToday: false }
  ], []);

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden"
      variants={ANIMATION_VARIANTS.scaleIn}
      whileHover={{ 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-polishedGold/10 to-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        className="flex items-center mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FiClock className="w-5 h-5 text-polishedGold mr-2" />
        <h3 className="text-lg font-semibold text-midnight">Business Hours</h3>
      </motion.div>
      
      <motion.div 
        className="space-y-2 text-gray-600"
        variants={ANIMATION_VARIANTS.staggerContainer}
        initial="initial"
        animate="animate"
      >
        {hours.map((item, index) => (
          <motion.div 
            key={index}
            className={`flex justify-between p-2 rounded ${item.isToday ? 'bg-linen/20' : ''}`}
            variants={ANIMATION_VARIANTS.fadeSlideUp}
            whileHover={{ 
              backgroundColor: item.isToday ? "#C9B07A20" : "#f9fafb",
              x: 5
            }}
            transition={{ duration: 0.2 }}
          >
            <span className={item.isToday ? 'font-semibold text-midnight' : ''}>{item.day}</span>
            <span className={item.isToday ? 'font-semibold text-polishedGold' : ''}>{item.time}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
});

// Optimized FAQ Component
const FAQ = React.memo(() => {
  const faqs = useMemo(() => [
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day return policy for all unused items in original condition."
    },
    {
      question: "Do you offer custom designs?",
      answer: "Yes! Contact us to discuss your custom jewellery requirements."
    }
  ], []);

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden"
      variants={ANIMATION_VARIANTS.scaleIn}
      whileHover={{ 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-polishedGold/10 to-transparent rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <motion.div 
        className="flex items-center mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FiHelpCircle className="w-5 h-5 text-polishedGold mr-2" />
        <h3 className="text-lg font-semibold text-midnight">Frequently Asked Questions</h3>
      </motion.div>
      
      <motion.div 
        className="space-y-4"
        variants={ANIMATION_VARIANTS.staggerContainer}
        initial="initial"
        animate="animate"
      >
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            className="p-3 rounded-lg hover:bg-gray-50 transition-colors"
            variants={ANIMATION_VARIANTS.fadeSlideUp}
            whileHover={{ x: 5, backgroundColor: "#f9fafb" }}
            transition={{ duration: 0.2 }}
          >
            <motion.h4 
              className="font-medium text-midnight mb-1"
              whileHover={{ color: "#C9B07A" }}
              transition={{ duration: 0.2 }}
            >
              {faq.question}
            </motion.h4>
            <motion.p 
              className="text-sm text-gray-600"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {faq.answer}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // Optimized handlers with useCallback
  const handleChange = useCallback((e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Simulate API call with better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      toast.success('🎉 Message sent successfully!', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#C9B07A',
          color: '#0D1B2A',
          fontWeight: 'bold'
        }
      });
      
      // Reset form with animation
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitSuccess(false);
      }, 2000);
      
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  // Scroll-based parallax effects
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const contentY = useTransform(scrollY, [0, 500], [0, -25]);

  // Memoized contact information with enhanced data
  const contactInfo = useMemo(() => [
    {
      icon: FiMapPin,
      title: "Address",
      content: (
        <>
          123 Jewellery Street<br />
          New York, NY 10001<br />
          United States
        </>
      ),
      subtitle: "Visit our showroom by appointment"
    },
    {
      icon: FiPhone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      subtitle: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: FiMail,
      title: "Email",
      content: "info@satwa.com",
      subtitle: "We'll respond within 24 hours"
    }
  ], []);

  return (
    <motion.div 
      className="pt-16 lg:pt-20 min-h-screen bg-gray-50"
      variants={ANIMATION_VARIANTS.pageEnter}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Hero Section with Parallax */}
      <motion.section 
        className="hero-dark py-20 relative overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <FloatingOrbs />
        
        {/* Dynamic Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(201, 176, 122, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(245, 245, 220, 0.2) 0%, transparent 50%)'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1 
            className="text-4xl lg:text-6xl font-serif font-bold text-linen mb-6"
            variants={ANIMATION_VARIANTS.heroText}
            animate={{
              textShadow: [
                "0 0 0px rgba(201, 176, 122, 0)",
                "0 0 30px rgba(201, 176, 122, 0.6)",
                "0 0 0px rgba(201, 176, 122, 0)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Get in Touch
          </motion.h1>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-polishedGold via-linen to-polishedGold mx-auto mb-6"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
          
          <motion.p 
            className="text-xl text-linen/90 max-w-3xl mx-auto leading-relaxed"
            variants={ANIMATION_VARIANTS.heroText}
            transition={{ delay: 0.3 }}
          >
            We'd love to hear from you. Whether you have a question about our products, need assistance, or just want to say hello, we're here to help.
          </motion.p>
          
          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-linen/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-linen/70 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced Animated Background Elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute border border-linen/20 rounded-full ${
              i === 0 ? 'w-32 h-32 top-10 right-10' :
              i === 1 ? 'w-24 h-24 bottom-20 left-10' :
              'w-16 h-16 top-1/2 left-20'
            }`}
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 15 + i * 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 2
            }}
          />
        ))}
      </motion.section>

      {/* Enhanced Main Content with Parallax */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        style={{ y: contentY }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={ANIMATION_VARIANTS.fastStagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Ultra-Enhanced Contact Form */}
          <motion.div 
            className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden backdrop-blur-sm"
            variants={ANIMATION_VARIANTS.fadeSlideLeft}
            whileHover={{ 
              boxShadow: "0 25px 50px -5px rgba(0, 0, 0, 0.15), 0 20px 20px -5px rgba(201, 176, 122, 0.1)" 
            }}
            transition={{ duration: 0.4 }}
          >
            {/* Enhanced Animated Background Pattern */}
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 opacity-5"
              style={{
                background: 'conic-gradient(from 0deg, #C9B07A, #F5F5DC, #C9B07A)'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Success Overlay */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl flex items-center justify-center z-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      <FiCheck className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                    <p className="text-green-600">Thank you for contacting us.</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.h2 
              className="text-3xl font-bold text-midnight mb-8 relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Send us a message
              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-polishedGold to-transparent mt-2"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.h2>
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6 relative z-10"
              variants={ANIMATION_VARIANTS.fastStagger}
              initial="initial"
              animate="animate"
            >
              {/* Enhanced Name and Email Row */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={ANIMATION_VARIANTS.fadeSlideUp}
              >
                <FormField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
                <FormField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </motion.div>
              
              {/* Enhanced Subject Field */}
              <FormField
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
              />
              
              {/* Enhanced Message Field */}
              <FormField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your inquiry..."
                isTextarea
                rows={6}
                required
              />
              
              {/* Ultra-Enhanced Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className="w-full btn-gold disabled:opacity-50 relative overflow-hidden group"
                variants={ANIMATION_VARIANTS.fadeSlideUp}
                whileHover={!isSubmitting && !submitSuccess ? ANIMATION_VARIANTS.button.hover : {}}
                whileTap={!isSubmitting && !submitSuccess ? ANIMATION_VARIANTS.button.tap : {}}
                transition={ANIMATION_VARIANTS.button.transition}
              >
                {/* Button Background Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-polishedGold to-yellow-400"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div 
                      className="flex items-center justify-center relative z-10"
                      key="submitting"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="w-6 h-6 border-3 border-midnight border-t-transparent rounded-full mr-3"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Sending your message...
                      </motion.span>
                    </motion.div>
                  ) : submitSuccess ? (
                    <motion.div
                      className="flex items-center justify-center relative z-10"
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiCheck className="w-5 h-5 mr-2" />
                      Message Sent!
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex items-center justify-center relative z-10"
                      key="send"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        animate={{ 
                          x: [0, 5, 0],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FiSend className="w-5 h-5 mr-2" />
                      </motion.div>
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
              
              {/* Trust Indicators */}
              <motion.div
                className="flex items-center justify-center space-x-6 pt-4 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <motion.div 
                  className="flex items-center"
                  whileHover={{ scale: 1.05, color: "#C9B07A" }}
                >
                  <motion.div
                    className="w-2 h-2 bg-green-500 rounded-full mr-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  SSL Secured
                </motion.div>
                <motion.div 
                  className="flex items-center"
                  whileHover={{ scale: 1.05, color: "#C9B07A" }}
                >
                  <motion.div
                    className="w-2 h-2 bg-blue-500 rounded-full mr-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  24h Response
                </motion.div>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Ultra-Enhanced Contact Information */}
          <motion.div 
            className="space-y-8"
            variants={ANIMATION_VARIANTS.fadeSlideRight}
          >
            {/* Enhanced Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-3xl font-bold text-midnight mb-4"
                style={{ y: textY }}
              >
                Get in touch
                <motion.div
                  className="w-16 h-1 bg-gradient-to-r from-polishedGold to-transparent mt-2"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </motion.h2>
              <motion.p 
                className="text-gray-600 text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </motion.p>
            </motion.div>
            
            {/* Ultra-Enhanced Contact Items */}
            <motion.div 
              className="space-y-6"
              variants={ANIMATION_VARIANTS.fastStagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
            >
              {contactInfo.map((info, index) => (
                <ContactInfoItem
                  key={index}
                  icon={info.icon}
                  title={info.title}
                  content={info.content}
                  subtitle={info.subtitle}
                  delay={index * 0.1}
                />
              ))}
            </motion.div>

            {/* Enhanced Business Hours */}
            <BusinessHours />

            {/* Enhanced FAQ */}
            <FAQ />
            
            {/* Enhanced Social Media Links */}
            <motion.div
              className="pt-8 border-t border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.h3 
                className="text-lg font-semibold text-midnight mb-4"
                style={{ y: textY }}
              >
                Follow us
              </motion.h3>
              <motion.div 
                className="flex space-x-4"
                variants={ANIMATION_VARIANTS.fastStagger}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  { Icon: FiFacebook, href: "#", color: "hover:text-blue-600", bg: "hover:bg-blue-50" },
                  { Icon: FiTwitter, href: "#", color: "hover:text-blue-400", bg: "hover:bg-blue-50" },
                  { Icon: FiInstagram, href: "#", color: "hover:text-pink-500", bg: "hover:bg-pink-50" },
                  { Icon: FiLinkedin, href: "#", color: "hover:text-blue-700", bg: "hover:bg-blue-50" }
                ].map(({ Icon, href, color, bg }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    className={`w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 transition-all duration-300 group ${color} ${bg}`}
                    variants={ANIMATION_VARIANTS.fadeSlideUp}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 5,
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                    onHoverStart={() => setHoveredSocial(index)}
                    onHoverEnd={() => setHoveredSocial(null)}
                  >
                    <motion.div
                      animate={hoveredSocial === index ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </motion.div>
                    
                    {/* Hover Effect Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-polishedGold opacity-0"
                      animate={hoveredSocial === index ? { 
                        opacity: [0, 1, 0],
                        scale: [1, 1.2, 1.4]
                      } : {}}
                      transition={{ duration: 0.8 }}
                    />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Enhanced Call-to-Action Card */}
            <motion.div
              className="bg-gradient-to-br from-polishedGold/10 to-polishedGold/5 rounded-2xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(201, 176, 122, 0.15)"
              }}
            >
              {/* Animated Background Pattern */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, #C9B07A 0%, transparent 70%)'
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <motion.div 
                className="relative z-10"
                style={{ y: contentY }}
              >
                <motion.h3 
                  className="text-xl font-bold text-midnight mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Need immediate assistance?
                </motion.h3>
                <motion.p 
                  className="text-gray-600 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Our support team is available 24/7 to help you with any questions.
                </motion.p>
                <motion.button
                  className="btn-gold group relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-polishedGold"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center">
                    <FiPhone className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    Call Now
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;

