import { createBrowserRouter } from "react-router-dom";
import App from '../App'; // Removed .jsx extension
import Home from '../home/Home';
import Shop from '../shop/Shop';
import About from '../components/About';
import Blog from '../components/Blog';
import SingleBook from "../shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout"
import UploadBook from "../dashboard/UploadBook";
import Dashboard from "../dashboard/Dashboard";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";
import { server } from "../constants/config";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", // Render Home component for path /
        element: <Home />,
      },
      {
        path: "/Shop", // Render Shop component for path /shop
        element: <Shop />,
      },
      {
        path: "/about", // Render Shop component for path /shop
        element: <About />,
      },
      {
        path: "/blog", // Render Shop component for path /shop
        element: <Blog />,
      },
      {
        path: "/book/:id", // Render Shop component for path /shop
        element: <SingleBook />,
        loader:({params})=>fetch(`${server}/book/${params.id}`),
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout/>,
    children:[
      {
        path:"/admin/dashboard",
        element: <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      },
      {
        path:"/admin/dashboard/upload",
        element: <UploadBook/>,
      },
      {
        path:"/admin/dashboard/manage",
        element: <ManageBooks />,
      },
      {
        path:"/admin/dashboard/edit-books/:id",
        element: <EditBooks />,
        loader:({params})=>fetch(`${server}/book/${params.id}`),
      }
    ]
  },{
    path:"sign-up",
    element:<SignUp/>
  },{
    path:"login",
    element:<Login/>
  },{
    path:"logout",
    element:<Logout/>
  }
]);


export default router;
