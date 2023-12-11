import {
  ThumbUpIcon as ThumUpIconSolid,
  ThumbDownIcon as ThumbDownIconSolid,
  EyeIcon,
} from "@heroicons/react/solid";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/outline";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  resetPostAction,
  fetchAllPostsAction,
  toggleLikePostAction,
  toggleDislikePostAction,
  resetPostErrorAction,
} from "../redux/actions/postActions";
import { fetchCategoriesAction } from "../redux/actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import moment from "moment";
import { resetUserError } from "../redux/slices/userSlices";
import { resetUserErrorAction } from "../redux/actions/userActions";

const Posts = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const { error, loading, newPost, posts, updatePost, deletePost } =
    useSelector((state) => state.post);
  const { userAuth } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    error: categoryError,
    loading: categoryLoading,
    categoryList,
  } = useSelector((state) => state.category);

  useEffect(() => {
    if (newPost) {
      toast.success("Post created successfully!");
      dispatch(resetPostAction());
    }
  }, [newPost]);

  useEffect(() => {
    if (updatePost) {
      toast.success("Post updated successfully!");
      dispatch(resetPostAction());
    }
  }, [updatePost]);

  useEffect(() => {
    if (deletePost) {
      toast.success("Post deleted successfully!");
      dispatch(resetPostAction());
    }
  }, [deletePost]);

  useEffect(() => {
    dispatch(fetchAllPostsAction());
  }, [dispatch]);

  useEffect(() => {
    setSelectedCategory("");
    dispatch(fetchCategoriesAction());
  }, []);

  useEffect(() => {
    dispatch(resetPostErrorAction())  
    dispatch(resetUserErrorAction())
  }, [])
  

  const toggleLikeHandler = (postId) => {
    if (!userAuth) {
      return navigate("/login");
    }
    dispatch(toggleLikePostAction(postId));
  };

  const toggleDislikeHandler = (postId) => {
    if (!userAuth) {
      return navigate("/login");
    }
    dispatch(toggleDislikePostAction(postId));
  };

  return (
    <>
      <section>
        <div className="py-20 bg-gray-900 min-h-screen radius-for-skewed">
          <div className="container mx-auto px-4">
            {posts && (
              <div className="mb-16 flex flex-wrap items-center">
                <div className="w-full lg:w-1/2">
                  <span className="text-green-600 font-bold">
                    Latest Posts from our awesome authors
                  </span>
                  <h2 className="text-4xl text-gray-300 lg:text-5xl font-bold font-heading">
                    Latest Post
                  </h2>
                </div>
                <div className=" block text-right w-1/2">
                  {/* View All */}
                  <button
                    onClick={() => {
                      dispatch(fetchAllPostsAction());
                      setSelectedCategory("");
                    }}
                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-green-600 hover:bg-green-700 text-gray-50 font-bold leading-loose transition duration-200"
                  >
                    View All Posts
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap -mx-3">
              <div className="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div className="py-4 px-6 bg-gray-600 shadow rounded">
                  <h4 className="mb-4 text-gray-500 font-bold uppercase">
                    Categories
                  </h4>
                  <ul>
                    {categoryLoading ? (
                      <h2>
                        <ClipLoader
                          loading={categoryLoading}
                          size={40}
                          color="#fff"
                        />
                      </h2>
                    ) : categoryError ? (
                      <div className="text-red-400 text-base">
                        {categoryError}
                      </div>
                    ) : categoryList?.length <= 0 ? (
                      <div className="text-2xl text-gray-100 text-center">
                        No Category Found!
                      </div>
                    ) : (
                      categoryList?.map((category) => (
                        <li key={category._id}>
                          <p
                            onClick={() => {
                              dispatch(fetchAllPostsAction(category?.title));
                              setSelectedCategory(category._id);
                            }}
                            className={
                              selectedCategory === category._id
                                ? "block cursor-pointer py-2 px-3 mb-4 rounded bg-yellow-600 font-bold text-gray-100"
                                : "block cursor-pointer py-2 px-3 mb-4 rounded text-yellow-500 font-bold bg-gray-500"
                            }
                          >
                            {category?.title}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-3/4 px-3">
                {loading ? (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      zIndex: 19,
                    }}
                  >
                    <ClipLoader loading={loading} size={60} color="#fff" />
                  </div>
                ) : error ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "80vh",
                    }}
                  >
                    <h1 className="text-center my-4 text-3xl text-red-600">
                      {error}
                    </h1>
                  </div>
                ) : posts?.length <= 0 ? (
                  <h2 className="text-center text-4xl text-gray-400">
                    No Post Found!
                  </h2>
                ) : (
                  posts?.map((post) => (
                    <div
                      key={post._id}
                      className="flex flex-wrap bg-gray-900 -mx-3  lg:mb-6"
                    >
                      <div className="mb-10  w-full lg:w-1/4 px-3">
                        <Link>
                          {/* Post image */}
                          <img
                            className="w-full h-full object-cover rounded"
                            src={post.image}
                            alt=""
                          />
                        </Link>
                        {/* Likes, views dislikes */}
                        <div className="flex flex-row bg-gray-300 justify-center w-full  items-center ">
                          {/* Likes */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            {/* Togle like  */}
                            <div className="">
                              {userAuth &&
                              post.likes.find(
                                (user) => user === userAuth.id
                              ) ? (
                                <ThumUpIconSolid
                                  onClick={toggleLikeHandler.bind(
                                    null,
                                    post._id
                                  )}
                                  className="h-7 w-7 text-indigo-600 cursor-pointer"
                                />
                              ) : (
                                <ThumbUpIcon
                                  onClick={toggleLikeHandler.bind(
                                    null,
                                    post._id
                                  )}
                                  className="h-7 w-7 text-indigo-600 cursor-pointer"
                                />
                              )}
                            </div>
                            <div className="pl-2 text-gray-600">
                              {post?.likes.length}
                            </div>
                          </div>
                          {/* Dislike */}
                          <div className="flex flex-row  justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              {userAuth &&
                              post.dislikes.find(
                                (user) => user === userAuth.id
                              ) ? (
                                <ThumbDownIconSolid
                                  onClick={toggleDislikeHandler.bind(
                                    null,
                                    post._id
                                  )}
                                  className="h-7 w-7 cursor-pointer text-gray-600"
                                />
                              ) : (
                                <ThumbDownIcon
                                  onClick={toggleDislikeHandler.bind(
                                    null,
                                    post._id
                                  )}
                                  className="h-7 w-7 cursor-pointer text-gray-600"
                                />
                              )}
                            </div>
                            <div className="pl-2 text-gray-600">
                              {post?.dislikes.length}
                            </div>
                          </div>
                          {/* Views */}
                          <div className="flex flex-row justify-center items-center ml-4 mr-4 pb-2 pt-1">
                            <div>
                              <EyeIcon className="h-7 w-7  text-gray-400" />
                            </div>
                            <div className="pl-2 text-gray-600">
                              {post?.numViews}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-3/4 px-3">
                        <Link className="hover:underline">
                          <h3 className="mb-1 text-2xl text-green-400 font-bold font-heading">
                            {post?.title}
                          </h3>
                        </Link>
                        <p className="text-gray-300">{post?.description}</p>
                        {/* Read more */}
                        <Link
                          to={`/posts/${post._id}`}
                          className="text-indigo-500 hover:underline"
                        >
                          Read More..
                        </Link>
                        {/* User Avatar */}
                        <div className="mt-6 flex items-center">
                          <div className="flex-shrink-0">
                            <Link to={`/profile/${post?.user?._id}`}>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={post?.user?.profilePhoto}
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              <Link
                                to={`/profile/${post?.user?._id}`}
                                className="text-yellow-400 hover:underline "
                              >
                                {post?.user.firstName} {post?.user.lastName}
                              </Link>
                            </p>
                            <div className="flex space-x-1 text-sm text-green-500">
                              <time>
                                {moment(post.createdAt).format("DD MMM YYYY")}
                              </time>
                              <span aria-hidden="true">&middot;</span>
                            </div>
                          </div>
                        </div>
                        {/* <p className="text-gray-500">
        Quisque id sagittis turpis. Nulla sollicitudin rutrum
        eros eu dictum...
      </p> */}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-900">
          <div className="skew bg-green-500 skew-bottom mr-for-radius">
            <svg
              className="h-8 md:h-12 lg:h-10 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
            </svg>
          </div>
          <div className="skew bg-gray-500  skew-bottom ml-for-radius">
            <svg
              className="h-8 bg-gray-500 md:h-12 lg:h-20 w-full text-gray-900"
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <polygon fill="currentColor" points="0 0 10 0 10 10"></polygon>
            </svg>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Posts;
