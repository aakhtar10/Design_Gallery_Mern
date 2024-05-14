import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Paint from "../Component/Paint/Paint";
import Print from "../Component/Prints/Print";
import Sculpture from "../Component/Sculpture/Sculpture";
import Photography from "../Component/Photography/Photography";
import Inspiration from "../Component/Insipration/Inspiration";
import Drawing from "../Component/Drawings/Drawing";
import Cart from "../pages/Cart/Cart";
import Profile from "../pages/Profile/Profile";
import ArtProtfolio from "../pages/ArtProtfolio/ArtProtfolio";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import About from "../pages/About/About";
import Navbar from "../Component/Navbar/Navbar";
import Art from "../pages/Art/Art";
import SingleArt from "../pages/SingleArt/singleArt";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import Footer from "../Component/Footer/Footer";
import Contact from "../pages/ContactUs/Contact";
import DashNav from "../pages/Dashboard/Dashbordnav";
import ChatBotComponent from "../Component/ChatBot/chatBot";
const AllRoutes = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);
  const [showDashNav, setDashNav] = useState(false)
  useEffect(() => {
    
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setShowNavbar(false);
      setShowFooter(false);
      setDashNav(false)
    }
    else if (location.pathname === "/" || location.pathname === '/about' || location.pathname === '/contactus') {
      setShowNavbar(false)
      setShowFooter(true)
      setDashNav(true)
    }
    else {
      setShowNavbar(true);
      setShowFooter(true);
      setDashNav(false)
    }
  }, [location]);

  return (
    <div>
      {showNavbar && <Navbar isDashboardNavbar={false}  />}
      {showDashNav && <DashNav />}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/art/paintings" element={<Paint />} />
        <Route path="/art/prints" element={<Print />} />
        <Route path="/art/sculpture" element={<Sculpture />} />
        <Route path="/art/photography" element={<Photography />} />
        <Route path="/art/inspiration" element={<Inspiration />} />
        <Route path="/art/drawings" element={<Drawing />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/art-portfolio" element={<ArtProtfolio />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/art" element={<Art />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/art/:id" element={<SingleArt />} />
      </Routes>
      {showFooter && <Footer />}
      <ChatBotComponent/>
    </div>
  );
};

export default AllRoutes;
