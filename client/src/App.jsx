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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
