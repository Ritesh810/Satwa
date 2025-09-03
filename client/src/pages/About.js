import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiAward, FiUsers, FiHeart, FiStar } from 'react-icons/fi';

// Animation variants - moved outside component for optimization
const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  
  staggerContainer: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      type: "spring",
      stiffness: 100
    }
  },

  slideInScale: {
    initial: { opacity: 0, y: 40, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Static data - moved outside component for optimization
const VALUES_DATA = [
  {
    icon: FiAward,
    title: "Quality",
    description: "We never compromise on the quality of our materials or craftsmanship.",
    color: "#C9B07A"
  },
  {
    icon: FiHeart,
    title: "Passion", 
    description: "Our love for jewellery drives us to create exceptional pieces.",
    color: "#e74c3c"
  },
  {
    icon: FiUsers,
    title: "Community",
    description: "We value our customers and their stories as much as our own.",
    color: "#3498db"
  },
  {
    icon: FiStar,
    title: "Excellence",
    description: "We strive for excellence in every detail of our work.",
    color: "#f39c12"
  }
];

// Team data
const TEAM_DATA = [
  {
    name: "Sarah Johnson",
    position: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c1a1?w=300&h=300&fit=crop&crop=face",
    bio: "With over 15 years in jewellery design, Sarah founded Satwa with a vision to create timeless pieces."
  },
  {
    name: "Michael Chen",
    position: "Master Craftsman",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "Michael brings decades of traditional craftsmanship techniques to every piece we create."
  },
  {
    name: "Emma Davis",
    position: "Design Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    bio: "Emma combines modern aesthetics with classic elegance in all her innovative designs."
  }
];

const About = () => {
  const { scrollYProgress } = useScroll();
  
  // Optimized parallax transforms with spring physics
  const parallaxY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -100]),
    { stiffness: 100, damping: 30 }
  );

  // Memoize heavy calculations
  const memoizedValues = useMemo(() => VALUES_DATA, []);
  const memoizedTeam = useMemo(() => TEAM_DATA, []);

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50 overflow-hidden">
      {/* Animated Hero Section */}
      <HeroSection />

      {/* Mission Section with Parallax */}
      <MissionSection parallaxY={parallaxY} />

      {/* Values Section with Stagger Animation */}
      <ValuesSection values={memoizedValues} />

      {/* Team Section */}
      <TeamSection team={memoizedTeam} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
};

// Optimized Hero Section Component
const HeroSection = React.memo(() => (
  <section className="hero-dark py-20 relative overflow-hidden">
    {/* Animated Background Elements */}
    <motion.div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `linear-gradient(45deg, #C9B07A 25%, transparent 25%), 
                         linear-gradient(-45deg, #C9B07A 25%, transparent 25%)`,
        backgroundSize: '60px 60px'
      }}
      animate={{ 
        backgroundPosition: ['0px 0px', '30px 30px'],
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "linear" 
      }}
    />

    {/* Floating Orbs */}
    <FloatingOrbs />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <motion.div
        variants={ANIMATION_VARIANTS.staggerContainer}
        initial="initial"
        animate="animate"
        className="space-y-6"
      >
        <motion.h1 
          className="text-4xl lg:text-6xl font-serif font-bold text-linen"
          variants={ANIMATION_VARIANTS.fadeInUp}
          style={{
            background: 'linear-gradient(135deg, #F7F3E9 0%, #C9B07A 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Our Story
        </motion.h1>
        
        <motion.div
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="w-24 h-1 mx-auto rounded-full"
          style={{ background: 'linear-gradient(90deg, #C9B07A, #F7F3E9)' }}
        />
        
        <motion.p 
          className="text-xl text-linen/80 max-w-3xl mx-auto leading-relaxed"
          variants={ANIMATION_VARIANTS.fadeInUp}
        >
          At Satwa, we believe that every piece of jewellery tells a story. Our journey began with a simple passion for creating timeless pieces that celebrate life's most precious moments.
        </motion.p>
      </motion.div>
    </div>
  </section>
));

// Mission Section with Advanced Animations
const MissionSection = React.memo(({ parallaxY }) => (
  <section className="py-16 bg-white relative overflow-hidden">
    {/* Subtle Background Pattern */}
    <motion.div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, #C9B07A 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-3xl lg:text-4xl font-serif font-bold text-midnight mb-6"
            whileInView={{ scale: [0.9, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Mission
          </motion.h2>
          
          <motion.div 
            className="space-y-6"
            variants={ANIMATION_VARIANTS.staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed"
              variants={ANIMATION_VARIANTS.slideInScale}
            >
              We are dedicated to crafting exceptional jewellery that combines traditional craftsmanship with contemporary design. Each piece is thoughtfully created to become a cherished part of your personal story.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed"
              variants={ANIMATION_VARIANTS.slideInScale}
            >
              From engagement rings that symbolize eternal love to everyday pieces that add elegance to your style, we ensure that every creation meets the highest standards of quality and beauty.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Image with Advanced Effects */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 60, rotateY: -15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ y: parallaxY }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-polishedGold/20 to-transparent rounded-xl blur-xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.div
            className="relative rounded-xl overflow-hidden shadow-2xl"
            whileHover={{ 
              scale: 1.05, 
              rotateY: 5,
              boxShadow: "0 25px 50px rgba(13,27,42,0.4)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop"
              alt="Craftsmanship"
              className="w-full h-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8 }}
            />
            
            {/* Shimmer Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.8 }}
            />

            <div 
              className="absolute inset-0 pointer-events-none"
              style={{boxShadow:'inset 0 0 0 2px rgba(201,176,122,0.25)'}}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
));

// Values Section with Enhanced Animations
const ValuesSection = React.memo(({ values }) => (
  <section className="py-16 bg-gray-50 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <SectionHeader 
        title="Our Values"
        subtitle="The principles that guide everything we do"
      />

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={ANIMATION_VARIANTS.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
      >
        {values.map((value, index) => (
          <ValueCard key={index} value={value} index={index} />
        ))}
      </motion.div>
    </div>
  </section>
));

// Team Section Component
const TeamSection = React.memo(({ team }) => (
  <section className="py-16 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader 
        title="Meet Our Team"
        subtitle="The passionate individuals behind every piece"
      />

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={ANIMATION_VARIANTS.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
      >
        {team.map((member, index) => (
          <motion.div
            key={index}
            className="text-center group"
            variants={ANIMATION_VARIANTS.slideInScale}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="relative mb-6 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={member.image}
                alt={member.name}
                className="w-48 h-48 rounded-full mx-auto object-cover shadow-lg"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-t from-midnight/20 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            <motion.h3 
              className="text-xl font-semibold text-midnight mb-2"
              whileHover={{ color: "#C9B07A" }}
            >
              {member.name}
            </motion.h3>
            
            <motion.p 
              className="text-polishedGold font-medium mb-3"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {member.position}
            </motion.p>
            
            <motion.p 
              className="text-gray-600 text-sm leading-relaxed"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              {member.bio}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
));

// CTA Section Component
const CTASection = React.memo(() => (
  <section className="py-16 bg-midnight relative overflow-hidden">
    {/* Background Pattern */}
    <motion.div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, #C9B07A 2px, transparent 2px)`,
        backgroundSize: '50px 50px'
      }}
      animate={{ 
        backgroundPosition: ['0px 0px', '50px 50px'],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    />

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <motion.div
        variants={ANIMATION_VARIANTS.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="space-y-8"
      >
        <motion.h2 
          className="text-3xl lg:text-4xl font-serif font-bold text-linen"
          variants={ANIMATION_VARIANTS.fadeInUp}
        >
          Ready to Find Your Perfect Piece?
        </motion.h2>
        
        <motion.p 
          className="text-xl text-linen/80 max-w-2xl mx-auto leading-relaxed"
          variants={ANIMATION_VARIANTS.fadeInUp}
        >
          Explore our exquisite collection and discover jewellery that tells your unique story.
        </motion.p>
        
        <motion.div
          variants={ANIMATION_VARIANTS.fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link to="/shop" className="btn-gold inline-flex items-center text-lg px-8 py-4">
            <span>Explore Collection</span>
            <motion.div
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  </section>
));

// Optimized Value Card Component
const ValueCard = React.memo(({ value, index }) => (
  <motion.div 
    className="text-center group"
    variants={ANIMATION_VARIANTS.slideInScale}
    whileHover={{ 
      y: -10,
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }}
  >
    <motion.div 
      className="w-16 h-16 bg-linen rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden" 
      style={{ border: '1px solid #C9B07A' }}
      whileHover={{ 
        scale: 1.2,
        backgroundColor: value.color,
        borderColor: value.color
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20"
        initial={{ scale: 0, opacity: 1 }}
        whileHover={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
      
      <motion.div
        whileHover={{ rotate: 360, color: "#ffffff" }}
        transition={{ duration: 0.6 }}
      >
        <value.icon className="w-8 h-8" style={{ color: '#0D1B2A' }} />
      </motion.div>
    </motion.div>
    
    <motion.h3 
      className="text-lg font-semibold text-midnight mb-2"
      whileInView={{ 
        color: value.color,
        transition: { delay: 0.2 * index }
      }}
      viewport={{ once: true }}
    >
      {value.title}
    </motion.h3>
    
    <motion.p 
      className="text-gray-600"
      initial={{ opacity: 0.7 }}
      whileHover={{ opacity: 1 }}
    >
      {value.description}
    </motion.p>
  </motion.div>
));

// Floating Orbs Component
const FloatingOrbs = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gradient-to-br from-polishedGold/20 to-polishedGold/5"
        style={{
          width: `${40 + i * 20}px`,
          height: `${40 + i * 20}px`,
          left: `${20 + i * 15}%`,
          top: `${20 + i * 10}%`
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4 + i,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
));

// Section Header Component
const SectionHeader = React.memo(({ title, subtitle }) => (
  <motion.div 
    className="text-center mb-12"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <motion.h2 
      className="text-3xl lg:text-4xl font-serif font-bold text-midnight mb-4"
      whileInView={{ 
        background: 'linear-gradient(135deg, #0D1B2A 0%, #C9B07A 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      {title}
    </motion.h2>
    
    <motion.div
      className="w-16 h-1 bg-polishedGold mx-auto rounded-full mb-4"
      initial={{ width: 0 }}
      whileInView={{ width: 64 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.6 }}
    />
    
    <motion.p 
      className="text-xl text-gray-600 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.8 }}
    >
      {subtitle}
    </motion.p>
  </motion.div>
));

export default About;

