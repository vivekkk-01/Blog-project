import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    category: null,
    newCategory: false,
    updateCategory: false,
    isCategoryDelete: false,
    categoryList: null,
}

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        setCategory: (state) => {
            state.loading = false;
            state.newCategory = true;
            state.error = null;
        },
        fetchCategory: (state, { payload }) => {
            state.loading = false;
            state.category = payload;
            state.error = null;
        },
        setCategoryList: (state, { payload }) => {
            state.loading = false;
            state.categoryList = payload;
            state.error = null;
        },
        updateCategory: (state) => {
            state.loading = false;
            state.updateCategory = true;
            state.error = null;
        },
        deleteCategory: (state) => {
            state.loading = false;
            state.isCategoryDelete = true;
            state.error = null;
        },
        reset: (state) => {
            state.loading = false;
            state.updateCategory = false;
            state.newCategory = false;
            state.isCategoryDelete = false;
        },
        setError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    }
})

export const { setLoading, setCategory, setError, setCategoryList, updateCategory, deleteCategory, fetchCategory, reset } = categorySlice.actions;
export default categorySlice.reducer