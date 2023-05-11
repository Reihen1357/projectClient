import React, { FC, useContext } from "react";
import { Routes as Router, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes";
import { LOGIN_ROUTE } from "../utils/consts";
import { Context } from "../index";
import Layout from "../components/Layout";

const AppRouter: FC = () => {
  const { user } = useContext(Context);
  return (
    <Router>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => {
          return (
            <Route
              key={path}
              path={path}
              element={
                <Layout>
                  {" "}
                  <Component />{" "}
                </Layout>
              }
            />
          );
        })}

      {publicRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={<Component />}
        />
      ))}
      <Route
        path="*"
        element={<Navigate to={LOGIN_ROUTE} />}
      />
    </Router>
  );
};

export default AppRouter;
