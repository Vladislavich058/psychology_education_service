import { useAuth } from "Hooks/useAuth";
import Login from "Pages/Login";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, publicRoutes } from "Routes/routes";

const AppRouter = () => {
  const { authUser } = useAuth();

  return (
    <Routes>
      {authUser && authUser.role === "ROLE_ADMIN"
        ? adminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))
        : publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
