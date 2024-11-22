import {HashRouter, Routes, Route, Navigate } from "react-router-dom"
import { Loader } from "rsuite";
import AuthContext from "../context";
import AuthContextProvider from "../context/provider";
import { ToastContainer } from "react-toastify"
import Login from "./login";
import Screen404 from "../404";

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
                                        <Route path="/dashboard" element={<Login/>}/>
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
                                        <Route path="/" element={<Login/>}/>
                                    </Routes>
                                </HashRouter>
                            )
                        }else {
                            return <Loader backdrop size="lg" content={<>NightRide</>} vertical key={"loader-router"}/>
                        }
                    }
                }
            </AuthContext.Consumer>
        </AuthContextProvider>
    );
}

export default Router;