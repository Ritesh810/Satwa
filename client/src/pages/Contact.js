import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiHelpCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Optimized Animation Variants
const ANIMATION_VARIANTS = {
  pageEnter: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  },
  
  heroText: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  
  fadeSlideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  fadeSlideLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  fadeSlideRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  
  button: {
    hover: { 
      scale: 1.02, 
      y: -2,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    tap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  
  formField: {
    focus: { 
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(201, 176, 122, 0.1)"
    },
    transition: { duration: 0.2 }
  },
  
  floatingOrb: {
    animate: {
      y: [0, -20, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1]
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Optimized Floating Orbs Component
const FloatingOrbs = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-linen/20 rounded-full"
        style={{
          left: `${20 + i * 15}%`,
          top: `${30 + i * 10}%`
        }}
        variants={ANIMATION_VARIANTS.floatingOrb}
        initial="initial"
        animate="animate"
        transition={{
          ...ANIMATION_VARIANTS.floatingOrb.transition,
          delay: i * 0.4
        }}
      />
    ))}
  </div>
));

// Optimized Form Field Component
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
}) => (
  <motion.div variants={ANIMATION_VARIANTS.fadeSlideUp}>
    <motion.label 
      htmlFor={name} 
      className="block text-sm font-medium text-gray-700 mb-2"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {label}
    </motion.label>
    {isTextarea ? (
      <motion.textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        value={value}
        onChange={onChange}
        className="input-field resize-none"
        placeholder={placeholder}
        whileFocus={ANIMATION_VARIANTS.formField.focus}
        transition={ANIMATION_VARIANTS.formField.transition}
      />
    ) : (
      <motion.input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="input-field"
        placeholder={placeholder}
        whileFocus={ANIMATION_VARIANTS.formField.focus}
        transition={ANIMATION_VARIANTS.formField.transition}
      />
    )}
  </motion.div>
));

// Optimized Contact Info Item Component
const ContactInfoItem = React.memo(({ icon: Icon, title, content, subtitle }) => (
  <motion.div 
    className="flex items-start space-x-4 group"
    variants={ANIMATION_VARIANTS.fadeSlideLeft}
    whileHover={{ x: 5 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div 
      className="w-12 h-12 bg-linen rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden" 
      style={{border:'1px solid #C9B07A'}}
      whileHover={{ 
        scale: 1.1,
        backgroundColor: "#C9B07A",
        borderColor: "#B8A067"
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-polishedGold/20 to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <Icon 
        className="w-6 h-6 relative z-10" 
        style={{color:'#0D1B2A'}} 
      />
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <motion.h3 
        className="font-semibold text-midnight mb-1"
        whileHover={{ color: "#C9B07A" }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.div className="text-gray-600">
        {typeof content === 'string' ? (
          <p>{content}</p>
        ) : content}
      </motion.div>
      {subtitle && (
        <motion.p 
          className="text-sm text-gray-500 mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  </motion.div>
));

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
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Message sent successfully!', {
        duration: 4000,
        position: 'top-center',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.', {
        duration: 4000,
        position: 'top-center',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoized contact information
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
      )
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
      {/* Animated Hero Section */}
      <section className="hero-dark py-20 relative overflow-hidden">
        <FloatingOrbs />
        
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
                "0 0 20px rgba(201, 176, 122, 0.5)",
                "0 0 0px rgba(201, 176, 122, 0)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Get in Touch
          </motion.h1>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-polishedGold to-linen mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          
          <motion.p 
            className="text-xl text-linen/80 max-w-3xl mx-auto leading-relaxed"
            variants={ANIMATION_VARIANTS.heroText}
            transition={{ delay: 0.3 }}
          >
            We'd love to hear from you. Whether you have a question about our products, need assistance, or just want to say hello, we're here to help.
          </motion.p>
        </motion.div>
        
        {/* Animated background elements */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 border border-linen/20 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 border border-linen/20 rounded-full"
          animate={{ rotate: -360, scale: [1, 0.9, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
      </section>

      {/* Main Content */}
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Animated Contact Form */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden"
            variants={ANIMATION_VARIANTS.fadeSlideLeft}
            whileHover={{ 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated background pattern */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-polishedGold/5 to-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.h2 
              className="text-2xl font-semibold text-midnight mb-6 relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Send us a message
            </motion.h2>
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6 relative z-10"
              variants={ANIMATION_VARIANTS.staggerContainer}
              initial="initial"
              animate="animate"
            >
              {/* Name and Email Row */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={ANIMATION_VARIANTS.fadeSlideUp}
              >
                <FormField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
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
              
              {/* Subject Field */}
              <FormField
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
              />
              
              {/* Message Field */}
              <FormField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more..."
                isTextarea
                rows={6}
                required
              />
              
              {/* Animated Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-gold disabled:opacity-50 relative overflow-hidden"
                variants={ANIMATION_VARIANTS.fadeSlideUp}
                whileHover={!isSubmitting ? ANIMATION_VARIANTS.button.hover : {}}
                whileTap={!isSubmitting ? ANIMATION_VARIANTS.button.tap : {}}
                transition={ANIMATION_VARIANTS.button.transition}
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div 
                      className="flex items-center justify-center"
                      key="submitting"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="w-5 h-5 border-2 border-midnight border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Sending...
                      </motion.span>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex items-center justify-center"
                      key="send"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FiSend className="w-5 h-5 mr-2" />
                      </motion.div>
                      Send Message
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Animated Contact Information */}
          <motion.div 
            className="space-y-8"
            variants={ANIMATION_VARIANTS.fadeSlideRight}
          >
            {/* Contact Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2 
                className="text-2xl font-semibold text-midnight mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Contact Information
              </motion.h2>
              
              <motion.div 
                className="space-y-6"
                variants={ANIMATION_VARIANTS.staggerContainer}
                initial="initial"
                animate="animate"
              >
                {contactInfo.map((info, index) => (
                  <ContactInfoItem
                    key={index}
                    icon={info.icon}
                    title={info.title}
                    content={info.content}
                    subtitle={info.subtitle}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Business Hours */}
            <BusinessHours />

            {/* FAQ */}
            <FAQ />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;

