import { configureStore } from '@reduxjs/toolkit'
// import authReducer from '../features/auth/authSlice'
// import goalReducer from '../features/goals/goalSlice'
import productReducer from "../features/products/productSlice"
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer
    },
})
