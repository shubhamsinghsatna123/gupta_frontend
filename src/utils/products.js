import productsData from '../data/products.json'
import { fetchProducts, fetchCategories, fetchTypes } from '../services/api'

/**
 * Get products from API, with fallback to localStorage/JSON
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
        return productsData
      }
    }
    // Final fallback to JSON file
    return productsData
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
      return productsData
    }
  }
  return productsData
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

