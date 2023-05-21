import { TrashIcon } from "@heroicons/react/solid";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAction } from "../redux/actions/commentActions";

const CommentsList = ({ comments }) => {
  const { userAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteCommentHandler = (commentId) => {
    dispatch(deleteCommentAction(commentId));
  };

  return (
    <div>
      <ul className="divide-y bg-gray-700 w-96 divide-gray-200 p-3 mt-5">
        <h1 className="my-2 text-gray-400 text-xl">
          {comments?.length > 0 &&
            (comments?.length == 1
              ? `1 Comment`
              : `${comments?.length} Comments`)}
        </h1>
        <>
          {comments?.length <= 0 ? (
            <h1 className="text-yellow-400 text-lg text-center">No comments</h1>
          ) : (
            comments?.map((comment) => (
              <>
                <li key={comment._id} className="py-4  w-full">
                  <div className="flex space-x-3">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={comment?.user?.profilePhoto}
                      alt=""
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-green-400">
                          {comment?.user?.firstName} {comment?.user?.lastName}
                        </h3>
                        <p className="text-bold text-yellow-500 text-base ml-5">
                          {moment(comment?.createdAt).fromNow()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-400">
                        {comment?.description}
                      </p>
                      {/* Check if is the same user created this comment */}

                      {userAuth.id === comment?.user._id && (
                        <p className="flex">
                          <button
                            onClick={deleteCommentHandler.bind(
                              null,
                              comment?._id
                            )}
                          >
                            <TrashIcon
                              fontSize="30px"
                              className="h-5 mt-3 text-red-600"
                            />
                          </button>
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              </>
            ))
          )}
        </>
      </ul>
    </div>
  );
};

export default CommentsList;
