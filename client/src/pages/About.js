import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiUsers, FiHeart, FiStar } from 'react-icons/fi';

const About = () => {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-serif font-bold text-linen mb-6">
            Our Story
          </h1>
          <p className="text-xl text-linen/80 max-w-3xl mx-auto leading-relaxed">
            At Satwa, we believe that every piece of jewellery tells a story. Our journey began with a simple passion for creating timeless pieces that celebrate life's most precious moments.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-midnight mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We are dedicated to crafting exceptional jewellery that combines traditional craftsmanship with contemporary design. Each piece is thoughtfully created to become a cherished part of your personal story.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                From engagement rings that symbolize eternal love to everyday pieces that add elegance to your style, we ensure that every creation meets the highest standards of quality and beauty.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop"
                alt="Craftsmanship"
                className="rounded-xl shadow-lg"
                style={{boxShadow:'0 10px 30px rgba(13,27,42,0.25)'}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-midnight mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-linen rounded-full flex items-center justify-center mx-auto mb-4" style={{border:'1px solid #C9B07A'}}>
                <FiAward className="w-8 h-8" style={{color:'#0D1B2A'}} />
              </div>
              <h3 className="text-lg font-semibold text-midnight mb-2">Quality</h3>
              <p className="text-gray-600">We never compromise on the quality of our materials or craftsmanship.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-linen rounded-full flex items-center justify-center mx-auto mb-4" style={{border:'1px solid #C9B07A'}}>
                <FiHeart className="w-8 h-8" style={{color:'#0D1B2A'}} />
              </div>
              <h3 className="text-lg font-semibold text-midnight mb-2">Passion</h3>
              <p className="text-gray-600">Our love for jewellery drives us to create exceptional pieces.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-linen rounded-full flex items-center justify-center mx-auto mb-4" style={{border:'1px solid #C9B07A'}}>
                <FiUsers className="w-8 h-8" style={{color:'#0D1B2A'}} />
              </div>
              <h3 className="text-lg font-semibold text-midnight mb-2">Community</h3>
              <p className="text-gray-600">We value our customers and their stories as much as our own.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-linen rounded-full flex items-center justify-center mx-auto mb-4" style={{border:'1px solid #C9B07A'}}>
                <FiStar className="w-8 h-8" style={{color:'#0D1B2A'}} />
              </div>
              <h3 className="text-lg font-semibold text-midnight mb-2">Excellence</h3>
              <p className="text-gray-600">We strive for excellence in every detail of our work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-midnight mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Satwa's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & Creative Director",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
                bio: "With over 15 years of experience in jewellery design, Sarah leads our creative vision."
              },
              {
                name: "Michael Chen",
                role: "Master Craftsman",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
                bio: "Michael brings traditional techniques to life with his exceptional craftsmanship."
              },
              {
                name: "Emily Rodriguez",
                role: "Customer Experience",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
                bio: "Emily ensures every customer interaction is memorable and meaningful."
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-midnight mb-1">{member.name}</h3>
                <p className="font-medium mb-3" style={{color:'#C9B07A'}}>{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{backgroundColor:'#0D1B2A'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-linen mb-4">
            Start Your Journey
          </h2>
          <p className="text-xl text-linen/80 mb-8">
            Discover our collection and find the perfect piece for your story
          </p>
          <Link to="/shop" className="btn-gold">
            Explore Collection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;

