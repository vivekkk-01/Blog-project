import React, { useEffect } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostAction,
  fetchPostAction,
} from "../redux/actions/postActions";
import { CircularProgress } from "@material-ui/core";
import moment from "moment";
import AddComment from "../components/AddComment";
import CommentsList from "../components/CommentsList";
import { ToastContainer, toast } from "react-toastify";
import {
  getCommentsAction,
  resetCommentAction,
} from "../redux/actions/commentActions";

const Post = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post, loading, error, deletePost } = useSelector(
    (state) => state.post
  );
  const { userAuth } = useSelector((state) => state.user);
  const {
    commentCreated,
    comments,
    commentDeleted,
    error: commentsError,
  } = useSelector((state) => state.comment);

  useEffect(() => {
    if (!userAuth) {
      navigate("/login");
    }
  }, [userAuth]);

  useEffect(() => {
    dispatch(fetchPostAction(postId));
  }, [postId]);

  useEffect(() => {
    if (deletePost) {
      navigate("/posts");
    }
  }, [deletePost]);

  const deletePostHandler = () => {
    dispatch(deletePostAction(postId));
  };

  useEffect(() => {
    if (commentCreated) {
      toast.success("Comment Created Successfully!");
      dispatch(resetCommentAction());
    }
    if (commentDeleted) {
      toast.success("Comment Deleted Successfully!");
      dispatch(resetCommentAction());
    }
    dispatch(getCommentsAction(postId));
  }, [commentCreated, commentDeleted]);

  return (
    <>
      {loading ? (
        <div
          className="py-20 2xl:py-40 bg-gray-800 overflow-hidden"
          style={{
            height: "100vh",
            width: "100vw",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 19,
            }}
          >
            <CircularProgress size="100px" color="primary" />
          </div>
        </div>
      ) : error ? (
        <div
          className="py-20 2xl:py-40 bg-gray-800 overflow-hidden"
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 className="text-center my-4 text-4xl text-red-600">{error}</h1>
        </div>
      ) : (
        <section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
          <div className="container px-4 mx-auto">
            {/* Post Image */}
            <img
              className="mb-24 w-full h-96 object-cover"
              src={post?.image}
              alt=""
            />
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
                {post?.title}
              </h2>

              {/* User */}
              <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
                <img
                  className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                  src={post?.user?.profilePhoto}
                  alt=""
                />
                <div className="text-left">
                  <h4 className="mb-1 text-2xl font-bold text-gray-50">
                    <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                      {post?.user?.firstName} {post?.user?.lastName}
                    </span>
                  </h4>
                  <p className="text-gray-500">
                    {moment(post?.createdAt).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
              {/* Post description */}
              <div className="max-w-xl mx-auto">
                <p className="mb-6 text-left  text-xl text-gray-200">
                  {post?.description}
                  {/* Show delete and update btn if created user */}
                  {userAuth && post?.user?._id === userAuth.id && (
                    <p className="flex">
                      <Link to={`/update-post/${post?._id}`} className="p-3">
                        <PencilAltIcon className="h-8 mt-3 text-yellow-300" />
                      </Link>
                      <button onClick={deletePostHandler} className="ml-3">
                        <TrashIcon className="h-8 mt-3 text-red-600" />
                      </button>
                    </p>
                  )}
                </p>
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
          <AddComment postId={post?._id} />
          {commentsError ? (
            <div>
              <h1 className="text-center my-4 text-4xl text-red-600">
                {commentsError}
              </h1>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <CommentsList comments={comments} postId={post?._id} />
            </div>
          )}
        </section>
      )}
      <ToastContainer />
    </>
  );
};

export default Post;

export const loader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    return redirect("/login");
  }

  return null;
};
