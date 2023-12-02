import { useAuth } from "Hooks/useAuth";
import Login from "Pages/Login";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, psychologistRoutes, publicRoutes } from "Routes/routes";

const AppRouter = () => {
  const { authUser } = useAuth();

  return (
    <Routes>
      {authUser && authUser.role === "ROLE_ADMIN"
        ? adminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))
        : authUser && authUser.role === "ROLE_PSYCHOLOGIST"
        ? psychologistRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))
        : publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
      <Route path="/" element={<Login />} />
      <Route
        path="*"
        element={
          <Navigate
            to={
              authUser?.role === "ROLE_ADMIN"
                ? "/courses"
                : authUser?.role === "ROLE_PSYCHOLOGIST"
                ? "/courses"
                : "/"
            }
          />
        }
      />
    </Routes>
  );
};

export default AppRouter;
