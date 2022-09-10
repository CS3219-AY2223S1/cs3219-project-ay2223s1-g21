// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(state => state.authReducer.jwtToken !== "");

  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />
};

export default PrivateRoute;
