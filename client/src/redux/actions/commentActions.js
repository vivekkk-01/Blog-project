import axios from "axios"
import { setLoading, setError, setComment, resetComment, setComments, deleteComment } from "../slices/commentSlice"
const baseUrl = "https://blog-backend-j4vm.onrender.com/api/comments"

export const createCommentAction = (postId, commentData) => async (dispatch) => {
    dispatch(setLoading())
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    try {
        await axios.post(`${baseUrl}/${postId}`, commentData, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch(setComment())
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const getCommentsAction = (postId) => async (dispatch) => {
    dispatch(setLoading())
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    try {
        const { data } = await axios.get(`${baseUrl}/${postId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch(setComments(data))
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const deleteCommentAction = (commentId) => async (dispatch) => {
    dispatch(setLoading())
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    try {
        await axios.delete(`${baseUrl}/${commentId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch(deleteComment())
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const resetCommentAction = () => (dispatch) => {
    dispatch(resetComment())
}
