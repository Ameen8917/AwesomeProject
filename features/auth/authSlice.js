import { createSlice } from "@reduxjs/toolkit"
import Users from "../../model/users";

const initialState = {
    id: null,
    email: '',
    username: '',
    token: '',
    error: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            // console.log("Login Payload:", payload);
            state.id = payload.id
            state.email = payload.email
            state.username = payload.username
            state.token = payload.email
        }
    },

})

export const { login } = authSlice.actions
export default authSlice.reducer