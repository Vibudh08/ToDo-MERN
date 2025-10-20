import { Navigate } from "react-router-dom";
// import jwtDecode from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("login");

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
