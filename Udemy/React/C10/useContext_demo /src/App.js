import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // note we don't want to run args1 code inside a component function as they are side effects which might disrupt component rendering
  // by putting them in useEfect, we ensure that these code logics are only executed AFTER every component evaluation
  // IF any of the dependencies changed
  // below code only run once with no dependency is specified
  useEffect(() => {
    const storedUserLoggedIn = localStorage.getItem("isLoggedIn"); // when re-render, check if user logged in
    if (storedUserLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1"); // global variable provided by browser. Item is like a java entry: a key-value pair
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");      // remove that loggin item on log out
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
