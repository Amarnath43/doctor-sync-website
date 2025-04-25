import React from "react";
import { Navigate } from "react-router-dom";
import { TOKEN } from "../const/doctor";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem(TOKEN);

    // If the user is authenticated, render the children; otherwise, redirect to "/signin"
    return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
