import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("login");

  if (isLoggedIn) {
    return <Navigate to="/task-list" replace />;
  }
  return children;
};

export default PublicRoute;
