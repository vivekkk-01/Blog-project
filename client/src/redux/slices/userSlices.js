import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    userAuth: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    profile: null,
    userDetails: null,
    isProfilePhoto: false,
    isUpdateProfile: false,
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
        setProfile: (state, { payload }) => {
            state.loading = false;
            state.profile = payload;
            state.error = null;
        },
        setProfilePhoto: (state, { payload }) => {
            state.loading = false;
            state.isProfilePhoto = true;
            state.error = null;
            const user = JSON.parse(localStorage.getItem("userInfo"))
            user.profilePhoto = payload.profilePhoto;
            localStorage.removeItem("userInfo")
            localStorage.setItem("userInfo", JSON.stringify(user))
            state.userAuth = user;
        },
        setUpdateProfile: (state, { payload }) => {
            state.loading = false;
            state.isUpdateProfile = true;
            state.error = null;
            const user = JSON.parse(localStorage.getItem("userInfo"))
            user.firstName = payload.firstName;
            user.lastName = payload.lastName;
            user.email = payload.email;
            localStorage.removeItem("userInfo")
            localStorage.setItem("userInfo", JSON.stringify(user))
            state.userAuth = user;
        },
        getUserDetails: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.userDetails = payload;
        },
        resetProfile: (state) => {
            state.loading = false;
            state.isProfilePhoto = false;
            state.isUpdateProfile = false;
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

export const { setLoading, setError, setRegistered, setLogin, setLogout, setProfile, setProfilePhoto, setUpdateProfile, getUserDetails, resetProfile } = userSlice.actions;
export default userSlice.reducer;