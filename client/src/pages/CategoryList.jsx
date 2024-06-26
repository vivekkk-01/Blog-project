import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { PencilAltIcon } from "@heroicons/react/outline";
import {
  fetchCategoriesAction,
  resetCategoryAction,
} from "../redux/actions/categoryActions";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import { resetUserErrorAction } from "../redux/actions/userActions";
import { resetPostErrorAction } from "../redux/actions/postActions";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const category = useSelector((state) => state?.category);

  const { categoryList, loading, error, isCategoryDelete, newCategory } =
    category;

  const { userAuth } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    if (isCategoryDelete) {
      toast.success("Category Deleted!");
      dispatch(resetCategoryAction());
    }
  }, [isCategoryDelete]);

  useEffect(() => {
    if (newCategory) {
      toast.success("New Category Created!");
      dispatch(resetCategoryAction());
    }
  }, [newCategory]);

  useEffect(() => {
    if (!userAuth && !userAuth?.isAdmin) {
      navigate("/login");
    }
  }, [userAuth]);

  useEffect(() => {
    dispatch(resetPostErrorAction())  
    dispatch(resetUserErrorAction())
  }, [])

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
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
          }}
        >
          <h1 className="text-center my-4 text-3xl text-red-600">{error}</h1>
        </div>
      ) : categoryList?.length <= 0 ? (
        <h2 className="text-center text-3xl text-green-800">
          No category Found
        </h2>
      ) : (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Author
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryList?.map((category) => (
                      <tr key={category._id} className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={category?.user?.profilePhoto}
                                alt="category profile"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {category?.user?.firstName}{" "}
                                {category?.user?.lastName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {category?.user?.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment(category?.createdAt).format("DD MMM YYYY")}
                        </td>
                        <Link to={`/update-category/${category._id}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <PencilAltIcon className="h-5 text-indigo-500" />
                          </td>
                        </Link>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default CategoryList;

export const loader = () => {
  const userAuth = localStorage.getItem("myBlogUser");
  if (!userAuth && !userAuth?.isAdmin) {
    return redirect("/login");
  }
  return null;
};
