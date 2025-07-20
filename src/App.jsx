import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Main from "./pages/postPage";
import FixItems from "./components/fixedItems";
import TodoPage from "./pages/todoPage";
import CommentsPage from "./pages/commentsPage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/id/1" replace /> },
    {
      path: "/id/:id",
      element: <FixItems />,
      children: [
        { index: true, element: <Main /> },
        { path: "main", element: <Main /> },
        { path: "todoPage", element: <TodoPage /> },
        { path: "commentsPage", element: <CommentsPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
