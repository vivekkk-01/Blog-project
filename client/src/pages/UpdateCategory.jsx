import {
  PlusCircleIcon,
  BookOpenIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  deleteCategoryAction,
  fetchCategoryAction,
  resetCategoryAction,
  updateCategoryAction,
} from "../redux/actions/categoryActions";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required."),
});

const UpdateCategory = () => {
  const { userAuth } = useSelector((state) => state.user);
  const { error, loading, category, updateCategory, isCategoryDelete } =
    useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    dispatch(fetchCategoryAction(categoryId));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: category ? category.title : "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      dispatch(updateCategoryAction(category._id, values.title));
    },
  });

  useEffect(() => {
    if (!userAuth && !userAuth?.isAdmin) {
      navigate("/login");
    }
  }, [userAuth]);

  useEffect(() => {
    if (updateCategory) {
      toast.success("Category Updated!");
      dispatch(resetCategoryAction());
    }
  }, [updateCategory]);

  useEffect(() => {
    if (isCategoryDelete) {
      navigate("/category-list");
    }
  }, [isCategoryDelete]);

  const deleteCategory = () => {
    dispatch(deleteCategoryAction(category._id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Category
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              These are the categories user will select when creating a post
            </p>

            <div>
              {error && <h3 className="text-red-400 text-xl">{error}</h3>}
            </div>
          </p>
        </div>
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder={"Update Category"}
              />
              <div className="text-red-400 mb-2">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <PlusCircleIcon
                      className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  </span>
                  <CircularProgress size="19px" color="white" />
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <PlusCircleIcon
                        className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Update Category
                  </button>
                  <button
                    onClick={deleteCategory}
                    type="submit"
                    className="group mt-2 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <TrashIcon
                        className="h-5 w-5 text-yellow-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Delete Category
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateCategory;

export const loader = () => {
  const userAuth = localStorage.getItem("userInfo");
  if (!userAuth && !userAuth?.isAdmin) {
    return redirect("/login");
  }
  return null;
};
