import React from "react";
import "./NavBar2.css";
import TopOffers from "./Images/Top Offers.webp";
import Tv from "./Images/TV.webp";
import Mobile from "./Images/Mobile.webp";
import Fashion from "./Images/Fashion.webp";
import Furniture from "./Images/Furniture.webp";
import Home_Kitchen from "./Images/Furniture.webp";

const NavBar2 = () => {
  return (
    <div>
      <ul className="SecondNavUL">
        <li>
          <img src={TopOffers} alt="" />
        </li>
        <li>
          <img src={Tv} alt="" />
        </li>
        <li>
          <img src={Mobile} alt="" />
        </li>
        <li>
          <img src={Fashion} alt="" />
        </li>
        <li>
          <img src={Furniture} alt="" />
        </li>
        <li>
          <img src={Home_Kitchen} alt="" />
        </li>
      </ul>
    </div>
  );
};

export default NavBar2;
