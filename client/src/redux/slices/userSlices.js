import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  userAuth: localStorage.getItem("myBlogUser")
    ? JSON.parse(localStorage.getItem("myBlogUser"))
    : null,
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
  users: [],
  blockedUsers: [],
  blockLoading: false,
  blockError: null,
  isPasswordUpdate: false,
  isForgotPassword: false,
  isResetPassword: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
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
      const user = JSON.parse(localStorage.getItem("myBlogUser"));
      user.profilePhoto = payload.profilePhoto;
      localStorage.removeItem("myBlogUser");
      localStorage.setItem("myBlogUser", JSON.stringify(user));
      state.userAuth = user;
    },
    setUpdateProfile: (state, { payload }) => {
      state.loading = false;
      state.isUpdateProfile = true;
      state.error = null;
      const user = JSON.parse(localStorage.getItem("myBlogUser"));
      user.firstName = payload.firstName;
      user.lastName = payload.lastName;
      user.email = payload.email;
      localStorage.removeItem("myBlogUser");
      localStorage.setItem("myBlogUser", JSON.stringify(user));
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
      state.followLoading = true;
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
      state.genVerifiedTokenError = null;
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
      state.blockedUsers = payload
        .filter((user) => user.isBlocked === true)
        .map((user) => user._id);
    },
    setBlock: (state, { payload }) => {
      state.blockLoading = false;
      state.loading = false;
      state.error = null;
      state.blockError = null;
      state.blockedUsers.push(payload);
    },
    setUnblock: (state, { payload }) => {
      state.blockLoading = false;
      state.loading = false;
      state.error = null;
      state.blockError = null;
      state.blockedUsers = state.blockedUsers.filter(
        (user) => user !== payload
      );
    },
    setBlockLoading: (state) => {
      state.blockLoading = true;
    },
    setBlockError: (state, { payload }) => {
      state.blockLoading = false;
      state.blockError = payload;
    },
    setUpdatePassword: (state) => {
      state.loading = false;
      state.isPasswordUpdate = true;
      state.error = null;
    },
    setForgotPassword: (state) => {
      state.loading = false;
      state.isForgotPassword = true;
      state.error = null;
    },
    setResetPassword: (state) => {
      state.loading = false;
      state.isResetPassword = true;
      state.error = null;
    },
    resetProfile: (state) => {
      state.loading = false;
      state.isProfilePhoto = false;
      state.isMailSent = false;
      state.isUpdateProfile = false;
      state.isGenVerifiedToken = false;
      state.genVerifiedTokenError = null;
      state.isPasswordUpdate = false;
      state.isForgotPassword = false;
      state.isResetPassword = false;
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
    resetUserError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setRegistered,
  setLogin,
  setLogout,
  setProfile,
  setUser,
  setProfilePhoto,
  setUpdateProfile,
  getUserDetails,
  setFollowError,
  setFollowLoading,
  setFollowUser,
  setUnfollowUser,
  setMailSent,
  genVerifiedToken,
  setGenVerifiedTokenError,
  setGenVerifiedTokenLoading,
  setUserVerification,
  setUsers,
  setBlock,
  setBlockError,
  setBlockLoading,
  setUnblock,
  setUpdatePassword,
  setForgotPassword,
  setResetPassword,
  resetProfile,
  resetUserError,
} = userSlice.actions;
export default userSlice.reducer;
