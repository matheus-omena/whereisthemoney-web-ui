import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../pages/Authentication/Register";
import SignIn from "../pages/Authentication/SignIn";
import LandingPage from "../pages/LandingPage/LandingPage";

export default function SignRoutes() {
    return (
        <BrowserRouter>            
            <Routes>
                <Route path="/" element={<LandingPage />} />  
                <Route path="/signin" element={<SignIn />} />  
                <Route path="/register" element={<Register />} />                
                {/* <Route path="/*" element={<NotAuthenticated />} /> */}
            </Routes>            
        </BrowserRouter>   
    );
}