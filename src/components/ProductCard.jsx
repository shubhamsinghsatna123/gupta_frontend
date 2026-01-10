import { useState } from 'react'
import { ShoppingCart, Sparkles } from 'lucide-react'

const ProductCard = ({ product }) => {
  const stockColor =
    product.stock === 'In Stock'
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200'

  const typeColor =
    product.type === 'General'
      ? 'bg-blue-100 text-blue-800 border-blue-200'
      : 'bg-orange-100 text-orange-800 border-orange-200'

  // Generate a colorful gradient as fallback
  const gradients = [
    'from-blue-400 via-purple-500 to-pink-500',
    'from-green-400 via-blue-500 to-purple-500',
    'from-yellow-400 via-orange-500 to-red-500',
    'from-pink-400 via-red-500 to-orange-500',
    'from-cyan-400 via-blue-500 to-indigo-500',
    'from-emerald-400 via-teal-500 to-cyan-500',
  ]
  const gradientIndex = product.id % gradients.length
  const gradient = gradients[gradientIndex]

  // Try to load product image, fallback to gradient
  const [imageError, setImageError] = useState(false)
  
  const imagePath = product.image && !imageError 
    ? `/images/products/${product.image}.jpg`
    : null

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover-lift border border-gray-100 transition-all duration-300 animate-fade-in">
      {/* Product Image */}
      <div className="h-56 relative overflow-hidden bg-gray-100">
        {imagePath ? (
          <img
            src={imagePath}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${gradient} relative`}>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/90 text-6xl font-bold opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                {product.name.charAt(0)}
              </div>
            </div>
          </div>
        )}
        {product.stock === 'In Stock' && (
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <Sparkles className="h-5 w-5 text-primary-600 animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${typeColor} shadow-sm`}
          >
            {product.type}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${stockColor} shadow-sm`}
          >
            {product.stock}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-3xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              ₹{product.price}
            </p>
            <p className="text-xs text-gray-500 font-medium mt-1">{product.category}</p>
          </div>
          <button
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={product.stock === 'Out of Stock'}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

