import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { FiUser, FiMail, FiMapPin, FiPackage, FiHeart, FiLogOut, FiEdit3, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const sidebarVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay: 0.2 }
};

const contentVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay: 0.3 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const tabVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.3 }
};

// Animated Avatar Component
const AnimatedAvatar = ({ user }) => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
    className="text-center mb-6"
  >
    <motion.div 
      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden" 
      style={{background:'#E0E1DD', border:'1px solid #C9B07A'}}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-polishedGold/20 to-transparent"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <FiUser className="w-10 h-10 relative z-10" style={{color:'#0D1B2A'}} />
    </motion.div>
    
    <motion.h3 
      className="font-semibold text-midnight"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      {user?.name || 'User'}
    </motion.h3>
    
    <motion.p 
      className="text-sm text-gray-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      {user?.email}
    </motion.p>
  </motion.div>
);

// Animated Tab Button Component
const AnimatedTabButton = ({ tab, isActive, onClick, index }) => (
  <motion.button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
      isActive
        ? 'bg-linen text-midnight border border-polishedGold shadow-lg'
        : 'text-gray-600 hover:bg-gray-50'
    }`}
    variants={itemVariants}
    whileHover={{ 
      scale: 1.02, 
      x: isActive ? 0 : 5,
      backgroundColor: isActive ? undefined : '#F9FAFB'
    }}
    whileTap={{ scale: 0.98 }}
    initial="initial"
    animate="animate"
    transition={{ delay: index * 0.1 }}
  >
    <motion.div
      animate={{ 
        rotate: isActive ? 360 : 0,
        color: isActive ? '#C9B07A' : undefined
      }}
      transition={{ duration: 0.3 }}
    >
      <tab.icon className="w-5 h-5" />
    </motion.div>
    <span>{tab.label}</span>
    
    {isActive && (
      <motion.div
        className="ml-auto w-2 h-2 bg-polishedGold rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    )}
  </motion.button>
);

// Animated Input Field Component
const AnimatedInputField = ({ label, type = "text", value, onChange, placeholder, rows }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
  >
    <motion.label 
      className="block text-sm font-medium text-gray-700 mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {label}
    </motion.label>
    
    {rows ? (
      <motion.textarea
        rows={rows}
        value={value}
        onChange={onChange}
        className="input-field resize-none"
        placeholder={placeholder}
        whileFocus={{ 
          scale: 1.02,
          boxShadow: "0 0 0 3px rgba(201, 176, 122, 0.1)"
        }}
        transition={{ duration: 0.2 }}
      />
    ) : (
      <motion.input
        type={type}
        value={value}
        onChange={onChange}
        className="input-field"
        placeholder={placeholder}
        whileFocus={{ 
          scale: 1.02,
          boxShadow: "0 0 0 3px rgba(201, 176, 122, 0.1)"
        }}
        transition={{ duration: 0.2 }}
      />
    )}
  </motion.div>
);

// Animated Order Card Component
const AnimatedOrderCard = ({ order, index }) => (
  <motion.div
    className="border border-gray-200 rounded-lg p-4 relative overflow-hidden"
    variants={itemVariants}
    whileHover={{ 
      y: -4,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      borderColor: "#C9B07A"
    }}
    transition={{ duration: 0.3 }}
    initial="initial"
    animate="animate"
    custom={index}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-polishedGold/5 to-transparent opacity-0"
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-2">
        <motion.h3 
          className="font-semibold text-midnight"
          whileHover={{ color: "#C9B07A" }}
        >
          Order #{1000 + order}
        </motion.h3>
        <span className="text-sm text-gray-600">March {order}, 2024</span>
      </div>
      
      <p className="text-gray-600 mb-2">Diamond Stud Earrings, Gold Necklace</p>
      
      <div className="flex items-center justify-between">
        <motion.span 
          className="font-medium text-midnight"
          whileHover={{ scale: 1.05, color: "#C9B07A" }}
        >
          $899.98
        </motion.span>
        
        <motion.span 
          className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          Delivered
        </motion.span>
      </div>
    </div>
  </motion.div>
);

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: ''
  });

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'orders', label: 'Orders', icon: FiPackage },
    { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
  ];

  return (
    <motion.div 
      className="pt-16 lg:pt-20 min-h-screen bg-gray-50"
      {...pageVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-3xl font-serif font-bold text-midnight"
            animate={{ 
              textShadow: ["0 0 0px rgba(201, 176, 122, 0)", "0 0 10px rgba(201, 176, 122, 0.3)", "0 0 0px rgba(201, 176, 122, 0)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            My Account
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Animated Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            {...sidebarVariants}
          >
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-6"
              whileHover={{ 
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                y: -2
              }}
              transition={{ duration: 0.3 }}
            >
              <AnimatedAvatar user={user} />

              <motion.nav 
                className="space-y-2"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {tabs.map((tab, index) => (
                  <AnimatedTabButton
                    key={tab.id}
                    tab={tab}
                    isActive={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    index={index}
                  />
                ))}
                
                <motion.button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 5,
                    backgroundColor: '#FEF2F2'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiLogOut className="w-5 h-5" />
                  </motion.div>
                  <span>Logout</span>
                </motion.button>
              </motion.nav>
            </motion.div>
          </motion.div>

          {/* Animated Main Content */}
          <motion.div 
            className="lg:col-span-3"
            {...contentVariants}
          >
            <AnimatePresence mode="wait">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  className="bg-white rounded-xl shadow-lg p-6"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <div className="flex items-center justify-between mb-6">
                    <motion.h2 
                      className="text-2xl font-semibold text-midnight"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Profile Information
                    </motion.h2>
                    
                    <motion.button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2 text-polishedGold hover:text-midnight transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <motion.div
                        animate={{ rotate: isEditing ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isEditing ? <FiCheck /> : <FiEdit3 />}
                      </motion.div>
                      {isEditing ? 'Save' : 'Edit'}
                    </motion.button>
                  </div>

                  <motion.div 
                    className="space-y-6"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnimatedInputField
                        label="First Name"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                      />
                      <AnimatedInputField
                        label="Last Name"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                      />
                    </div>

                    <AnimatedInputField
                      label="Email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />

                    <AnimatedInputField
                      label="Phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />

                    <AnimatedInputField
                      label="Address"
                      value={profileData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your address"
                      rows={3}
                    />

                    <motion.button 
                      onClick={handleUpdateProfile} 
                      className="btn-gold"
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Update Profile →
                      </motion.span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  className="bg-white rounded-xl shadow-lg p-6"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.h2 
                    className="text-2xl font-semibold text-midnight mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Order History
                  </motion.h2>
                  
                  <motion.div 
                    className="space-y-4"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {[1, 2, 3].map((order, index) => (
                      <AnimatedOrderCard key={order} order={order} index={index} />
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  className="bg-white rounded-xl shadow-lg p-6"
                  variants={tabVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.h2 
                    className="text-2xl font-semibold text-midnight mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    My Wishlist
                  </motion.h2>
                  
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
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
                      <FiHeart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-gray-600">Your wishlist is empty</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;

