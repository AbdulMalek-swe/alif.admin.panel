import DashboardHome from "pages/Dashboard/DashboardHome/DashboardHome";
import Login from "pages/User/Login";
import DashboardLayout from "./Layout/AppLayout";
import AlefVeganData, { UpdateVeganData } from "pages/Dashboard/AlefVeganData/AlefVeganData";
import AlefBannerData,{UpdateBannerData} from "pages/Dashboard/AlefVeganData/AlefBanner";
import MadeOrder from "pages/MadeToOrder/MadeOrder";
import Inside from "pages/InsideAlif/Inside";
import HomeProduct  from "pages/Product/HomeProduct";
import UpdateProduct from "pages/Product/Update";
const { createBrowserRouter } = require("react-router-dom");
const route = createBrowserRouter([
     {
       path:"/",
       element: <Login/>
     },
     {
          path:"/dashboard",
          element: <DashboardLayout/>,
          children:[
               {
                    path:"/dashboard",
                    element: <DashboardHome/>,
               },
               {
                    path:"/dashboard/uihome",
                    element: <AlefVeganData/>
                     
               },
               {
                    path:'/dashboard/uihome/:id',
                         element:<UpdateVeganData/>,
                       
               },
               {
                    path:'/dashboard/banner',
                         element:<AlefBannerData/>,
                       
               },
               {
                    path:'/dashboard/banner/:id',
                         element:<UpdateBannerData/>,
                       
               },
               {
                    path:'/dashboard/made-order',
                         element:<MadeOrder/>,
                       
               },
               {
                    path:'/dashboard/inside-alif',
                         element:<Inside/>,
                       
               },
               {
                    path:'/dashboard/product',
                         element:<HomeProduct/>,
                       
               },
               {
                    path:'/dashboard/updateproduct/:id',
                         element:<UpdateProduct/>,
                       
               }
               
          ]
     }
])
export default route;