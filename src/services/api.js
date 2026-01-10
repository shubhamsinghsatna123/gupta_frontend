/**
 * API Service for communicating with the Java Spring Boot backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

/**
 * Fetch all products from the API
 * @param {Object} filters - Optional filters (category, type, search)
 * @returns {Promise<Array>} Array of products
 */
export const fetchProducts = async (filters = {}) => {
  try {
    const { category, type, search } = filters
    
    // Build query parameters
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (type) params.append('type', type)
    if (search) params.append('search', search)
    
    const queryString = params.toString()
    const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const products = await response.json()
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    // Return empty array on error, or throw to handle in component
    throw error
  }
}

/**
 * Fetch a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const product = await response.json()
    return product
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

/**
 * Fetch all categories from the API
 * @returns {Promise<Array>} Array of category names
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const categories = await response.json()
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

/**
 * Fetch all types from the API
 * @returns {Promise<Array>} Array of type names
 */
export const fetchTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/types`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const types = await response.json()
    return types
  } catch (error) {
    console.error('Error fetching types:', error)
    throw error
  }
}

/**
 * Create a new product
 * @param {Object} product - Product object
 * @returns {Promise<Object>} Created product
 */
export const createProduct = async (product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const createdProduct = await response.json()
    return createdProduct
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}

/**
 * Update an existing product
 * @param {number} id - Product ID
 * @param {Object} product - Updated product object
 * @returns {Promise<Object>} Updated product
 */
export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const updatedProduct = await response.json()
    return updatedProduct
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

/**
 * Delete a product
 * @param {number} id - Product ID
 * @returns {Promise<void>}
 */
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

