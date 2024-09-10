import { Navigate } from "react-router-dom";
import userStore from "../zustand/userStore";

const ProtectedRoute = ({ children }) => {
  if (!userStore.getState().user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
