import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    userAuth: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    profile: null,
    userDetails: null,
    isProfilePhoto: false,
    isUpdateProfile: false,
    userFollowings: [],
    userFollowers: [],
    followLoading: false,
    followError: false,
    isMailSent: false,
    isGenVerifiedToken: false,
    genVerifiedTokenError: null,
    genVerifiedTokenLoading: false,
    isVerified: false,
    users: []
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
        setUser: (state, { payload }) => {
            state.userFollowers = payload.followers;
            state.userFollowings = payload.followings;
        },
        setFollowLoading: (state) => {
            state.followLoading = true
        },
        setFollowUser: (state, { payload }) => {
            state.followLoading = false;
            state.followError = null;
            state.userFollowings = payload.followings;
        },
        setUnfollowUser: (state, { payload }) => {
            state.followLoading = false;
            state.followError = null;
            state.userFollowings = payload.followings;
        },
        setFollowError: (state, { payload }) => {
            state.followLoading = false;
            state.followError = payload;
        },
        setMailSent: (state) => {
            state.loading = false;
            state.isMailSent = true;
            state.error = null;
        },
        setGenVerifiedTokenLoading: (state) => {
            state.genVerifiedTokenLoading = true;
        },
        genVerifiedToken: (state) => {
            state.genVerifiedTokenLoading = false;
            state.isGenVerifiedToken = true;
            state.genVerifiedTokenError = null
        },
        setGenVerifiedTokenError: (state, { payload }) => {
            state.genVerifiedTokenLoading = false;
            state.genVerifiedTokenError = payload;
        },
        setUserVerification: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.isVerified = payload;
        },
        setUsers: (state, { payload }) => {
            state.loading = false;
            state.error = null;
            state.users = payload;
        },
        resetProfile: (state) => {
            state.loading = false;
            state.isProfilePhoto = false;
            state.isMailSent = false;
            state.isUpdateProfile = false;
            state.isGenVerifiedToken = false;
            state.genVerifiedTokenError = null;
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

export const { setLoading, setError, setRegistered, setLogin, setLogout, setProfile, setUser, setProfilePhoto, setUpdateProfile, getUserDetails, setFollowError, setFollowLoading, setFollowUser, setUnfollowUser, setMailSent, genVerifiedToken, setGenVerifiedTokenError, setGenVerifiedTokenLoading, setUserVerification, setUsers, resetProfile } = userSlice.actions;
export default userSlice.reducer;