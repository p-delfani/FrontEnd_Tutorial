import { createBrowserRouter, redirect } from "react-router";
import HomePage from "./pages/home/page";
import BlogPage from "./pages/blog/page";

const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <HomePage />,
  },
  {
    path: "/blog/:blogID",
    element: <BlogPage />,
  },
  {
    path: "*",
    loader: () => redirect("/"),
  },
]);

export default router;
