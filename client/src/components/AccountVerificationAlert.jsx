/* This example requires Tailwind CSS v2.0+ */
import { ExclamationIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { generateVerificationTokenAction } from "../redux/actions/userActions";
import { LinearProgress } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { resetProfile } from "../redux/slices/userSlices";

const AccountVerificationAlert = () => {
  const dispatch = useDispatch();
  const { isGenVerifiedToken, genVerifiedTokenLoading, genVerifiedTokenError } =
    useSelector((state) => state.user);

  useEffect(() => {
    if (isGenVerifiedToken) {
      toast.success("Check your email and verify your account.");
      dispatch(resetProfile());
    }
    if (genVerifiedTokenError) {
      toast.error(genVerifiedTokenError);
      dispatch(resetProfile());
    }
  }, [isGenVerifiedToken, genVerifiedTokenError]);

  const verificationHandler = () => {
    dispatch(generateVerificationTokenAction());
  };

  return (
    <>
      {genVerifiedTokenLoading ? (
        <LinearProgress />
      ) : (
        <div className="bg-red-500 border-l-4 border-yellow-400 p-1">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationIcon
                className="h-5 w-5 text-yellow-500"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-200">
                Your account is not verified.{" "}
                <button
                  onClick={verificationHandler}
                  className="font-medium underline text-green-200 hover:text-yellow-600"
                >
                  Click this link to verify
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default AccountVerificationAlert;
