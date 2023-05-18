import axios from 'axios'
const baseUrl = "http://localhost:5000/api/category"
import { setLoading, setError, setCategory, setCategoryList, updateCategory, deleteCategory, fetchCategory, reset } from '../slices/categorySlice'

export const addCategoryAction = (title) => async (dispatch) => {
    dispatch(setLoading())
    const userAuth = JSON.parse(localStorage.getItem("userInfo"))
    try {
        await axios.post(baseUrl, { title }, {
            headers: {
                Authorization: `Bearer ${userAuth.token}`
            }
        })
        dispatch(setCategory())
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const fetchCategoriesAction = () => async (dispatch) => {
    dispatch(setLoading())
    const userAuth = JSON.parse(localStorage.getItem("userInfo"))
    try {
        const { data } = await axios.get(baseUrl, {
            headers: {
                Authorization: `Bearer ${userAuth.token}`
            }
        })
        dispatch(setCategoryList(data))
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const updateCategoryAction = (categoryId, title) => async (dispatch) => {
    dispatch(setLoading())
    const userAuth = JSON.parse(localStorage.getItem("userInfo"))
    try {
        await axios.put(`${baseUrl}/${categoryId}`, { title }, {
            headers: {
                Authorization: `Bearer ${userAuth.token}`
            }
        })
        dispatch(updateCategory())
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const deleteCategoryAction = (categoryId) => async (dispatch) => {
    dispatch(setLoading())
    const userAuth = JSON.parse(localStorage.getItem("userInfo"))
    try {
        await axios.delete(`${baseUrl}/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${userAuth.token}`
            }
        })
        dispatch(deleteCategory())
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const fetchCategoryAction = (categoryId) => async (dispatch) => {
    dispatch(setLoading())
    const userAuth = JSON.parse(localStorage.getItem("userInfo"))
    try {
        const { data } = await axios.get(`${baseUrl}/${categoryId}`, {
            headers: {
                // Authorization: `Bearer ${userAuth.token}`
            }
        })
        dispatch(fetchCategory(data))
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const resetCategoryAction = () => (dispatch) => {
    dispatch(reset())
}
