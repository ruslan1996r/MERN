import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "materialize-css";

import { useRoutes } from "./routes";
import { useAuth } from "./hooks";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";

const App = () => {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token; //token => boolean
  const routes = useRoutes(isAuthenticated); //передаёт Boolean, в зависимости от которого меняются доступные роуты

  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
