import { useState, useEffect } from 'react'
import { Search, Filter, Loader2, AlertCircle } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { fetchProducts } from '../services/api'
import { getCategories, getTypes } from '../utils/products'

const Products = () => {
  const [allProducts, setAllProducts] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

  // Get unique categories and types from current products
  const categories = getCategories(allProducts)
  const types = getTypes(allProducts)

  // Fetch products from API on component mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const filters = {}
        if (selectedCategory !== 'All') filters.category = selectedCategory
        if (selectedType !== 'All') filters.type = selectedType
        if (searchTerm) filters.search = searchTerm

        const fetchedProducts = await fetchProducts(filters)
        setAllProducts(fetchedProducts)
        setProducts(fetchedProducts)
      } catch (err) {
        console.error('Error loading products:', err)
        setError('Failed to load products. Please check if the backend server is running.')
        // Fallback to empty array
        setAllProducts([])
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, []) // Load once on mount

  // Filter products based on search, category, and type
  useEffect(() => {
    const filterProducts = async () => {
      if (searchTerm || selectedCategory !== 'All' || selectedType !== 'All') {
        // Use API filtering when filters are applied
        setLoading(true)
        try {
          const filters = {}
          if (selectedCategory !== 'All') filters.category = selectedCategory
          if (selectedType !== 'All') filters.type = selectedType
          if (searchTerm) filters.search = searchTerm

          const filteredProducts = await fetchProducts(filters)
          setProducts(filteredProducts)
        } catch (err) {
          console.error('Error filtering products:', err)
          // Fallback to client-side filtering
          let filtered = allProducts

          if (searchTerm) {
            filtered = filtered.filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          }

          if (selectedCategory !== 'All') {
            filtered = filtered.filter(
              (product) => product.category === selectedCategory
            )
          }

          if (selectedType !== 'All') {
            filtered = filtered.filter((product) => product.type === selectedType)
          }

          setProducts(filtered)
        } finally {
          setLoading(false)
        }
      } else {
        // No filters, show all products
        setProducts(allProducts)
      }
    }

    filterProducts()
  }, [searchTerm, selectedCategory, selectedType, allProducts])

  useEffect(() => {
    let filtered = allProducts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      )
    }

    // Filter by type
    if (selectedType !== 'All') {
      filtered = filtered.filter((product) => product.type === selectedType)
    }

    setProducts(filtered)
  }, [searchTerm, selectedCategory, selectedType, allProducts])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              🛍️ Shop Now
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            All Products
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of groceries and hardware items
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          {/* Desktop: Single Line Layout */}
          <div className="hidden md:flex items-end gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile: Stacked Layout */}
          <div className="md:hidden space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Loader2 className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-4" />
            <p className="text-xl text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-6 w-6 text-red-500" />
              <div>
                <p className="text-red-800 font-semibold">Error Loading Products</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <p className="text-red-600 text-sm mt-2">
                  Make sure the Java backend is running on http://localhost:8080
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        {!loading && !error && (
          <div className="mb-4">
            <p className="text-gray-600">
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-xl text-gray-600 mb-2">No products found</p>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products

