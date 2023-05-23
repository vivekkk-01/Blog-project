import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Root from "./pages/Root";

import AddNewCategory, {
  loader as addNewCategoryLoader,
} from "./pages/AddNewCategory";

import CategoryList, {
  loader as categoryListLoader,
} from "./pages/CategoryList";

import UpdateCategory, {
  loader as updateCategoryLoader,
} from "./pages/UpdateCategory";

import CreatePost, { loader as createPostLoader } from "./pages/CreatePost";
import Posts from "./pages/Posts";
import Post, { loader as postLoader } from "./pages/Post";

import UpdatePost, { loader as updatePostLoader } from "./pages/UpdatePost";
import Profile, { loader as profileLoader } from "./pages/Profile";

import UploadProfilePhoto, {
  loader as uploadProfilePhotoLoader,
} from "./pages/UploadProfilePhoto";
import UpdateProfile, {
  loader as updateProfileLoader,
} from "./pages/UpdateProfile";
import SendEmail, { loader as sendEmailLoader } from "./pages/SendEmail";
import AccountVerification from "./pages/AccountVerification";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      {
        path: "add-category",
        element: <AddNewCategory />,
        loader: addNewCategoryLoader,
      },
      {
        path: "update-category/:categoryId",
        element: <UpdateCategory />,
        loader: updateCategoryLoader,
      },
      {
        path: "category-list",
        element: <CategoryList />,
        loader: categoryListLoader,
      },
      {
        path: "create-post",
        element: <CreatePost />,
        loader: createPostLoader,
      },
      { path: "posts", element: <Posts /> },
      { path: "posts/:postId", element: <Post />, loader: postLoader },
      {
        path: "update-post/:postId",
        element: <UpdatePost />,
        loader: updatePostLoader,
      },
      {
        path: "profile/:profileId",
        element: <Profile />,
        loader: profileLoader,
      },
      {
        path: "upload-profile-photo",
        element: <UploadProfilePhoto />,
        loader: uploadProfilePhotoLoader,
      },
      {
        path: "update-profile",
        element: <UpdateProfile />,
        loader: updateProfileLoader,
      },
      { path: "send-mail", element: <SendEmail />, loader: sendEmailLoader },
      { path: "verify-account/:token", element: <AccountVerification /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
