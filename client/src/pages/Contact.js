import React, { useState, useMemo, useCallback } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiHelpCircle, FiCheck, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import toast from 'react-hot-toast';

// Simple Form Field component
const FormField = ({ 
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
    if (required && value) {
      if (type === 'email') {
        setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
      } else {
        setIsValid(value.length >= 2);
      }
    }
  }, [required, value, type]);

  return (
    <div className="relative">
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-2"
        style={{ color: isFocused ? "#C9B07A" : "#374151" }}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {isTextarea ? (
          <textarea
            id={name}
            name={name}
            rows={rows}
            required={required}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="input-field resize-none"
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="input-field"
            placeholder={placeholder}
          />
        )}
        
        {/* Simple validation indicator */}
        {isValid !== null && (
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${
            isValid ? 'text-green-500' : 'text-red-500'
          }`}>
            {isValid ? <FiCheck className="w-4 h-4" /> : <span>!</span>}
          </div>
        )}
      </div>
    </div>
  );
};

// Simple Contact Info component
const ContactInfoItem = ({ icon: Icon, title, content, subtitle }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-polishedGold rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-midnight" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-midnight">{title}</h3>
        <p className="text-gray-600">{content}</p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

// Simple Business Hours component
const BusinessHours = () => {
  const hours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM" },
    { day: "Sunday", time: "Closed" }
  ];

  return (
    <div className="space-y-3">
      {hours.map((hour, index) => (
        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
          <span className="font-medium text-gray-700">{hour.day}</span>
          <span className="text-gray-600">{hour.time}</span>
        </div>
      ))}
    </div>
  );
};

// Simple FAQ component
const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy on all items in original condition."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide with secure packaging and tracking."
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
            onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
          >
            <span className="font-medium text-gray-800">{faq.question}</span>
            <FiHelpCircle className={`w-5 h-5 text-gray-500 transform ${openFAQ === index ? 'rotate-180' : ''}`} />
          </button>
          {openFAQ === index && (
            <div className="px-4 py-3 bg-white border-t">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Main Contact component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const contactInfo = useMemo(() => [
    {
      icon: FiMapPin,
      title: "Address",
      content: "123 Fashion Street, Style District, NYC 10001",
      subtitle: "Visit our flagship store"
    },
    {
      icon: FiPhone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      subtitle: "Available during business hours"
    },
    {
      icon: FiMail,
      title: "Email",
      content: "info@satwa.com",
      subtitle: "We'll respond within 24 hours"
    }
  ], []);

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-dark py-20 relative">
        <div className="absolute inset-0 opacity-10">
          <div 
            style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(201, 176, 122, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(245, 245, 220, 0.2) 0%, transparent 50%)'
            }}
            className="w-full h-full"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-linen mb-6">
            Get in Touch
          </h1>
          
          <div className="w-32 h-1 bg-gradient-to-r from-polishedGold via-linen to-polishedGold mx-auto mb-6" />
          
          <p className="text-xl text-linen/90 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-midnight mb-6">Send Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
                
                <FormField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
                
                <FormField
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <FormField
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your inquiry..."
                isTextarea
                rows={6}
                required
              />
              
              <button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                className="w-full btn-gold disabled:opacity-50 relative overflow-hidden"
              >
                <div className="flex items-center justify-center space-x-2">
                  <span>
                    {isSubmitting ? 'Sending...' : submitSuccess ? 'Message Sent!' : 'Send Message'}
                  </span>
                  <FiSend className="w-4 h-4" />
                </div>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-midnight mb-6">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <ContactInfoItem key={index} {...info} />
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <FiClock className="w-6 h-6 text-polishedGold" />
                <h3 className="text-2xl font-bold text-midnight">Business Hours</h3>
              </div>
              <BusinessHours />
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <FiHelpCircle className="w-6 h-6 text-polishedGold" />
                <h3 className="text-2xl font-bold text-midnight">Frequently Asked Questions</h3>
              </div>
              <FAQ />
            </div>
          </div>
        </div>

        {/* Social Media and Additional Info */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-midnight mb-4">Connect With Us</h3>
            <p className="text-gray-600">Follow us on social media for the latest updates</p>
          </div>
          
          <div className="flex justify-center space-x-6">
            <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-polishedGold hover:text-white transition-colors">
              <FiFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-polishedGold hover:text-white transition-colors">
              <FiTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-polishedGold hover:text-white transition-colors">
              <FiInstagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-polishedGold hover:text-white transition-colors">
              <FiLinkedin className="w-5 h-5" />
            </a>
          </div>
          
          <div className="mt-8 text-center">
            <h4 className="text-lg font-semibold text-midnight mb-2">Need immediate assistance?</h4>
            <p className="text-gray-600 mb-4">
              Our customer service team is available to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <a href="tel:+15551234567" className="text-polishedGold hover:text-polishedGold/80 font-medium">
                📞 Call us: +1 (555) 123-4567
              </a>
              <span className="hidden sm:inline text-gray-300">|</span>
              <a href="mailto:info@satwa.com" className="text-polishedGold hover:text-polishedGold/80 font-medium">
                ✉️ Email: info@satwa.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
