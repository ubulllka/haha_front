import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: '',
    token: '',
    role: 'ANON',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, username) => {
            state.username = username
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setRole: (state, action) => {
            state.role = action.payload
        },
        setUser: (state, action) => {
            state.username = action.payload.username
            state.token = action.payload.token
            state.role = action.payload.role
        },
    }
})

export const {
    // setUsername, setToken, setRole,
    setUser} = userSlice.actions
export default userSlice.reducer