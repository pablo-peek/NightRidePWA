import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context";
import AuthContextProvider from "../context/provider";
import { ToastContainer } from "react-toastify";
import Home from "./home";
import Dashboard from "./dashboard";
import Profile from "./profile";
import Screen404 from "../404";
import Login from "./login";
import Register from "./register";
import Navbar from "../navbar";
import Loader1 from "../Loader";

function Router(): JSX.Element {
  const authInfo = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authInfo?.hasFetched) {
      setLoading(false);
    }
  }, [authInfo]);

  if (loading) {
    return <Loader1 visible={true} />;
  }

  return (
    <HashRouter>
      <Navbar />
      <Routes>
        {authInfo?.isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/404" element={<Screen404 />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      <ToastContainer
        containerId={"globalToast"}
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
        theme="light"
      />
    </HashRouter>
  );
}

function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;