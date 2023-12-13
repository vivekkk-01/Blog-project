import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentCreated: false,
  comments: [],
  commentDeleted: false,
  deleteCommentError: null,
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  initialState,
  name: "comment",
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setComment: (state) => {
      state.loading = false;
      state.commentCreated = true;
      state.error = null;
    },
    setComments: (state, { payload }) => {
      state.loading = false;
      state.comments = payload;
      state.error = null;
    },
    deleteComment: (state) => {
      state.loading = false;
      state.commentDeleted = true;
      state.error = null;
    },
    setDeleteCommentError: (state, { payload }) => {
      state.loading = false;
      state.commentDeleted = false;
      state.deleteCommentError = payload;
    },
    resetComment: (state) => {
      state.loading = false;
      state.error = null;
      state.commentCreated = false;
      state.commentDeleted = false;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default commentSlice.reducer;
export const {
  setLoading,
  setError,
  setComment,
  resetComment,
  setComments,
  deleteComment,
  setDeleteCommentError,
} = commentSlice.actions;
