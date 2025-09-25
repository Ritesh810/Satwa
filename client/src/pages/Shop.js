import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiGrid, FiList, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { products, categories, getProductsByCategory } from '../data/products';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const searchQuery = searchParams.get('search') || '';
  const categoryQuery = searchParams.get('category') || '';

  // Get unique materials
  const materials = [...new Set(products.map(product => product.material))];

  useEffect(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (categoryQuery && categoryQuery !== 'all') {
      filtered = filtered.filter(product => product.category === categoryQuery);
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Filter by selected materials
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(product => selectedMaterials.includes(product.material));
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products based on sortBy state
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, categoryQuery, selectedCategories, selectedMaterials, priceRange, sortBy]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleMaterialToggle = (material) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setPriceRange([0, 2000]);
    setSortBy('featured');
  };

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-midnight mb-2">
            Shop Jewellery
          </h1>
          {searchQuery && (
            <p className="text-gray-600">
              Search results for: <span className="font-semibold">"{searchQuery}"</span>
            </p>
          )}
          {categoryQuery && categoryQuery !== 'all' && (
            <p className="text-gray-600">
              Category: <span className="font-semibold capitalize">{categoryQuery}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-midnight">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden text-midnight"
                >
                  {isFilterOpen ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                </button>
              </div>

              <div className={`space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-medium text-midnight mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => (
                      <label key={category.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryToggle(category.id)}
                          className="rounded border-gray-300 text-polishedGold focus:ring-polishedGold"
                        />
                        <span className="text-sm text-gray-700 capitalize">
                          {category.name} ({category.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                <div>
                  <h4 className="font-medium text-midnight mb-3">Materials</h4>
                  <div className="space-y-2">
                    {materials.map((material) => (
                      <label key={material} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(material)}
                          onChange={() => handleMaterialToggle(material)}
                          className="rounded border-gray-300 text-polishedGold focus:ring-polishedGold"
                        />
                        <span className="text-sm text-gray-700">{material}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-midnight mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">$0</span>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-1 accent-polishedGold"
                      />
                      <span className="text-sm text-gray-600">$2000</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>${priceRange[0]} - ${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full text-sm text-midnight font-medium border border-polishedGold rounded-lg py-2 hover:bg-polishedGold hover:text-midnight transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {filteredProducts.length} products
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600">Sort by:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-sm border border-polishedGold/60 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-polishedGold"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name: A to Z</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>

                  {/* View Mode */}
                  <div className="flex items-center space-x-1 border border-polishedGold/60 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-polishedGold text-midnight' : 'text-gray-600 hover:text-polishedGold'}`}
                    >
                      <FiGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-polishedGold text-midnight' : 'text-gray-600 hover:text-polishedGold'}`}
                    >
                      <FiList className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FiFilter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-gold"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;