import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: '',
    role: 'ANON',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setRole: (state, action) => {
            state.role = action.payload
        },
        setUser: (state, action) => {
            state.token = action.payload.token
            state.role = action.payload.role
        },
    }
})

export const {
    // setToken, setRole,
    setUser} = userSlice.actions
export default userSlice.reducer