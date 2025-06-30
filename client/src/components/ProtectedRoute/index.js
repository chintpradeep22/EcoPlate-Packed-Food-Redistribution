import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        toast.error("Please login first!");
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
