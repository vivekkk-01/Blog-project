import { setLoading, setError, createPost, resetPost, setPosts, setToggleLike, setToggleDislike, setPost, updatePost, setUpdatePostLoading, setUpdatePostError, deletePost } from "../slices/postSlice";
import axios from "axios";
const baseUrl = "http://localhost:5000/api/posts"

export const createPostAction = (postData) => async (dispatch) => {
    dispatch(setLoading())
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    try {
        const formData = new FormData()
        formData.append("title", postData.title)
        formData.append("description", postData.description)
        formData.append("category", postData.category)
        postData.image && formData.append("image", postData.image)
        await axios.post(baseUrl, formData, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch(createPost())
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const updatePostAction = (postData, postId) => async (dispatch) => {
    dispatch(setUpdatePostLoading())
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    try {
        await axios.put(`${baseUrl}/${postId}`, postData, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch(updatePost())
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setUpdatePostError(err))
    }
}

export const deletePostAction = (postId) => async (dispatch) => {
    dispatch(setLoading())
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    try {
        await axios.delete(`${baseUrl}/${postId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch(deletePost())
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const fetchAllPostsAction = (category) => async (dispatch) => {
    dispatch(setLoading())
    try {
        if (category) {
            const { data } = await axios.get(`${baseUrl}?category=${category}`)
            dispatch(setPosts(data))
        } else {
            const { data } = await axios.get(baseUrl)
            dispatch(setPosts(data))
        }
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const fetchPostAction = (postId) => async (dispatch) => {
    dispatch(setLoading())
    try {
        const { data } = await axios.get(`${baseUrl}/${postId}`)
        dispatch(setPost(data))
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const toggleLikePostAction = (postId) => async (dispatch) => {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        await axios.put(`${baseUrl}/likes/${postId}`, {}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch(setToggleLike({ postId, userId: userInfo.id }))
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const toggleDislikePostAction = (postId) => async (dispatch) => {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        await axios.put(`${baseUrl}/dislikes/${postId}`, {}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch(setToggleDislike({ postId, userId: userInfo.id }))
    } catch (error) {
        const err = error.response ? error.response.data : error.message ? error.message : "Something went wrong, please try again!"
        dispatch(setError(err))
    }
}

export const resetPostAction = () => (dispatch) => {
    dispatch(resetPost())
}
