import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Store, Loader2 } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { getPublicProducts } from '../utils/products'

const Home = () => {
  const [productsData, setProductsData] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch products from API on component mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const products = await getPublicProducts()
        setProductsData(products)
      } catch (error) {
        console.error('Error loading products:', error)
        // Fallback to empty array, component will handle gracefully
        setProductsData([])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Get featured products (first 6 products)
  const featuredProducts = productsData.slice(0, 6)
  const generalProducts = productsData
    .filter((p) => p.type === 'General')
    .slice(0, 4)
  const hardwareProducts = productsData
    .filter((p) => p.type === 'Hardware')
    .slice(0, 4)

  // Show loading state if products are being fetched
  if (loading && productsData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center animate-slide-up">
            <div className="inline-block mb-8">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                🏪 Trusted Local Store Since 1972
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-white to-primary-100 bg-clip-text text-transparent">
                Gupta Store
              </span>
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white/80 font-extrabold">
              (Himanshu Supermall)
            </h2>
            <p className="text-xl md:text-2xl mb-5 text-white/90 font-semibold">
              Your One-Stop Shop for{' '}
              <span className="text-accent-300">Groceries</span> &{' '}
              <span className="text-accent-300">Hardware</span>
            </p>
            <p className="text-base md:text-lg mb-8 text-white/75 max-w-2xl mx-auto leading-relaxed">
              Quality products, trusted service, and local convenience. We've
              been serving our community for years with everything you need for
              your home and daily life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                to="/products"
                className="group bg-white text-primary-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                <span>Browse Products</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+919752188131"
                className="group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                <Phone className="h-5 w-5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* General Store Items Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <div className="inline-block mb-3">
              <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                🛒 Daily Essentials
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-3">
              General Store Items
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Fresh groceries, daily essentials, and household items for your
              everyday needs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {generalProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-slide-up">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10 md:mt-12">
            <Link
              to="/categories?category=Groceries"
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>View All Groceries</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Hardware Items Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <div className="inline-block mb-3">
              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                🔧 Tools & Supplies
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-3">
              Hardware Items
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Tools, electrical items, plumbing supplies, and building materials
              for all your hardware needs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {hardwareProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-slide-up">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10 md:mt-12">
            <Link
              to="/categories?category=Tools"
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>View All Hardware</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <div className="inline-block mb-3">
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                ⭐ Customer Favorites
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-3">
              Featured Products
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 mx-auto mb-4"></div>
            <p className="text-lg md:text-xl text-gray-600">
              Popular items our customers love
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 0.1}s` }} className="animate-slide-up">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-secondary-600 via-secondary-700 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-bounce-slow inline-block mb-5">
            <Store className="h-16 w-16 md:h-20 md:w-20 mx-auto text-white/90" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 animate-slide-up">
            Visit Our Store
          </h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Experience our wide selection in person. Our friendly staff is ready
            to help you find exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group bg-white text-secondary-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-secondary-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              Get Directions
            </Link>
            <a
              href="tel:+911234567890"
              className="group bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <Phone className="h-5 w-5" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

