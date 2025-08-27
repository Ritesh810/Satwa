import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { FiHeart, FiShoppingCart, FiStar, FiTruck, FiShield, FiRefreshCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { getProductById, products } from '../data/products';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const foundProduct = getProductById(id);
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-polishedGold mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-polishedGold">Home</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:text-polishedGold">Shop</Link></li>
            <li>/</li>
            <li><Link to={`/shop?category=${product.category}`} className="hover:text-polishedGold capitalize">{product.category}</Link></li>
            <li>/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden ring-1 ring-gray-200">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Discount badge */}
              {discountPercentage > 0 && (
                <span className="absolute top-4 left-4 text-sm font-bold px-2 py-1 rounded-full" style={{background:'#C9B07A', color:'#0D1B2A'}}>
                  -{discountPercentage}%
                </span>
              )}
            </div>

            {/* Thumbnail images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-polishedGold' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-midnight mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-4">
                {product.category}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-midnight">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-bold px-2 py-1 rounded-full" style={{background:'#C9B07A', color:'#0D1B2A'}}>
                    -{discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Material */}
            <div>
              <h3 className="font-semibold text-midnight mb-2">Material</h3>
              <p className="text-gray-600">{product.material}</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-midnight mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-midnight mb-2">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3 px-6 rounded-full font-medium transition-all duration-200 ${
                  product.inStock
                    ? 'bg-polishedGold text-midnight hover:brightness-110 transform hover:scale-[1.02]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FiShoppingCart className="inline w-5 h-5 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-full border-2 transition-all duration-200 ${
                  isInWishlist(product.id)
                    ? 'border-red-500 text-red-500 hover:bg-red-50'
                    : 'border-gray-300 text-gray-600 hover:border-polishedGold hover:text-polishedGold'
                }`}
              >
                <FiHeart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t" style={{borderColor:'rgba(201,176,122,0.3)'}}>
              <div className="flex items-center space-x-2">
                <FiTruck className="w-5 h-5" style={{color:'#0D1B2A'}} />
                <span className="text-sm text-gray-600">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiShield className="w-5 h-5" style={{color:'#0D1B2A'}} />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiRefreshCw className="w-5 h-5" style={{color:'#0D1B2A'}} />
                <span className="text-sm text-gray-600">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-16">
          <div className="border-b mb-6" style={{borderColor:'rgba(201,176,122,0.3)'}}>
            <nav className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'shipping', label: 'Shipping & Returns' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-polishedGold text-midnight'
                      : 'border-transparent text-gray-500 hover:text-midnight hover:border-polishedGold/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="min-h-[200px]">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-midnight mb-2">Features</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Premium quality materials</li>
                      <li>• Expert craftsmanship</li>
                      <li>• Timeless design</li>
                      <li>• Perfect for any occasion</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-midnight mb-2">Care Instructions</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Store in a cool, dry place</li>
                      <li>• Clean with a soft cloth</li>
                      <li>• Avoid contact with chemicals</li>
                      <li>• Professional cleaning recommended</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-midnight">{product.rating}</div>
                    <div className="flex items-center justify-center space-x-1 my-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">{product.reviews} reviews</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-4 last:border-b-0" style={{borderColor:'rgba(201,176,122,0.3)'}}>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">Verified Purchase</span>
                      </div>
                      <p className="text-gray-600 mb-2">
                        "Beautiful piece! The quality is exceptional and it looks even better in person. Highly recommend!"
                      </p>
                      <div className="flex items-center space-x-2">
                        <img
                          src={`https://images.unsplash.com/photo-${1500000000000 + review}?w=32&h=32&fit=crop&crop=face`}
                          alt="Customer"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-midnight">Customer {review}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-midnight mb-2">Shipping Information</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Free shipping on orders over $100</li>
                    <li>• Standard delivery: 3-5 business days</li>
                    <li>• Express delivery: 1-2 business days</li>
                    <li>• International shipping available</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-midnight mb-2">Return Policy</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 30-day return policy</li>
                    <li>• Items must be in original condition</li>
                    <li>• Return shipping is free</li>
                    <li>• Full refund or exchange available</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif font-bold text-midnight mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
