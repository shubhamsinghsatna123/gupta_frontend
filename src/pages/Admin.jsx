import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  LogOut,
  Settings,
  Loader2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../services/api'

const Admin = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Groceries',
    type: 'General',
    price: '',
    stock: 'In Stock',
    image: 'product',
  })

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/')
    }
  }

  // Fetch products from API on component mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const fetchedProducts = await fetchProducts()
        setProducts(fetchedProducts)
        // Also cache in localStorage as fallback
        localStorage.setItem('adminProducts', JSON.stringify(fetchedProducts))
      } catch (err) {
        console.error('Error loading products:', err)
        setError('Failed to load products. Please check if the backend server is running.')
        // Fallback to localStorage if API fails
        const savedProducts = localStorage.getItem('adminProducts')
        if (savedProducts) {
          try {
            setProducts(JSON.parse(savedProducts))
          } catch (parseError) {
            console.error('Error parsing cached products:', parseError)
            // No hard-coded fallback; start with an empty product list
            setProducts([])
          }
        } else {
          // No cached data available — start with empty product list
          setProducts([])
        }
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Auto-hide success/error messages after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null)
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [success, error])

  const categories = [
    'Groceries',
    'Household Items',
    'Tools',
    'Electrical',
    'Plumbing',
    'Paints',
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      category: 'Groceries',
      type: 'General',
      price: '',
      stock: 'In Stock',
    })
    setIsModalOpen(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      type: product.type,
      price: product.price.toString(),
      stock: product.stock,
      image: product.image || 'product',
    })
    setIsModalOpen(true)
    setError(null)
    setSuccess(null)
  }

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true)
      setError(null)
      try {
        // Delete from API
        await deleteProduct(id)
        
        // Update local state
        const updatedProducts = products.filter((p) => p.id !== id)
        setProducts(updatedProducts)
        localStorage.setItem('adminProducts', JSON.stringify(updatedProducts))
        
        setSuccess('Product deleted successfully!')
        
        // Dispatch custom event to notify other pages
        window.dispatchEvent(new Event('productsUpdated'))
      } catch (err) {
        console.error('Error deleting product:', err)
        setError('Failed to delete product. Please try again.')
        // Still remove from local state as optimistic update
        const updatedProducts = products.filter((p) => p.id !== id)
        setProducts(updatedProducts)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleSaveProduct = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        type: formData.type,
        price: parseFloat(formData.price),
        stock: formData.stock,
        image: formData.image || 'product',
      }

      let updatedProduct

      if (editingProduct) {
        // Update existing product via API
        updatedProduct = await updateProduct(editingProduct.id, productData)
        setSuccess('Product updated successfully!')
        
        // Update local state
        const updatedProducts = products.map((p) =>
          p.id === editingProduct.id ? updatedProduct : p
        )
        setProducts(updatedProducts)
        localStorage.setItem('adminProducts', JSON.stringify(updatedProducts))
      } else {
        // Create new product via API
        updatedProduct = await createProduct(productData)
        setSuccess('Product created successfully!')
        
        // Update local state
        const updatedProducts = [...products, updatedProduct]
        setProducts(updatedProducts)
        localStorage.setItem('adminProducts', JSON.stringify(updatedProducts))
      }

      // Dispatch custom event to notify other pages
      window.dispatchEvent(new Event('productsUpdated'))
      
      // Close modal and reset form
      setIsModalOpen(false)
      setEditingProduct(null)
      setFormData({
        name: '',
        category: 'Groceries',
        type: 'General',
        price: '',
        stock: 'In Stock',
        image: 'product',
      })
    } catch (err) {
      console.error('Error saving product:', err)
      setError(
        editingProduct
          ? 'Failed to update product. Please try again.'
          : 'Failed to create product. Please try again.'
      )
    } finally {
      setSaving(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
    setError(null)
    setSuccess(null)
    setFormData({
      name: '',
      category: 'Groceries',
      type: 'General',
      price: '',
      stock: 'In Stock',
      image: 'product',
    })
  }

  const reloadProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const fetchedProducts = await fetchProducts()
      setProducts(fetchedProducts)
      localStorage.setItem('adminProducts', JSON.stringify(fetchedProducts))
      setSuccess('Products refreshed successfully!')
    } catch (err) {
      console.error('Error reloading products:', err)
      setError('Failed to reload products.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white min-h-screen flex flex-col">
          <div className="p-6 flex-grow">
            <div className="flex items-center space-x-2 mb-8">
              <LayoutDashboard className="h-6 w-6" />
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            <nav className="space-y-2">
              <a
                href="#products"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg"
              >
                <Package className="h-5 w-5" />
                <span>Products</span>
              </a>
            </nav>
          </div>
          <div className="p-6 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Product Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your store's product inventory
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={reloadProducts}
                  disabled={loading}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Settings className="h-5 w-5" />
                  )}
                  <span>Refresh</span>
                </button>
                <button
                  onClick={handleAddProduct}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3 animate-fade-in">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <p className="text-green-800 font-medium">{success}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 animate-fade-in">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 mb-2">Total Products</p>
                <p className="text-3xl font-bold text-gray-800">
                  {products.length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 mb-2">In Stock</p>
                <p className="text-3xl font-bold text-green-600">
                  {products.filter((p) => p.stock === 'In Stock').length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600 mb-2">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600">
                  {products.filter((p) => p.stock === 'Out of Stock').length}
                </p>
              </div>
            </div>

            {/* Loading State */}
            {loading && products.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Loader2 className="h-12 w-12 text-primary-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading products...</p>
              </div>
            )}

            {/* Products Table */}
            {!loading && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {product.category}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              product.type === 'General'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}
                          >
                            {product.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ₹{product.price}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              product.stock === 'In Stock'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-primary-600 hover:text-primary-900 mr-4"
                          >
                            <Edit className="h-5 w-5 inline" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-5 w-5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && products.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-2">No products found</p>
                <p className="text-gray-500 mb-6">
                  Start by adding your first product
                </p>
                <button
                  onClick={handleAddProduct}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Product</span>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal for Add/Edit Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="General">General</option>
                  <option value="Hardware">Hardware</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Price (₹)
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Stock Status
                </label>
                <select
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Image Identifier
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="product"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter image identifier (e.g., rice, oil, product)
                </p>
              </div>

              {/* Error Message in Modal */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      <span>{editingProduct ? 'Update' : 'Add'} Product</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin

