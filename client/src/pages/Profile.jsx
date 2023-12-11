import { useEffect } from "react";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import {
  HeartIcon,
  EmojiSadIcon,
  UploadIcon,
  UserIcon,
} from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { MailIcon, EyeIcon } from "@heroicons/react/solid";
import {
  getUserAction,
  resetProfileAction,
  resetUserErrorAction,
  userFollowAction,
  userProfileAction,
  userUnfollowAction,
} from "../redux/actions/userActions";
import moment from "moment";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { resetPostErrorAction } from "../redux/actions/postActions";

const Profile = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userProfileAction(profileId));
  }, [profileId]);

  const {
    profile,
    loading,
    error,
    isProfilePhoto,
    isUpdateProfile,
    userFollowings,
    followLoading,
    followError,
    isMailSent,
    isPasswordUpdate,
  } = useSelector((state) => state.user);
  const { userAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userAuth) {
      return navigate("/login");
    }
  }, [userAuth]);

  useEffect(() => {
    if (isProfilePhoto) {
      toast.success("Profile Photo Uploaded Successfully!");
      dispatch(resetProfileAction());
    }
  }, [isProfilePhoto]);

  useEffect(() => {
    if (isUpdateProfile) {
      toast.success("Profile Updated Successfully!");
      dispatch(resetProfileAction());
    }
  }, [isUpdateProfile]);

  useEffect(() => {
    dispatch(getUserAction());
  }, [profileId]);

  useEffect(() => {
    if (isMailSent) {
      toast.success("Mail Sent Successfully!");
      dispatch(resetProfileAction());
    }
  }, [isMailSent]);

  useEffect(() => {
    if (isPasswordUpdate) {
      toast.success("Password Updated Successfully!");
      dispatch(resetProfileAction());
    }
  }, [isPasswordUpdate]);

  useEffect(() => {
    dispatch(resetPostErrorAction())  
    dispatch(resetUserErrorAction())
  }, [])

  const followHandler = () => {
    dispatch(userFollowAction(profileId));
  };

  const unfollowHandler = () => {
    dispatch(userUnfollowAction(profileId));
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Static sidebar for desktop */}
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 19,
          }}
        >
           <ClipLoader loading={loading} size={70} color="#000" />
        </div>
      ) : error ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            width: "100%",
          }}
        >
          <h1 className="text-center my-4 text-3xl text-red-600">{error}</h1>
        </div>
      ) : (
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div>
                  <div>
                    <img
                      className="h-32 w-full object-cover lg:h-48"
                      src={profile?.profilePhoto}
                      alt={profile?.fullName}
                    />
                  </div>
                  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="flex -mt-20">
                        <img
                          className="h-24 w-24 rounded-full  ring-4 ring-white sm:h-32 sm:w-32"
                          src={profile?.profilePhoto}
                          alt={profile?.fullName}
                        />
                      </div>
                      <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="flex flex-col 2xl:block mt-10 min-w-0 flex-1">
                          <h1 className="text-2xl font-bold text-gray-900 ">
                            {profile?.firstName}
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                              {/* {profile?.accountType} */}
                            </span>
                            {/* Display if verified or not */}
                            {profile?.isAccountVerified ? (
                              <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                                Account Verified
                              </span>
                            ) : (
                              <span className="inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300">
                                Unverified Account
                              </span>
                            )}
                          </h1>
                          <p className="m-3 text-lg">
                            Date Joined:{" "}
                            {moment(profile?.createdAt).format("DD MMM YYYY")}
                          </p>
                          <p className="text-green-400 mt-2 mb-2">
                            {profile?.posts.length} posts{" "}
                            {profile?.followers.length} followers{" "}
                            {profile?.followings.length} following
                          </p>
                          {/* Who view my profile */}
                          {profile?._id === userAuth?.id && (
                            <div className="flex items-center  mb-2">
                              <EyeIcon className="h-5 w-5 " />
                              <div className="pl-2">
                                {/* {profile?.viewedBy?.length}{" "} */}
                                <span className="text-indigo-400 cursor-pointer">
                                  Number of viewers: {profile?.viewedBy?.length}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* is login user */}
                          {/* Upload profile photo */}
                          {profile?._id === userAuth?.id && (
                            <Link
                              to={`/upload-profile-photo`}
                              className="inline-flex justify-center w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                              <UploadIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Upload Photo</span>
                            </Link>
                          )}
                        </div>

                        <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                          {/* // Hide follow button from the same */}
                          {followError && (
                            <span className="text-red-500 text-xl font-semibold">
                              {followError}
                            </span>
                          )}
                          {profile?._id !== userAuth?.id && (
                            <div>
                              {userFollowings?.find(
                                (following) => following === profile?._id
                              ) && (
                                <button
                                  disabled={followLoading}
                                  onClick={unfollowHandler}
                                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                  <EmojiSadIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Unfollow</span>
                                </button>
                              )}
                              {!userFollowings?.find(
                                (following) => following === profile?._id
                              ) && (
                                <button
                                  disabled={followLoading}
                                  onClick={followHandler}
                                  type="button"
                                  className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                                >
                                  <HeartIcon
                                    className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  />
                                  <span>Follow </span>
                                </button>
                              )}
                            </div>
                          )}
                          {/* Update Profile */}
                          {profile?._id === userAuth?.id && (
                            <Link
                              to="/update-profile"
                              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                              <UserIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Update Profile</span>
                            </Link>
                          )}
                          {/* Send Mail */}
                          {profile?._id !== userAuth?.id && (
                            <Link
                              to={`/send-mail`}
                              state={{
                                email: profile?.email,
                                id: profile?._id,
                              }}
                              className="inline-flex justify-center bg-indigo-900 px-4 py-2 border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                              <MailIcon
                                className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                                aria-hidden="true"
                              />
                              <span className="text-base mr-2  text-bold text-yellow-500">
                                Send Mail
                              </span>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {profile?.firstName}
                      </h1>
                    </div>
                  </div>
                </div>
                {/* Tabs */}
                <div className="mt-6 sm:mt-2 2xl:mt-5">
                  <div className="border-b border-red-900">
                    <div className="max-w-5xl mx-auto "></div>
                  </div>
                </div>
                <div className="flex justify-center place-items-start flex-wrap  md:mb-0">
                  {profile?._id === userAuth?.id && (
                    <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                      <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                        Who viewed my profile : {profile?.viewedBy?.length}
                      </h1>

                      {/* Who view my post */}
                      <ul className="">
                        {profile?.viewedBy?.length <= 0 ? (
                          <h1></h1>
                        ) : (
                          profile?.viewedBy?.map((user) => (
                            <Link key={user?._id} to={`/profile/${user?._id}`}>
                              <div className="flex mb-2 items-center space-x-4 lg:space-x-6">
                                <img
                                  className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                                  src={user?.profilePhoto}
                                  alt={user?._id}
                                />
                                <div className="font-medium text-lg leading-6 space-y-1">
                                  <h3>
                                    {user?.firstName} {user?.lastName}
                                  </h3>
                                </div>
                              </div>
                            </Link>
                          ))
                        )}
                      </ul>
                    </div>
                  )}
                  {/* All my Post */}
                  <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0">
                    <h1 className="text-center text-xl border-gray-500 mb-2 border-b-2">
                      {profile?._id === userAuth?.id
                        ? "My Posts"
                        : `${profile?.firstName}'s Posts`}
                    </h1>
                    {/* Loo here */}
                    {profile?._id === userAuth?.id &&
                    profile?.posts?.length <= 0 ? (
                      <h1 className="text-center mt-6 font-semibold text-3xl">
                        You have 0 Posts!
                      </h1>
                    ) : profile?._id !== userAuth?.id &&
                      profile?.posts?.length <= 0 ? (
                      <h1 className="text-center mt-6 font-semibold text-3xl">{`${profile?.firstName} has 0 Posts!`}</h1>
                    ) : (
                      profile?.posts?.map((post) => (
                        <div
                          key={post._id}
                          className="flex flex-wrap  -mx-3 mt-3  lg:mb-6"
                        >
                          <div className="mb-2   w-full lg:w-1/4 px-3">
                            <Link>
                              <img
                                className="object-cover h-40 rounded"
                                src={post?.image}
                                alt="poster"
                              />
                            </Link>
                          </div>
                          <div className="w-full lg:w-3/4 px-3">
                            <h3 className="mb-1 text-2xl text-green-600 font-bold font-heading">
                              {post?.title}
                            </h3>
                            <p className="text-gray-600 truncate">
                              {post?.description}
                            </p>
                            <Link
                              className="text-indigo-500 hover:underline"
                              to={`/posts/${post?._id}`}
                            >
                              Read more
                            </Link>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Profile;

export const loader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    return redirect("/login");
  }

  return null;
};
