import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Customize from "./pages/Customize";
import Home from "./pages/Home";
import { userDataContext } from "./Context/userContext";
import SecondCustomize from "./pages/SecondCustomize";

const App = () => {
  const { userData, setUserData } = useContext(userDataContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.assistantImage && userData.assistantName ? (
            <Home />
          ) : (
            <Navigate to={"/customize"} />
          )
        }
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to={"/"} />}
      />
      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to={"/signup"} />}
      />
      <Route
        path="/secCustomize"
        element={userData ? <SecondCustomize /> : <Navigate to={"/signup"} />}
      />
    </Routes>
  );
};

export default App;
