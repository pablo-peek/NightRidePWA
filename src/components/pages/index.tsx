import {HashRouter, Routes, Route, Navigate } from "react-router-dom"
import { Loader } from "rsuite";
import AuthContext from "../context";
import AuthContextProvider from "../context/provider";
import { ToastContainer } from "react-toastify"
import Home from "./home";
import Dashboard from "./dashboard";
import Screen404 from "../404";
import Login from "./login";
import Register from "./register";

function Router(): JSX.Element {
    return (
        <AuthContextProvider>
            <AuthContext.Consumer>
                {
                    (authInfo: any) => {
                        if (authInfo.isAuthenticated) {
                            return (
                                <HashRouter>
                                    <Routes>
                                        <Route path="/dashboard" element={<Dashboard/>}/>
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
                            )
                        } else if(!authInfo.isAuthenticated){                   
                            return (
                                <HashRouter>
                                    <Routes>
                                        <Route path="/404" element={<Screen404/>}/>
                                        <Route path="/" element={<Home/>}/>
                                        <Route path="/login" element={<Login/>}/>
                                        <Route path="/register" element={<Register/>}/>
                                    </Routes>
                                </HashRouter>
                            )
                        } else {
                            return <Loader backdrop size="lg" content={<>NightRide</>} vertical key={"loader-router"}/>
                        }
                    }
                }
            </AuthContext.Consumer>
        </AuthContextProvider>
    );
}

export default Router;