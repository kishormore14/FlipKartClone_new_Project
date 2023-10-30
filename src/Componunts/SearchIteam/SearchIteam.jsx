import React from 'react'
import './SearchIteam.css'
import Nav from "../NavBar/Nav";
import { useSelector, useDispatch } from "react-redux";
import { setProduct } from "../../redux/Actions/ProductActons";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Bokdatasevice from "../../services/Operations";





const SearchIteam = () => {
const product = useSelector((state) => state.allProducts.Search);
  const navigate = useNavigate();
    let LogedUser = useSelector((state) => state.allProducts.User);


console.log(product);
const dispatch = useDispatch();
  const BuyNow = (prod) => {
    if (LogedUser[0]) {
      const product = [];
      product.push(prod);
      navigate("/Payment", { state: { product } });
    } else {
      Swal.fire({
        title: "Hello!",
        text: "Please Login Fist",
        icon: "error",
        confirmButtonText: "Close!",
      });
    }
  };
  return (
    <div>
      <Nav />
      <div className="search_product row">
        <div className="col-md-3">
          <h1>Product Details</h1>
          <p>Name: {product.name}</p>
          <p>Price: {product.price}</p>
          <img src={product.base64Image} alt="Product Image" />
        </div>
        <div className="col-md-4">
          <h4>Description</h4>
          {product.description}
        </div>
      </div>
      <button
        style={{ backgroundColor: "#fb641b", color: "#fff", fontSize: "1em" ,margin:'5px'}}
        onClick={() => {
          BuyNow(product);
        }}
        className="btn-primary"
      >
        Buy Now
      </button>
      <button
        style={{ backgroundColor: "#ff9f00", color: "#fff", fontSize: "1em" }}
        className="btn-primary"
        onClick={() => {
          dispatch(setProduct(product));
        }}
      >
        Add to cart
      </button>
    </div>
  );
}

export default SearchIteam


