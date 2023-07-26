import { AuthContext } from "context/authContext";
import { useContext } from "react";
import { Cookies, useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

 
 
const ProtectedRoute = ({children}) => {
const [cookies] = useCookies(['token']);
  const token = cookies['token'];
   if (!token || token===undefined) {
      return <Navigate to="/" replace />;
    }
    return children;
};

export default ProtectedRoute;