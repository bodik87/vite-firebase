import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home-page";
import FirestorePage from "./pages/firestore-page";
import RealtimeDatabasePage from "./pages/realtime-database-page";
import ErrorPage from "./pages/error-page";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/firestore",
        element: <FirestorePage />,
      },
      {
        path: "/realtime-database",
        element: <RealtimeDatabasePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
