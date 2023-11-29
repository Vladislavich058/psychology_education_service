import AppRouter from "Components/AppRouter";
import Footer from "Components/Footer";
import Header from "Components/Header";
import { AuthContext } from "Context/authContext";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [authUser, setAuthUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
      }}
    >
      <BrowserRouter>
        <Header />
        <div className="px-8 min-h-[85vh]">
          <AppRouter />
        </div>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
