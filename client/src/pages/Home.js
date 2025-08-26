import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts, getBestSellers, categories } from '../data/products';

const Home = () => {
  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-satwa-50 to-satwa-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                Discover Timeless
                <span className="text-gradient block">Elegance</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Explore our curated collection of premium jewellery pieces. Each item tells a story 
                of craftsmanship, beauty, and enduring style.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop" className="btn-primary inline-flex items-center justify-center">
                  Shop Now
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/about" className="btn-secondary inline-flex items-center justify-center">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=500&fit=crop"
                    alt="Elegant Jewellery"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop"
                    alt="Diamond Collection"
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop"
                    alt="Gold Collection"
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop"
                    alt="Pearl Collection"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-satwa-100 rounded-full flex items-center justify-center mx-auto">
                <FiTruck className="w-8 h-8 text-satwa-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $100</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-satwa-100 rounded-full flex items-center justify-center mx-auto">
                <FiShield className="w-8 h-8 text-satwa-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-satwa-100 rounded-full flex items-center justify-center mx-auto">
                <FiRefreshCw className="w-8 h-8 text-satwa-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-satwa-100 rounded-full flex items-center justify-center mx-auto">
                <FiHeadphones className="w-8 h-8 text-satwa-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">24/7 Support</h3>
              <p className="text-gray-600">Round the clock customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our diverse collection of fine jewellery across different categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(1).map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-square bg-gradient-to-br from-satwa-100 to-satwa-200 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center mx-auto group-hover:bg-satwa-500 transition-colors duration-300">
                      <span className="text-2xl font-bold text-satwa-600 group-hover:text-white transition-colors duration-300">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-satwa-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.count} items
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and trending jewellery pieces
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/shop" className="btn-primary inline-flex items-center">
              View All Products
              <FiArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              Best Sellers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our most loved pieces by customers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Read testimonials from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                comment: "The quality of the jewellery is exceptional. I love my new necklace and receive compliments every time I wear it!",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Michael Chen",
                rating: 5,
                comment: "Excellent customer service and fast delivery. The ring I ordered for my wife's birthday was perfect.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
              },
              {
                name: "Emily Rodriguez",
                rating: 5,
                comment: "Beautiful craftsmanship and stunning designs. Satwa has become my go-to for all jewellery needs.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-satwa-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-satwa-100 mb-8">
            Subscribe to our newsletter for exclusive offers and new arrivals
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button
              type="submit"
              className="bg-white text-satwa-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
