import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersListItem from "../components/UsersListItem";
import { fetchUsersAction } from "../redux/actions/userActions";
import { redirect, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const UsersList = () => {
  const dispatch = useDispatch();
  const { userAuth, users, loading, error, blockError, blockLoading } =
    useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);

  useEffect(() => {
    if (!userAuth && !userAuth?.isAdmin) {
      navigate("/login");
    }
  }, [userAuth]);

  useEffect(() => {
    if (blockError && blockLoading === false) {
      toast.error(blockError);
    }
  }, [blockError, blockLoading]);

  return (
    <>
      <section class="py-8 bg-gray-900 min-h-screen">
        {loading ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 19,
            }}
          >
             <ClipLoader loading={loading} size={50} color="#fff" />
          </div>
        ) : error ? (
          <div className="flex-col justify-center align-center text-center">
            <h1 className="text-center my-4 text-3xl text-red-600">{error}</h1>
          </div>
        ) : users?.length <= 0 ? (
          <div className="flex-col justify-center align-center text-center">
            <h1 className="text-center my-4 text-3xl text-red-600">
              No Users Found!
            </h1>
          </div>
        ) : (
          <div class="container px-4 mx-auto">
            {users?.map((user) => (
              <UsersListItem user={user} />
            ))}
          </div>
        )}
      </section>
      <ToastContainer />
    </>
  );
};

export default UsersList;

export const loader = () => {
  const userAuth = JSON.parse(localStorage.getItem("userInfo"));
  if (!userAuth) {
    return redirect("/login");
  } else if (userAuth && !userAuth.isAdmin) {
    return redirect("/");
  }
  return null;
};
