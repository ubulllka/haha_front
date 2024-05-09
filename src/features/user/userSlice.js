import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role") ? localStorage.getItem("role") : "ANON",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // setToken: (state, action) => {
        //     state.token = action.payload
        //     localStorage.setItem("token", state.token)
        // },
        // setRole: (state, action) => {
        //     state.role = action.payload
        //     localStorage.setItem("role", state.role)
        // },
        setUser: (state, action) => {
            state.token = action.payload.token
            state.role = action.payload.role
            localStorage.setItem("token", state.token)
            localStorage.setItem("role", state.role)
        },
    }
})

export const {setUser} = userSlice.actions
export default userSlice.reducer