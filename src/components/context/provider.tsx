import AuthContext from "./index";
import { to } from "await-to-js";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface userData {
  isAuthenticated: boolean;
  user: any;
  hasFetched: boolean;
}

export interface AuthContextType extends userData {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authInfo, setAuthInfo] = useState<userData>({
    isAuthenticated: false,
    user: null,
    hasFetched: false,
  });

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        const [error, response] = await to(
          axios.post(`${process.env.REACT_APP_ROBUST_API_BASE_URL}/auth/validate-token`, {
            headers: {
              Authorization: token,
            },
          })
        );

        if (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setAuthInfo({
            isAuthenticated: false,
            user: null,
            hasFetched: true,
          });
          return;
        }

        setAuthInfo({
          isAuthenticated: true,
          user: user,
          hasFetched: true,
        });
      } else {
        setAuthInfo({
          isAuthenticated: false,
          user: null,
          hasFetched: true,
        });
      }
    };

    validateToken();
  }, []);

  async function signIn(email: string, password: string) {
    const [error, response] = await to(
      axios.post(`${process.env.REACT_APP_ROBUST_API_BASE_URL}/auth/login`, {
        email,
        password,
      })
    );

    if (error) {
      toast.warn(error.message);
      return;
    }

    const { username, token } = response.data.data;
    localStorage.setItem("user", username);
    localStorage.setItem("token", token);

    setAuthInfo({
      isAuthenticated: true,
      user: username,
      hasFetched: true,
    });

    window.location.href = "#/dashboard";
    return response.data.data.username;
  }

  async function signOut() {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuthInfo({
        isAuthenticated: false,
        user: null,
        hasFetched: true,
      });
      window.location.href = "/";
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