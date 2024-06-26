import {
  setLoading,
  setError,
  createPost,
  resetPost,
  setPosts,
  setToggleLike,
  setToggleDislike,
  setPost,
  updatePost,
  setUpdatePostLoading,
  setUpdatePostError,
  deletePost,
  resetError,
} from "../slices/postSlice";
import axios from "axios";
const baseUrl = "https://blog-backend-j4vm.onrender.com/api/posts";

export const createPostAction = (postData) => async (dispatch) => {
  dispatch(setLoading());
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("description", postData.description);
    formData.append("category", postData.category);
    postData.image && formData.append("image", postData.image);
    await axios.post(baseUrl, formData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(createPost());
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const updatePostAction = (postData, postId) => async (dispatch) => {
  dispatch(setUpdatePostLoading());
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    await axios.put(`${baseUrl}/${postId}`, postData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(updatePost());
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setUpdatePostError(err));
  }
};

export const deletePostAction = (postId) => async (dispatch) => {
  dispatch(setLoading());
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    await axios.delete(`${baseUrl}/${postId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(deletePost());
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const fetchAllPostsAction = (category) => async (dispatch) => {
  dispatch(setLoading());
  try {
    if (category) {
      const { data } = await axios.get(`${baseUrl}?category=${category}`);
      dispatch(setPosts(data));
    } else {
      const { data } = await axios.get(baseUrl);
      dispatch(setPosts(data));
    }
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const fetchPostAction = (postId) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get(`${baseUrl}/${postId}`);
    dispatch(setPost(data));
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const toggleLikePostAction = (postId) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    dispatch(setToggleLike({ postId, userId: userInfo.id }));
    await axios.put(
      `${baseUrl}/likes/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const toggleDislikePostAction = (postId) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("myBlogUser"));
  try {
    dispatch(setToggleDislike({ postId, userId: userInfo.id }));
    await axios.put(
      `${baseUrl}/dislikes/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
  } catch (error) {
    const err = error.response
      ? error.response.data
      : error.message
      ? error.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const resetPostAction = () => (dispatch) => {
  dispatch(resetPost());
};

export const resetPostErrorAction = () => (dispatch) => {
  dispatch(resetError());
};
