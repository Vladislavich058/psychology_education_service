import { AuthContext } from "Context/authContext";
import { useContext, useEffect } from "react";

export const useAuth = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);

  useEffect(() => {
    const authUser = sessionStorage.getItem("user");
    if (authUser) {
      sessionStorage.setItem("user", authUser);
      setAuthUser(JSON.parse(authUser));
    }
  }, []);

  const login = (authUser) => {
    setAuthUser(authUser);
    sessionStorage.setItem("user", JSON.stringify(authUser));
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setAuthUser(null);
  };

  return { authUser, login, logout };
};

