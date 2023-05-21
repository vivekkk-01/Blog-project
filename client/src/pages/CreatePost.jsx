import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import { createPostAction } from "../redux/actions/postActions";
import styled from "styled-components";
import Dropzone from "react-dropzone";
import { CircularProgress } from "@material-ui/core";
import { redirect, useNavigate } from "react-router-dom";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required."),
  description: Yup.string().required("Description is required."),
  category: Yup.object().required("Category is required."),
});

const CreatePost = () => {
  const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: #ccc;
    border-style: dashed;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
  `;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, newPost } = useSelector((state) => state.post);

  const { userAuth } = useSelector((state) => state.user);

  useEffect(() => {
    if (newPost) {
      navigate("/posts");
    }
  }, [newPost]);

  useEffect(() => {
    if (!userAuth) {
      navigate("/login");
    }
  }, [userAuth]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      const data = {
        title: values.title,
        description: values.description,
        category: values?.category.label,
        image: values.image ? values?.image : null,
      };
      dispatch(createPostAction(data));
    },
  });

  return (
    <>
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
            Create Post
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            <p className="font-medium text-green-600 hover:text-indigo-500">
              Share your ideas to the word. Your post must be free from
              profanity
            </p>
          </p>

          {error && (
            <h2 className="text-center mt-2 text-2xl text-red-500">{error}</h2>
          )}
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div className="mt-1">
                  {/* Title */}
                  <input
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    autoComplete="text"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* Err msg */}
                <div className="text-red-500">
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <CategoryDropdown
                  value={formik.values.category?.label}
                  onChange={formik.setFieldValue}
                  onBlur={formik.setFieldTouched}
                  error={formik.errors.category}
                  touched={formik.touched.category}
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                {/* Description */}
                <textarea
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  rows="5"
                  cols="10"
                  id="description"
                  autoComplete="text"
                  style={{ minHeight: "5rem" }}
                  className="max-h-80 rounded-lg appearance-none block w-full py-3 px-3 text-base  leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                  type="text"
                ></textarea>

                <div className="text-red-500">
                  {formik.touched.description && formik.errors.description}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select an Image
                  </label>
                  <Container className="my-3 container bg-gray-700">
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        formik.setFieldValue("image", acceptedFiles[0]);
                      }}
                      accept={{
                        "image/*": [".jpeg", ".png"],
                      }}
                      onBlur={formik.handleBlur("image")}
                    >
                      {({ getRootProps, getInputProps }) => {
                        return (
                          <div className="container">
                            <div
                              {...getRootProps({
                                className: "dropzone",
                                onDrop: (event) => event.stopPropagation(),
                              })}
                            >
                              <input {...getInputProps()} />
                              <p className="cursor-pointer text-lg text-gray-300 hover:text-gray-500">
                                Click here to select an image
                              </p>
                            </div>
                          </div>
                        );
                      }}
                    </Dropzone>
                  </Container>
                </div>
              </div>

              <div>
                {/* Submit btn */}
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
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;

export const loader = () => {
  const userAuth = localStorage.getItem("userInfo");
  if (!userAuth) {
    return redirect("/login");
  }
  return null;
};
