import { configureStore, combineReducers } from "@reduxjs/toolkit"

import user from "./slices/userSlices"
import category from "./slices/categorySlice"

const reducer = combineReducers({
    user,
    category
})

export default configureStore({
    reducer
})