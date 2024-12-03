import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../components/context";
import AuthContextProvider from "../components/context/provider";
import { ToastContainer } from "react-toastify";
import Home from "./home";
import DashboardRaceOne from "./dashboardraceone";
import DashboardRaceTwo from "./dashboardracetwo";
import Profile from "./profile";
import Screen404 from "../components/404";
import Login from "./login";
import Register from "./register";
import Navbar from "../components/navbar";
import Loader1 from "../components/Loader";

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
            <Route path="/dashboard/race-one" element={<DashboardRaceOne />} />
            <Route path="/dashboard/race-two" element={<DashboardRaceTwo />} />
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
              position="top-center"
              hideProgressBar={true}
              limit={3}
              autoClose={3000}
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