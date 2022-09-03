import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarMenu from "../components/General/NavbarMenu";
import Home from "../pages/Home/Home";

export default function WebRoutes() {
  return (
    <BrowserRouter>
      <main className="container mx-auto px-5 xl:px-0 lg:px-0 md:px-0 sm:px-5 py-5">
        <NavbarMenu />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* <Route path="/*" element={<NotFound />} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}
