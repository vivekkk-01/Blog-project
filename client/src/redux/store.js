import { configureStore, combineReducers } from "@reduxjs/toolkit"

import user from "./slices/userSlices"

const reducer = combineReducers({
    user
})

export default configureStore({
    reducer
})