import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MailIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import {
  blockUserAction,
  unblockUserAction,
} from "../redux/actions/userActions";

const UsersListItem = ({ user }) => {
  const { blockedUsers, blockLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const blockUserHandler = () => {
    dispatch(blockUserAction(user._id));
  };

  const unblockUserHandler = () => {
    dispatch(unblockUserAction(user._id));
  };

  return (
    <>
      <div className="p-8 mb-4 bg-white shadow rounded">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
            <img
              className="w-10 h-10 mr-4 object-cover rounded-full"
              src={user?.profilePhoto}
              alt="profile "
            />
            <div>
              <p className="text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="py-1 px-2 text-xs text-purple-500 bg-purple-50 rounded-full">
              <span>
                {blockedUsers.find((blockedUser) => blockedUser === user._id) &&
                  "Blocked"}
              </span>
            </p>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="text-sm font-medium">
              <span className="text-base mr-2  text-bold text-yellow-500">
                {user?.followers?.length}
              </span>
              followers
            </p>
          </div>
          <div className="w-full flex lg:w-4/12 px-4  mb-6 lg:mb-0">
            <p className="inline-block py-1 px-2 mr-2 mb-1 lg:mb-0 text-xs border-2 rounded">
              <span className="text-base mr-2  boder-2 text-bold text-yellow-500">
                {user?.posts?.length} Posts
              </span>
            </p>
            <Link
              to={`/profile/${user?._id}`}
              className=" text-gray-600 inline-flex justify-center items-center py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-xs border-2 border-yellow-500 rounded hover:bg-green-600 hover:text-white"
            >
              Profile
            </Link>

            {blockedUsers.find((blockedUser) => blockedUser === user._id) ? (
              <button
                disabled={blockLoading}
                onClick={unblockUserHandler}
                className="inline-block py-1 px-2 text-center bg-gray-500 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
              >
                Unblock
              </button>
            ) : (
              <button
                disabled={blockLoading}
                onClick={blockUserHandler}
                className="inline-block py-1 px-2 text-center bg-red-600 text-gray-300 mr-2 mb-1 lg:mb-0 text-xs border rounded"
              >
                Block
              </button>
            )}

            <Link
              to={`/send-mail`}
              state={{ email: user?.email, id: user?._id }}
              className="inline-flex  justify-center bg-green-700 px-2 align-middle items-center border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <MailIcon
                className="-ml-1 mr-2 h-5 w-5 text-gray-200"
                aria-hidden="true"
              />
              <span className="text-base mr-2  text-bold text-yellow-500">
                Message
              </span>
            </Link>
          </div>
          <div className="w-full lg:w-1/12 px-4">
            <div className="flex items-center">
              {/* Send Mail */}
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersListItem;
