import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userMailSendingAction } from "../redux/actions/userActions";
import { CircularProgress } from "@material-ui/core";

//Form schema
const formSchema = Yup.object({
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});
const SendEmail = () => {
  //dispath
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userAuth, profile, isMailSent, loading, error } = useSelector(
    (state) => state.user
  );

  //formik
  const formik = useFormik({
    initialValues: {
      subject: "",
      message: "",
    },
    onSubmit: (values) => {
      //dispath the action
      const data = {
        to: state?.email || profile?.email,
        subject: values?.subject,
        message: values?.message,
      };
      dispatch(userMailSendingAction(data));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (isMailSent) {
      navigate(`/profile/${state?.id || profile?._id}`);
    }
  }, [isMailSent]);

  useEffect(() => {
    if (!profile?.email && !state?.email) {
      navigate("/");
    }
  }, [profile?.email, state?.email]);

  useEffect(() => {
    if (!userAuth) {
      navigate("/login");
    }
  }, [userAuth]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
          Send Email
          {/* Email title */}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <h2 className="text-red-500 font-bold text-2xl">{error}</h2>
          )}
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium my-1 text-gray-700"
              >
                Subject
              </label>
              <div className="mt-1">
                {/* Subject */}
                <input
                  value={formik.values.subject}
                  onChange={formik.handleChange("subject")}
                  onBlur={formik.handleBlur("subject")}
                  id="subject"
                  name="subject"
                  type="text"
                  autoComplete="subject"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.subject && formik.errors.subject}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm my-1 font-medium text-gray-700"
              >
                Message
              </label>
              {/* email message */}
              <textarea
                value={formik.values.message}
                onChange={formik.handleChange("message")}
                onBlur={formik.handleBlur("message")}
                rows="5"
                cols="10"
                style={{ minHeight: "5rem" }}
                className="max-h-80 rounded-lg appearance-none block w-full py-3 px-3 text-base leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-300 focus:border-gray-500  focus:outline-none"
                type="text"
              ></textarea>
              {/* err here */}
              <div className="text-red-500">
                {formik.touched.message && formik.errors.message}
              </div>
            </div>
            {/* Submit btn */}
            <div>
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
                  Send
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;

export const loader = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) {
    return redirect("/login");
  }

  return null;
};
