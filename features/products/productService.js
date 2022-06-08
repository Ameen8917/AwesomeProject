import axios from 'axios'

const API_URL = 'https://fakestoreapi.com/products'

// Get Products
const getProducts = async () => {
    const response = await axios.get(API_URL)
    // console.log("Product Response:", response.data)
    return response.data
}

const productService = {
    getProducts,
}

export default productService
