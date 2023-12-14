import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../redux/actions/commentActions";
import ClipLoader from "react-spinners/ClipLoader";

//Form schema
const formSchema = Yup.object({
  description: Yup.string().required("Description is required"),
});

const AddComment = ({ postId }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { loading, error } = useSelector((state) => state.comment);
  const initialValues = {
    description: "",
  };
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values, { resetForm, setTouched }) => {
      setIsSubmitted(true);
      const data = {
        description: values?.description,
      };
      resetForm(initialValues);
      dispatch(createCommentAction(postId, data));
    },
  });

  return (
    <div className="flex flex-col justify-center items-center">
      {error && (
        <h1 className="text-red-500 my-2 font-semibold text-2xl">{error}</h1>
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="mt-1 flex max-w-sm m-auto"
      >
        <input
          onBlur={() => {
            setIsSubmitted(false);
            formik.handleBlur("description");
          }}
          value={formik.values.description}
          onChange={() => {
            setIsSubmitted(false);
            formik.handleChange("description");
          }}
          type="text"
          name="text"
          id="text"
          className="shadow-sm focus:ring-indigo-500  mr-2 focus:border-indigo-500 block w-full p-2 border-1 sm:text-sm border-gray-300 rounded-md"
          placeholder="Add New comment"
        />

        {loading ? (
          <button
            disabled
            type="submit"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ClipLoader loading={loading} size={15} color="#fff" />
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        )}
      </form>
      {!isSubmitted && (
        <div className="text-red-400 mb-2 mt-2">
          {formik.touched.description && formik.errors.description}
        </div>
      )}
    </div>
  );
};

export default AddComment;
