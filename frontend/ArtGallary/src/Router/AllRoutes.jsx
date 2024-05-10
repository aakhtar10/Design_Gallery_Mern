
import {  Route,Routes } from 'react-router-dom';

import Paint from '../Component/Paint/Paint';
import Print from '../Component/Prints/Print';
import Sculpture from '../Component/Sculpture/Sculpture';
import Photography from '../Component/Photography/Photography';
import Inspiration from '../Component/Insipration/Inspiration';
import Drawing from '../Component/Drawings/Drawing';
import Cart from '../pages/Cart/Cart';
import Profile from '../pages/Profile/Profile';
import ArtProtfolio from '../pages/ArtProtfolio/ArtProtfolio';
import Signup from '../pages/Signup/Signup';
import Login from '../pages/Login/Login';
import About from '../pages/About/About';
import Navbar from '../Component/Navbar/Navbar';


const AllRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/paintings" element={<Paint />} />
        <Route path="/prints" element={<Print />} />
        <Route path="/sculpture" element={<Sculpture />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/inspiration" element={<Inspiration />} />
        <Route path="/drawings" element={<Drawing />} />
        <Route path="/cart" element={< Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/art-portfolio" element={<ArtProtfolio />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>

  );
};

export default AllRoutes;
