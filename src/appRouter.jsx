import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { HomePage } from "./pages/home/homePage";
import { Details } from "./pages/details";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/detalhes",
    element: <Details />,
  },
]);

export default router;
