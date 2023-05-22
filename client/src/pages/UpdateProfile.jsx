import React, { useEffect } from "react";
import { useFormik } from "formik";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  fetchUserDetails,
  updateProfileAction,
} from "../redux/actions/userActions";
import { CircularProgress } from "@material-ui/core";

//Form schema
const formSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  bio: Yup.string(),
});

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails, isUpdateProfile, loading, error, userAuth } =
    useSelector((state) => state.user);
  //formik

  const initialValues = {
    firstName: userDetails?.firstName,
    lastName: userDetails?.lastName,
    email: userDetails?.email,
    bio: userDetails?.bio,
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values, { resetForm }) => {
      resetForm(initialValues);
      dispatch(updateProfileAction(values));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (!userAuth) {
      return navigate("/login");
    }
  }, [userAuth]);

  useEffect(() => {
    dispatch(fetchUserDetails(userAuth.id));
  }, [dispatch]);

  useEffect(() => {
    if (isUpdateProfile) {
      navigate(`/profile/${userAuth.id}`);
    }
  }, [isUpdateProfile]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Hey <span className="text-green-400">{userDetails?.firstName}</span>,
          do you want to update your profile?
        </h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <h2 className="text-red-500 font-semibold ">{error}</h2>}
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="mt-1">
                {/* First name */}
                <input
                  value={formik.values.firstName}
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="text-red-500">
                {formik.touched.firstName && formik.errors.firstName}
              </div>
            </div>
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="mt-1">
                {/* Last Name */}
                <input
                  value={formik.values.lastName}
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.lastName && formik.errors.lastName}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                {/* Email */}
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                value={formik.values.bio}
                onChange={formik.handleChange("bio")}
                onBlur={formik.handleBlur("bio")}
                rows="5"
                cols="10"
                style={{ minHeight: "5rem" }}
                className="max-h-80 rounded-lg appearance-none block w-full py-3 px-3 text-base leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                type="text"
              ></textarea>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.bio && formik.errors.bio}
              </div>
            </div>
            <div>
              {/* submit btn */}
              {loading ? (
                <button
                  disabled
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <CircularProgress size="19px" color="white" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              )}
            </div>
          </form>

          <div className="mt-4 mb-3">
            <div className="relative">
              <div className="flex flex-col justify-center items-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

export const loader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    return redirect("/login");
  }

  return null;
};
