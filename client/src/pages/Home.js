import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, animate, useMotionValue } from 'framer-motion';
import { FiArrowRight, FiStar, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts, getBestSellers, categories } from '../data/products';

export const AnimatedCounter = ({ from, to, duration = 2 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  React.useEffect(() => {
    const controls = animate(count, to, { duration });
    return controls.stop;
  }, [count, to, duration]);

  return <motion.span>{rounded}</motion.span>;
};

export const ParallaxText = ({ children, speed = 0.5 }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speed]);

  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  );
};

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  // Features data - FIXED: Moved outside JSX
  const features = [
    { icon: FiTruck, title: "Free Shipping", desc: "Free shipping on orders over $100" },
    { icon: FiShield, title: "Secure Payment", desc: "100% secure payment processing" },
    { icon: FiRefreshCw, title: "Easy Returns", desc: "30-day return policy" },
    { icon: FiHeadphones, title: "24/7 Support", desc: "Round the clock customer support" }
  ];

  // Testimonials data - FIXED: Added actual data
  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely stunning necklace! The craftsmanship is exceptional and it arrived beautifully packaged.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b1a1?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Emily Chen",
      rating: 5,
      comment: "Perfect for my wedding day. The diamond sparkles beautifully and the quality exceeded my expectations.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face"
    },
    {
      name: "Jessica Martinez",
      rating: 5,
      comment: "Excellent customer service and fast shipping. The earrings are even more beautiful than in the photos.",
      image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=60&h=60&fit=crop&crop=face"
    }
  ];

  return (
    <div className="pt-16 lg:pt-20 overflow-hidden">
      {/* Hero Section with Rich Animations */}
      <section className="relative hero-dark overflow-hidden">
        {/* Animated Background Gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-polishedGold/10 to-transparent"
        />
        
        {/* Floating Particles - FIXED: Added window check */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-polishedGold/20 rounded-full"
              initial={{ 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000,
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : Math.random() * 800,
                opacity: 0
              }}
              animate={{ 
                y: [0, -100, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Animated Copy */}
            <motion.div 
              className="lg:col-span-6 space-y-8"
              style={{ y: heroTextY }}
            >
              <motion.h1 
                className="text-4xl lg:text-6xl font-serif font-bold text-linen leading-tight"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Timeless Luxury
                </motion.span>
                <motion.span 
                  className="block" 
                  style={{color:'#C9B07A'}}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                >
                  Diamond Elegance
                </motion.span>
              </motion.h1>

              <motion.p 
                className="text-xl text-linen/80 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Discover the pinnacle of craftsmanship with our signature diamond necklace collection.
                Minimalist. Opulent. Unmistakably Satwa.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/shop" className="btn-gold inline-flex items-center justify-center relative overflow-hidden group">
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-polishedGold to-yellow-400 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    Shop Collection
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <FiArrowRight className="ml-2 w-5 h-5" />
                    </motion.div>
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Link to="/about" className="btn-gold-outline inline-flex items-center justify-center">
                    Our Story
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Animated Product Image with Rich Effects */}
            <motion.div 
              className="lg:col-span-6 relative"
              style={{ y: heroImageY }}
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-polishedGold/20 to-transparent rounded-2xl blur-xl"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: -2
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1600&q=85"
                  alt="Macro diamond necklace"
                  className="w-full h-[420px] lg:h-[520px] object-cover object-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />

                <div className="pointer-events-none absolute inset-0" style={{boxShadow:'inset 0 0 0 2px rgba(201,176,122,0.25)'}}></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Animated Features Section */}
      <AnimatedSection className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* FIXED: Replaced invalid syntax with proper array */}
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center space-y-4"
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-linen rounded-full flex items-center justify-center mx-auto relative overflow-hidden"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-polishedGold/10 to-transparent opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <feature.icon className="w-8 h-8" style={{color:'#0D1B2A'}} />
                </motion.div>
                <motion.h3 
                  className="text-lg font-semibold text-midnight"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {feature.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {feature.desc}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Animated Categories Section */}
      <AnimatedSection className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-midnight mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our diverse collection of fine jewellery across different categories
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            {categories.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300"
              >
                <Link to={`/shop?category=${category.id}`}>
                  <motion.div 
                    className="aspect-square bg-midnight flex items-center justify-center relative overflow-hidden"
                    whileHover={{ backgroundColor: "#1a2f4a" }}
                  >
                    {/* Animated Background Pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, #C9B07A 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="text-center space-y-2 relative z-10">
                      <motion.div 
                        className="w-16 h-16 bg-linen/90 rounded-full flex items-center justify-center mx-auto transition-colors duration-300" 
                        style={{border:'2px solid #C9B07A'}}
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "#C9B07A",
                          borderColor: "#ffffff"
                        }}
                      >
                        <motion.span 
                          className="text-2xl font-bold" 
                          style={{color:'#0D1B2A'}}
                          whileHover={{ color: "#ffffff" }}
                        >
                          {category.name.charAt(0)}
                        </motion.span>
                      </motion.div>
                      <motion.h3 
                        className="font-semibold text-linen group-hover:text-polishedGold transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {category.name}
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-linen/70"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 1 }}
                      >
                        {category.count} items
                      </motion.p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Enhanced Products Section */}
      <AnimatedSection className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-midnight mb-4">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and trending jewellery pieces
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/shop" className="btn-gold inline-flex items-center">
                View All Products
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Best Sellers Section - FIXED: Added actual content */}
      <AnimatedSection className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-midnight mb-4">
              Best Sellers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our most loved pieces chosen by customers worldwide
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Enhanced Testimonials */}
      <AnimatedSection className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-midnight mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Read testimonials from our satisfied customers
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* FIXED: Used actual testimonials data */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl p-6 space-y-4 relative overflow-hidden"
                variants={fadeInUp}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  backgroundColor: "#ffffff"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-polishedGold/5 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div 
                  className="flex items-center space-x-1 relative z-10"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, rotate: -180 }}
                      whileInView={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                    >
                      <FiStar className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.p 
                  className="text-gray-600 italic relative z-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  "{testimonial.comment}"
                </motion.p>
                
                <motion.div 
                  className="flex items-center space-x-3 relative z-10"
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                  <div>
                    <h4 className="font-semibold text-midnight">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Enhanced Newsletter Section */}
      <AnimatedSection 
        className="py-16 relative overflow-hidden" 
        style={{backgroundColor:'#0D1B2A'}}
      >
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #C9B07A 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}
          animate={{ 
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            className="text-3xl lg:text-4xl font-serif font-bold text-linen mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Stay Updated
          </motion.h2>
          
          <motion.p 
            className="text-xl text-linen/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Subscribe to our newsletter for exclusive offers and new arrivals
          </motion.p>
          
          <motion.form 
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-polishedGold/60"
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.button
              type="submit"
              className="btn-gold relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-polishedGold opacity-0"
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
              Subscribe
            </motion.button>
          </motion.form>
        </div>
      </AnimatedSection>
    </div>
  );
};

// Helper component for animated sections
const AnimatedSection = ({ children, className, ...props }) => {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default Home;