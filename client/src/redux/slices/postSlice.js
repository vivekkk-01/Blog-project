import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  posts: null,
  newPost: false,
  updatePost: false,
  post: null,
  updatePostLoading: false,
  updatePostError: null,
  deletePost: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    createPost: (state) => {
      state.loading = false;
      state.error = null;
      state.newPost = true;
    },
    updatePost: (state) => {
      state.loading = false;
      state.error = null;
      state.updatePost = true;
    },
    setUpdatePostLoading: (state) => {
      state.error = null;
      state.updatePostLoading = true;
    },
    deletePost: (state) => {
      state.loading = false;
      state.error = null;
      state.deletePost = true;
    },
    resetPost: (state) => {
      state.updatePostLoading = false;
      state.loading = false;
      state.newPost = false;
      state.updatePost = false;
      state.deletePost = false;
    },
    setPosts: (state, { payload }) => {
      state.loading = false;
      state.posts = payload;
      state.error = null;
    },
    setPost: (state, { payload }) => {
      state.loading = false;
      state.post = payload;
      state.error = null;
    },
    setToggleLike: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      const postIndex = state.posts.findIndex(
        (post) => post._id === payload.postId
      );
      const isLiked = state.posts[postIndex].likes.find(
        (user) => user === payload.userId
      );
      if (isLiked) {
        state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
          (user) => user !== payload.userId
        );
      } else {
        if (
          state.posts[postIndex].dislikes.find(
            (user) => user === payload.userId
          )
        ) {
          state.posts[postIndex].dislikes = state.posts[
            postIndex
          ].dislikes.filter((user) => user !== payload.userId);
        }
        state.posts[postIndex].likes.push(payload.userId);
      }
    },
    setToggleDislike: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      const postIndex = state.posts.findIndex(
        (post) => post._id === payload.postId
      );
      const isDisliked = state.posts[postIndex].dislikes.find(
        (user) => user === payload.userId
      );
      if (isDisliked) {
        state.posts[postIndex].dislikes = state.posts[
          postIndex
        ].dislikes.filter((user) => user !== payload.userId);
      } else {
        if (
          state.posts[postIndex].likes.find((user) => user === payload.userId)
        ) {
          state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
            (user) => user !== payload.userId
          );
        }
        state.posts[postIndex].dislikes.push(payload.userId);
      }
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.updatePostLoading = false;
      state.error = payload;
    },
    resetError: (state) => {
      state.error = null;
    },
    setUpdatePostError: (state, { payload }) => {
      state.loading = false;
      state.updatePostLoading = false;
      state.updatePostError = payload;
    },
  },
});

export const {
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
} = postSlice.actions;

export default postSlice.reducer;
