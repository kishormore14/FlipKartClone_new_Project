import React, { useState } from "react";
import "./Pyment.css";
import Nav from "../NavBar/Nav";
import { useSelector, useDispatch } from "react-redux";
import Bokdatasevice from "../../services/Operations"
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";


const Pyment = () => {
    const location = useLocation();
    const { state } = location;
    const CartProducts =
      (state && state.CartProducts) || (state && state.product);
    if (CartProducts) {
      console.log(CartProducts);
    }else {
      console.log("CartProducts is not available in the state");
    }

 

  let LogedUser = useSelector((state) => state.allProducts.User);
  const [step, setStep] = useState(false);
  const [formData, setFormData] = useState({
    fullName: LogedUser[0].User_Name,
    mobile: LogedUser[0].Mobile,
    address: LogedUser[0].Address,
    cardName: "",
    cardNumber: "",
    cvv: "",
    Email: "",
    expMonth: "",
    expYear: "",
  });

  const toggleStep = () => {
    setStep(!step);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.cardNumber === "" && formData.cvv === "") {
      const addOrderPromises = [];

      CartProducts.forEach(element => {
        Object.assign(element, formData);
        element.UserId = LogedUser[0].id;
        addOrderPromises.push(Bokdatasevice.AddOrder(element));
      });

      Promise.all(addOrderPromises)
        .then(() => {
          
          // Swal.fire({
          //   position: 'center',
          //   icon: 'success',
          //   title: 'Your order will be delivered soon',
          //   html: `<div>Name: ${LogedUser[0].User_Name}</div>`,
          //   showConfirmButton: false,
          //   timer: 1500
          // });
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: ` ${ LogedUser[0].User_Name} Your order will be delivered soon`,
            showConfirmButton: false,
            timer: 5000,
            html: `
    <div class="container mt-5 d-flex justify-content-center">
      <div class="card p-4 mt-3">
        <div class="first d-flex justify-content-between align-items-center mb-3">
          <div class="info">
            <span class="d-block name">Thank you, ${ LogedUser[0].User_Name}</span>
            <span class="order">Order - 4554645</span>
          </div>
          <img src="https://i.imgur.com/NiAVkEw.png" width="40"/>
        </div>
        <div class="detail">
          <span class="d-block summery">Your order has been dispatched. We are delivering your order.</span>
        </div>
        <hr>
        <div class="text">
          <span class="d-block new mb-1">${LogedUser[0].Mobile}</span>
        </div>
        <span class="d-block address mb-3">${LogedUser[0].Address}</span>
        <div class="money d-flex flex-row mt-2 align-items-center">
          <img src="https://i.imgur.com/ppwgjMU.png" width="20" />
          <span class="ml-2">Cash on Delivery</span>
        </div>
        <div class="last d-flex align-items-center mt-3">
          <span class="address-line">CHANGE MY DELIVERY ADDRESS</span>
        </div>
      </div>
    </div>
  `
          });


        })
        .catch(error => {
          console.error("Error inserting data:", error);
        });

      

    } else if (formData.cardNumber.length !== 16) {
      console.error("Card number must be exactly 16 characters long.");
    } else if (formData.cvv.length !== 3) {
      console.error("CVV must be exactly 3 characters long.");
    } else {
      

      const combinedObject = { ...CartProducts, ...formData };
      combinedObject.UserId = LogedUser.id
      console.log("two",combinedObject);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Nav />

      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-75">
            <div className="container">
              <div className="row">
                <div className="row">
                  <div className="col-5">
                    <button  onClick={toggleStep}>By Card</button>
                    <h3>Billing Address</h3>
                    <label htmlFor="fname">
                      <i className="fa fa-user" /> Full Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      readOnly
                    />
                    <label htmlFor="fname">
                      <i className="fa fa-user" /> Email
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="Email"
                      value={formData.Email}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="Mobile">
                      <i className="fa fa-envelope" /> Mobile
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="adr">
                      <i className="fa fa-address-card-o" /> Address
                    </label>
                    <input
                      type="text"
                      id="adr"
                      name="address"
                      placeholder="542 W. 15th Street"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  {step && (
                    <div className="col-5">
                      <h3>Payment</h3>
                      <div className="icon-container">
                        <i
                          className="fa fa-cc-visa"
                          style={{ color: "navy" }}
                        />
                        <i
                          className="fa fa-cc-amex"
                          style={{ color: "blue" }}
                        />
                        <i
                          className="fa fa-cc-mastercard"
                          style={{ color: "red" }}
                        />
                        <i
                          className="fa fa-cc-discover"
                          style={{ color: "orange" }}
                        />
                      </div>
                      <label htmlFor="cname">Name on Card</label>
                      <input
                        type="text"
                        id="cname"
                        name="cardName"
                        placeholder="John More Doe"
                        value={formData.cardName} // Connect the value to the state
                        onChange={handleInputChange} // Handle changes
                      />
                      <label htmlFor="ccnum">Credit card number</label>
                      <input
                        type="text"
                        id="ccnum"
                        name="cardNumber"
                        placeholder="1111-2222-3333-4444"
                        value={formData.cardNumber} // Connect the value to the state
                        onChange={handleInputChange} // Handle changes
                      />
                      <label htmlFor="expmonth">Exp Month</label>
                      <input
                        type="text"
                        id="expmonth"
                        name="expMonth"
                        placeholder="September"
                        value={formData.expMonth} // Connect the value to the state
                        onChange={handleInputChange} // Handle changes
                      />
                      <div className="row">
                        <div className="col-50">
                          <label htmlFor="expyear">Exp Year</label>
                          <input
                            type="text"
                            id="expyear"
                            name="expYear"
                            placeholder={2018}
                            value={formData.expYear} // Connect the value to the state
                            onChange={handleInputChange} // Handle changes
                          />
                        </div>
                        <div className="col-50">
                          <label htmlFor="cvv">CVV</label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            placeholder={352}
                            value={formData.cvv} // Connect the value to the state
                            onChange={handleInputChange} // Handle changes
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <label>
                <input
                  type="checkbox"
                  defaultChecked="checked"
                  name="sameadr"
                />
                Shipping address same as billing
              </label>
              <input
                type="submit"
                defaultValue="Continue to checkout"
                className="btn"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Pyment;
