import React from 'react'
import {
  setProduct,
  Wishlist_PRODUCT,
} from "../../redux/Actions/ProductActons";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../NavBar/Nav";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const WishList = () => {
       let WishList = useSelector((state) => state.allProducts.Wishlist);
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
      <div>
        <Nav />
        {WishList.map((product) => (
          <div key={product.id} className="search_product row">
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
            <div style={{display:"flex"}}>
              <button
                style={{
                  backgroundColor: "#fb641b",
                  color: "#fff",
                  fontSize: "1em",
                 marginRight:'5px'
                }}
                onClick={() => {
                  BuyNow(product);
                }}
                className="btn-primary"
              >
                Buy Now
              </button>
              <button
                style={{
                  backgroundColor: "#ff9f00",
                  color: "#fff",
                  fontSize: "1em",
                }}
                className="btn-primary"
                onClick={() => {
                  dispatch(setProduct(product));
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishList