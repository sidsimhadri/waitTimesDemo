import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import UserPage from "./routes/user"
import AdminPage from "./routes/admin"
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
  return <RouterProvider router={router} />;
}

export default App;
