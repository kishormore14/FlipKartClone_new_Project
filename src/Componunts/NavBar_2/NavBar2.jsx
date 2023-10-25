import React from 'react'
import "./NavBar2.css";
import TopOffers from "./Images/Top Offers.webp";


const NavBar2 = () => {
  return (
    <div>
      <ul className="SecondNavUL">
        <li>
          <img src={TopOffers} alt="" />
        </li>
        <li>
          <img src={TopOffers} alt="" />
        </li>
        <li>
          <img src={TopOffers} alt="" />
        </li>
        <li>
          <img src={TopOffers} alt="" />
        </li>
        <li>
          <img src={TopOffers} alt="" />
        </li>
        <li>
          <img src={TopOffers} alt="" />
        </li>
        <li>
          <img src={TopOffers} alt="" />
        </li>
      </ul>
    </div>
  );
}

export default NavBar2