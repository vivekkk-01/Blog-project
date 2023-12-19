import axios from 'axios'
const baseUrl = "https://blog-backend-j4vm.onrender.com/api/category"
import { setLoading, setError, setCategory, setCategoryList, updateCategory, deleteCategory, fetchCategory, reset } from '../slices/categorySlice'

export const addCategoryAction = (title) => async (dispatch) => {
    dispatch(setLoading())
    const userAuth = JSON.parse(localStorage.getItem("myBlogUser"))
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
    try {
        const { data } = await axios.get(baseUrl)
        dispatch(setCategoryList(data))
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const updateCategoryAction = (categoryId, title) => async (dispatch) => {
    dispatch(setLoading())
    const userAuth = JSON.parse(localStorage.getItem("myBlogUser"))
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
    const userAuth = JSON.parse(localStorage.getItem("myBlogUser"))
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
    const userAuth = JSON.parse(localStorage.getItem("myBlogUser"))
    try {
        const { data } = await axios.get(`${baseUrl}/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${userAuth.token}`
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
