import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Root from "./routes/root";
import UserPage from "./routes/user";
import AdminPage from "./routes/admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "admin", element: <AdminPage /> },
      { path: "user", element: <UserPage /> },
    ],
  },
]);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

export default App;
