import React from 'react'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


import './Mycart.css'
import Nav from "../NavBar/Nav";
import { useSelector,useDispatch } from 'react-redux'; 
import { setProduct, removeProduct } from "../../redux/Actions/ProductActons";

const Mycart = () => {
const CartProducts = useSelector((state) => state.allProducts.Products);
const dispatch = useDispatch();
let LogedUser = useSelector((state) => state.allProducts.User);


const totalCartPrice = CartProducts.reduce((total, product) => {
  const totalPriceAsInteger = parseInt(product.totalPrice);
  return total + totalPriceAsInteger;
}, 0);

const nevigate = useNavigate();


const show=()=>{
   if (LogedUser[0] )
   {
    nevigate("/Payment", { state: { CartProducts } });
   }else{
    
    Swal.fire({
      title: "Hello!",
      text: "Please Login Fist", 
      icon: "error",
      confirmButtonText: "Close!",
    });
   }

}
  return (
    <div>
      <Nav />

      {/* price */}
      {CartProducts.reduce((accumulator, product) => {
        const existingProduct = accumulator.find(
          (item) => item.id === product.id
        );

        if (existingProduct) {
          existingProduct.quantity += 1;
          existingProduct.totalPrice =
            existingProduct.price * existingProduct.quantity;
        } else {
          product.totalPrice = product.price;
          accumulator.push({ ...product, quantity: 1 });
        }

        return accumulator;
      }, []).map((product) => (
        <div key={product.id}>
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div class="cart_product">
                  <img
                    src={product.base64Image}
                    alt={product.name}
                    class="card-img-top"
                  />
                </div>
              </div>
              <div class="col-md-4">
                <div class="cart_product">
                  <div class="card-body">
                    <p class="card-text">
                      <span>{product.name}</span>
                      <span>: {product.price} ₹</span>
                      <p class="mt-2">Total Price: {product.totalPrice} ₹</p>
                    </p>
                    <div class="button_container d-flex justify-content-around">
                      <button
                        class="btn btn-primary  mr-2"
                        onClick={() => {
                          dispatch(setProduct(product));
                        }}
                      >
                        +
                      </button>
                      <button class="mr-2">{product.quantity}</button>

                      <button
                        class="btn btn-primary"
                        onClick={() => {
                          dispatch(removeProduct(product));
                        }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex f-rightd-flex justify-content-center">
        <p>Total Cart Price: {totalCartPrice} ₹</p>{" "}
        <button
          onClick={show}
          style={{
            backgroundColor: "#fb641b",
            color: "#fff",
            fontSize: "1em",
            margin: "5px",
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

export default Mycart