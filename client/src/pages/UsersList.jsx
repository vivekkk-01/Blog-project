import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersListHeader from "../components/UsersListHeader";
import UsersListItem from "../components/UsersListItem";
import { fetchUsersAction } from "../redux/actions/userActions";
import { redirect, useNavigate } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const UsersList = () => {
  const dispatch = useDispatch();
  const { userAuth, users, loading, error } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);

  useEffect(() => {
    if (!userAuth && !userAuth?.isAdmin) {
      navigate("/login");
    }
  }, [userAuth]);

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
            <CircularProgress size="100px" color="primary" />
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
    </>
  );
};

export default UsersList;

export const loader = () => {
  const userAuth = localStorage.getItem("userInfo");
  if (!userAuth && !userAuth?.isAdmin) {
    return redirect("/login");
  }
  return null;
};
