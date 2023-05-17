import axios from 'axios'
import { setLoading, setError, setRegistered, setLogin, setLogout } from '../slices/userSlices'
const baseUrl = "http://localhost:5000/api/users"

export const registerUserAction = (userData) => async (dispatch) => {
    dispatch(setLoading())
    try {
        const { data } = await axios.post(`${baseUrl}/register`, userData)
        dispatch(setRegistered(data))
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const loginUserAction = (userData) => async (dispatch) => {
    dispatch(setLoading())
    try {
        const { data } = await axios.post(`${baseUrl}/login`, userData)
        localStorage.setItem("userInfo", JSON.stringify(data))
        dispatch(setLogin(data))
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const logoutUserAction = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch(setLogout())
}