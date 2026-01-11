import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  ShoppingCart,
  Wrench,
  Zap,
  Droplets,
  Paintbrush,
  Home,
  Loader2,
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { getPublicProducts } from '../utils/products'
import { fetchProducts } from '../services/api'

const Categories = () => {
  const [searchParams] = useSearchParams()
  const selectedCategoryParam = searchParams.get('category')
  const [productsData, setProductsData] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(
    selectedCategoryParam || 'All'
  )

  // Fetch products from API on component mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const products = await getPublicProducts()
        setProductsData(products)
        setFilteredProducts(products)
      } catch (error) {
        console.error('Error loading products:', error)
        setProductsData([])
        setFilteredProducts([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const categories = [
    {
      name: 'All',
      icon: ShoppingCart,
      color: 'bg-gray-500',
      description: 'View all products',
    },
    {
      name: 'Groceries',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      description: 'Food items and daily essentials',
    },
    {
      name: 'Household Items',
      icon: Home,
      color: 'bg-green-500',
      description: 'Cleaning and household supplies',
    },
    {
      name: 'Tools',
      icon: Wrench,
      color: 'bg-orange-500',
      description: 'Hand tools and equipment',
    },
    {
      name: 'Electrical',
      icon: Zap,
      color: 'bg-yellow-500',
      description: 'Electrical items and wiring',
    },
    {
      name: 'Plumbing',
      icon: Droplets,
      color: 'bg-cyan-500',
      description: 'Pipes, fittings, and fixtures',
    },
    {
      name: 'Paints',
      icon: Paintbrush,
      color: 'bg-purple-500',
      description: 'Paints and building materials',
    },
  ]

  useEffect(() => {
    const filterProducts = async () => {
      if (selectedCategory === 'All') {
        setFilteredProducts(productsData)
      } else {
        // Try to fetch from API with category filter
        setLoading(true)
        try {
          const filtered = await fetchProducts({ category: selectedCategory })
          setFilteredProducts(filtered)
        } catch (error) {
          console.warn('API filter failed, using client-side filter:', error)
          // Fallback to client-side filtering
          setFilteredProducts(
            productsData.filter((product) => product.category === selectedCategory)
          )
        } finally {
          setLoading(false)
        }
      }
    }

    filterProducts()
  }, [selectedCategory, productsData])

  useEffect(() => {
    if (selectedCategoryParam) {
      setSelectedCategory(selectedCategoryParam)
    }
  }, [selectedCategoryParam])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Product Categories
          </h1>
          <p className="text-lg text-gray-600">
            Browse products by category
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = selectedCategory === category.name
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all ${
                  isActive ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div
                  className={`${category.color} rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p
                  className={`text-sm font-medium ${
                    isActive ? 'text-primary-600' : 'text-gray-700'
                  }`}
                >
                  {category.name}
                </p>
              </button>
            )
          })}
        </div>

        {/* Selected Category Info */}
        {selectedCategory !== 'All' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center space-x-4">
              {(() => {
                const category = categories.find(
                  (c) => c.name === selectedCategory
                )
                const Icon = category?.icon
                return (
                  <>
                    <div
                      className={`${category?.color} rounded-full p-4 flex items-center justify-center`}
                    >
                      {Icon && <Icon className="h-8 w-8 text-white" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {selectedCategory}
                      </h2>
                      <p className="text-gray-600">{category?.description}</p>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedCategory === 'All'
                ? 'All Products'
                : `${selectedCategory} Products`}
            </h2>
            <Link
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All Products →
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <Loader2 className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-xl text-gray-600 mb-2">
                No products in this category
              </p>
              <p className="text-gray-500">
                Check back soon for new items
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Categories

