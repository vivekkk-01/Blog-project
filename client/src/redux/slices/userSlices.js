import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    userAuth: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },
        setRegistered: (state, { payload }) => {
            state.loading = false;
            state.registered = payload;
            state.error = null;
        },
        setLogin: (state, { payload }) => {
            state.loading = false;
            state.userAuth = payload;
            state.error = null;
        },
        setLogout: (state) => {
            state.loading = false;
            state.userAuth = null;
            state.registered = null;
            state.error = null;
        },
        setError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    }
})

export const { setLoading, setError, setRegistered, setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;