import AuthContext from "./index";
import { to } from "await-to-js";
import axios from "axios";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";

interface AuthProviderProps {
    children: ReactNode;
  }

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  if (process.env.REACT_APP_ROBUST_API_BASE_URL === undefined) {
    throw new Error("REACT_APP_ROBUST_API_BASE_URL is not defined");
  } 

  const [authInfo, setAuthInfo] = useState<any>({
      isAuthenticated: false,
      user: null,
      hasFetched: false,
  });

  async function signIn(email: string, password: string) {
    const [error, response] = await to(
      axios.post(process.env.REACT_APP_ROBUST_API_BASE_URL || "", {
        body: JSON.stringify({ email, password }),
      })
    );

    if (error) {
      toast.warn(error.message);
      return;
    }

    const { user, token } = response.data;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    window.location.href = "/dashboard";

    setAuthInfo({
      isAuthenticated: true,
      user,
      hasFetched: true,
    });
  }

  async function signOut() {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
      setAuthInfo({
        isAuthenticated: false,
        user: null,
        hasFetched: true,
      });
    } catch (error) {
      toast.warn("Error al cerrar sesión, intenta nuevamente.");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...authInfo,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
