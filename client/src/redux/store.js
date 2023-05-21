import { configureStore, combineReducers } from "@reduxjs/toolkit"

import user from "./slices/userSlices"
import category from "./slices/categorySlice"
import post from "./slices/postSlice"
import comment from "./slices/commentSlice"

const reducer = combineReducers({
    user,
    category,
    post,
    comment,
})

export default configureStore({
    reducer
})