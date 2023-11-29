import { useState } from "react";
import { useAuth } from "./useAuth";

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const { logout } = useAuth();

  async function fetching() {
    try {
      setIsLoading(true);
      await callback();
    } catch (e) {
      e.response && e.response.data && e.response.data.status === 401
        ? logout()
        : setErrorOpen(true);
      const errorMes =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      setError(errorMes);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    fetching: fetching,
    isLoading: isLoading,
    error: error,
    errorOpen: errorOpen,
    setErrorOpen: setErrorOpen,
  };
};
