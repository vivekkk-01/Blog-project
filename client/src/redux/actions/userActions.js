import axios from "axios";
import {
  setLoading,
  setError,
  setRegistered,
  setLogin,
  setLogout,
  setProfile,
  setProfilePhoto,
  setUser,
  resetProfile,
  setUpdateProfile,
  getUserDetails,
  setFollowError,
  setFollowUser,
  setFollowLoading,
  setUnfollowUser,
  setMailSent,
  genVerifiedToken,
  setGenVerifiedTokenError,
  setGenVerifiedTokenLoading,
  setUserVerification,
  setUsers,
  setBlockLoading,
  setBlock,
  setBlockError,
  setUnblock,
  setUpdatePassword,
  setForgotPassword,
  setResetPassword,
  resetUserError,
} from "../slices/userSlices";
const baseUrl = "https://blog-backend-j4vm.onrender.com/api/users";

export const registerUserAction = (userData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.post(`${baseUrl}/register`, userData);
    dispatch(setRegistered(data));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const loginUserAction = (userData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.post(`${baseUrl}/login`, userData);
    localStorage.setItem("myBlogUser", JSON.stringify(data));
    dispatch(setLogin(data));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const userProfileAction = (profileId) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  dispatch(setLoading());
  try {
    const { data } = await axios.get(`${baseUrl}/profile/${profileId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(setProfile(data));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const uploadProfilePhotoAction = (profilePhoto) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  dispatch(setLoading());
  const formData = new FormData();
  formData.append("image", profilePhoto);
  try {
    const { data } = await axios.post(
      `${baseUrl}/profile-photo-upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch(setProfilePhoto(data));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const updateProfileAction = (profileData) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  dispatch(setLoading());
  try {
    const { data } = await axios.put(`${baseUrl}/${userInfo.id}`, profileData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(setUpdateProfile(data));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const fetchUserDetails = (userId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get(`${baseUrl}/${userId}`);
    dispatch(getUserDetails(data));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const getUserAction = () => async (dispatch) => {
  const { id } = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    const { data } = await axios.get(`${baseUrl}/${id}`);
    dispatch(setUser(data));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const userFollowAction = (followId) => async (dispatch) => {
  dispatch(setFollowLoading());
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    const { data } = await axios.put(
      `${baseUrl}/follow`,
      { followId },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch(setFollowUser(data));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setFollowError(err));
  }
};

export const userUnfollowAction = (unfollowId) => async (dispatch) => {
  dispatch(setFollowLoading());
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    const { data } = await axios.put(
      `${baseUrl}/unfollow`,
      { unfollowId },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch(setUnfollowUser(data));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setFollowError(err));
  }
};

export const userMailSendingAction = (mailData) => async (dispatch) => {
  dispatch(setLoading());
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    await axios.post(
      `https://blog-backend-j4vm.onrender.com/api/email-message`,
      mailData,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch(setMailSent());
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const generateVerificationTokenAction = () => async (dispatch) => {
  dispatch(setGenVerifiedTokenLoading());
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    await axios.get(`${baseUrl}/generate-verification-token`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(genVerifiedToken());
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setGenVerifiedTokenError(err));
  }
};

export const accountVerficationAction = (token) => async (dispatch) => {
  dispatch(setLoading());
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    const { data } = await axios.post(
      `${baseUrl}/verify-user`,
      { token },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch(setUserVerification(data.isAccountVerified));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const fetchUsersAction = () => async (dispatch) => {
  dispatch(setLoading());
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    const { data } = await axios.get(`${baseUrl}/`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(setUsers(data));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const blockUserAction = (userId) => async (dispatch) => {
  dispatch(setBlockLoading());
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    await axios.put(
      `${baseUrl}/block-user/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch(setBlock(userId));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setBlockError(err));
  }
};

export const unblockUserAction = (userId) => async (dispatch) => {
  dispatch(setBlockLoading());
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    await axios.put(
      `${baseUrl}/unblock-user/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch(setUnblock(userId));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setBlockError(err));
  }
};

export const updatePasswordAction = (values) => async (dispatch) => {
  dispatch(setLoading());
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    await axios.put(`${baseUrl}/password`, values, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(setUpdatePassword());
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const forgotPasswordAction = (values) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await axios.post(`${baseUrl}/forgot-password-token`, values);
    dispatch(setForgotPassword());
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const resetPasswordAction = (values) => async (dispatch) => {
  dispatch(setLoading());
  try {
    await axios.post(`${baseUrl}/reset-password`, values);
    dispatch(setResetPassword());
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const resetProfileAction = () => (dispatch) => {
  dispatch(resetProfile());
};

export const logoutUserAction = () => (dispatch) => {
  localStorage.removeItem("myBlogUser");
  dispatch(setLogout());
};

export const resetUserErrorAction = () => (dispatch) => {
  dispatch(resetUserError());
};
