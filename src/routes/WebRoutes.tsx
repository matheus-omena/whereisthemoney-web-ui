import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import NavbarMenu from "../components/General/NavbarMenu";
import Home from "../pages/Home/Home";

export default function WebRoutes() {
    return (
        <BrowserRouter>
            <NavbarMenu />

            <div className="container mx-auto px-5 py-5">
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* <Route path="/*" element={<NotFound />} /> */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}