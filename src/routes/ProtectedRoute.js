import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem("role");

  // If the role does not match the required role, redirect to homepage or login
  if (role !== requiredRole) {
    return <Navigate to="/" />; // You can redirect to a login page if needed
  }

  return children; // Render protected route if role matches
};

export default ProtectedRoute;
