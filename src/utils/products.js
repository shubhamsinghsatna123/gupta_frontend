import { fetchProducts, fetchCategories, fetchTypes } from '../services/api'

/**
 * Get products from API, with fallback to localStorage
 * This ensures admin updates are reflected across all pages
 * @returns {Promise<Array>} Array of products
 */
export const getProducts = async () => {
  try {
    // Try to fetch from API first
    const products = await fetchProducts()
    // Cache in localStorage as fallback
    localStorage.setItem('adminProducts', JSON.stringify(products))
    return products
  } catch (error) {
    console.warn('API not available, using cached/local data:', error)
    // Fallback to localStorage if API fails
    const savedProducts = localStorage.getItem('adminProducts')
    if (savedProducts) {
      try {
        return JSON.parse(savedProducts)
      } catch (parseError) {
        console.error('Error parsing products from localStorage:', parseError)
        // Return an empty list instead of a hard-coded JSON file
        return []
      }
    }
    // Final fallback: return empty array (no hard-coded products)
    return []
  }
}

/**
 * Synchronous version for backward compatibility (uses cached data)
 * @returns {Array} Array of products
 */
export const getProductsSync = () => {
  const savedProducts = localStorage.getItem('adminProducts')
  if (savedProducts) {
    try {
      return JSON.parse(savedProducts)
    } catch (error) {
      console.error('Error parsing products from localStorage:', error)
      // Return empty list instead of hard-coded JSON
      return []
    }
  }
  // No cached data available — return empty list
  return []
}

/**
 * Get unique categories from products (synchronous version)
 */
export const getCategories = (products) => {
  if (!products || products.length === 0) return ['All']
  return ['All', ...new Set(products.map((p) => p.category).filter(Boolean))]
}

/**
 * Get unique types from products (synchronous version)
 */
export const getTypes = (products) => {
  if (!products || products.length === 0) return ['All']
  return ['All', ...new Set(products.map((p) => p.type).filter(Boolean))]
}

/**
 * Fetch categories from API
 */
export const getCategoriesFromAPI = async () => {
  try {
    const categories = await fetchCategories()
    return ['All', ...categories]
  } catch (error) {
    console.warn('Failed to fetch categories from API:', error)
    return ['All']
  }
}

/**
 * Fetch types from API
 */
export const getTypesFromAPI = async () => {
  try {
    const types = await fetchTypes()
    return ['All', ...types]
  } catch (error) {
    console.warn('Failed to fetch types from API:', error)
    return ['All']
  }
}

/**
 * Fetch products for public pages (Home, Products, Categories).
 * This intentionally does NOT fall back to localStorage or bundled JSON so
 * public pages only show live API data — otherwise they'll display empty.
 * @param {Object} [filters] optional filter object forwarded to API
 * @returns {Promise<Array>} Array of products or empty array on failure
 */
export const getPublicProducts = async (filters = {}) => {
  try {
    const products = await fetchProducts(filters)
    return products
  } catch (error) {
    console.warn('Failed to fetch public products from API:', error)
    // Do NOT return cached or hard-coded products for public pages
    return []
  }
}

