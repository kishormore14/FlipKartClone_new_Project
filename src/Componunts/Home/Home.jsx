import React, { useEffect, useState } from "react";
import Bokdatasevice from "../../services/Operations";
import {SearchProduct,
  setProduct,
  Wishlist_PRODUCT,
} from "../../redux/Actions/ProductActons";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../NavBar/Nav";
import { useNavigate } from "react-router-dom";
import Slider1 from "./Images/slider1.webp";
import Slider2 from "./Images/slider2.webp";
import Slider3 from "./Images/slider3.webp";
import Slider4 from "./Images/slider4.webp";
import Swal from "sweetalert2";
import NavBar2 from "../NavBar_2/NavBar2";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const [Electronice, setproducts] = useState([]);
  const [Grocery, setGrocery] = useState([]);
  const [Fashion, setFashion] = useState([]);
  const [Furnicheer, seFurnicheer] = useState([]);
  const navigate = useNavigate();

  let LogedUser = useSelector((state) => state.allProducts.User);
   let WishList = useSelector((state) => state.allProducts.Wishlist);

  const product = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct();
    console.log("Allproducts", WishList);
  }, [WishList]);

  const getProduct = async () => {
    const data = await Bokdatasevice.gettelectronics();

    setproducts(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );

    const Grocery = await Bokdatasevice.getGrocery();
    setGrocery(
      Grocery.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );

    const Fashion = await Bokdatasevice.getfashion();
    setFashion(
      Fashion.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
    const Furnicheer = await Bokdatasevice.getFurnicheer();
    seFurnicheer(
      Furnicheer.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

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
      <div class="nav-container">
        <Nav />
      </div>
      <div class="navbar2-container">
        <NavBar2 />
      </div>
      <div>
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={2000} // Auto-rotation interval in milliseconds
        >
          <div>
            <img src={Slider1} alt="Slider 1" />
          </div>
          <div>
            <img src={Slider2} alt="Slider 2" />
          </div>
          <div>
            <img src={Slider3} alt="Slider 3" />
          </div>
          <div>
            <img src={Slider4} alt="Slider 4" />
          </div>
        </Carousel>
      </div>

      {/* main */}
      <h4>Electronice</h4>
      <div className="product_continer">
        {/* {JSON.stringify(products,undefined,2)} */}
        {Electronice.map((product) => {
          const isProductInWishlist = WishList.find(
            (item) => item.id === product.id
          );
          return (
            <div key={product.id}>
              <div class="card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  onClick={() => {
                    dispatch(Wishlist_PRODUCT(product));
                  }}
                >
                  <path
                    d="M50 90s-18-16-30-28c-12-12-20-24-20-38 0-14 10-24 24-24 8 0 16 4 26 14 10-10 18-14 26-14 14 0 24 10 24 24 0 14-8 26-20 38C68 74 50 90 50 90z"
                    fill={isProductInWishlist ? "red" : "white"}
                    stroke="black"
                    stroke-width="1"
                  />
                </svg>
                <img
                onClick={()=>{
                  dispatch(SearchProduct(product))
                   navigate("/SearchIteam");
                }}
                  src={product.base64Image}
                  alt={product.name}
                  class="card-img-top "
                />
                <div class="card-body">
                  <p class="card-text">
                    <span>{product.name}</span>
                    <span>: {product.price} ₹</span>
                  </p>
                  <div className="button_continer">
                    <button
                      className="btn-primary"
                      onClick={() => {
                        dispatch(setProduct(product));
                      }}
                      style={{
                        backgroundColor: "#ff9f00",
                        color: "#fff",
                        fontSize: "1em",
                      }}
                    >
                      Add to cart
                    </button>
                    <button
                      onClick={() => {
                        BuyNow(product);
                      }}
                      style={{
                        backgroundColor: "#fb641b",
                        color: "#fff",
                        fontSize: "1em",
                        padding: "0rem 2rem",
                      }}
                      className="btn-primary"
                    >
                      {" "}
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h4>Fashion</h4>
      <div className="product_continer">
        {/* {JSON.stringify(products,undefined,2)} */}
        {Fashion.map((product) => {
          const isProductInWishlist = WishList.find(
            (item) => item.id === product.id
          );
          return (
            <div key={product.id}>
              <div class="card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  onClick={() => {
                    dispatch(Wishlist_PRODUCT(product));
                  }}
                >
                  <path
                    d="M50 90s-18-16-30-28c-12-12-20-24-20-38 0-14 10-24 24-24 8 0 16 4 26 14 10-10 18-14 26-14 14 0 24 10 24 24 0 14-8 26-20 38C68 74 50 90 50 90z"
                    fill={isProductInWishlist ? "red" : "white"}
                    stroke="black"
                    stroke-width="1"
                  />
                </svg>
                <img
                onClick={()=>{
                  dispatch(SearchProduct(product))
                   navigate("/SearchIteam");
                }}
                  src={product.base64Image}
                  alt={product.name}
                  class="card-img-top "
                />
                <div class="card-body">
                  <p class="card-text">
                    <span>{product.name}</span>
                    <span>: {product.price} ₹</span>
                  </p>
                  <div className="button_continer">
                    <button
                      className="btn-primary"
                      onClick={() => {
                        dispatch(setProduct(product));
                      }}
                      style={{
                        backgroundColor: "#ff9f00",
                        color: "#fff",
                        fontSize: "1em",
                      }}
                    >
                      Add to cart{" "}
                    </button>
                    <button
                      onClick={() => {
                        BuyNow(product);
                      }}
                      style={{
                        backgroundColor: "#fb641b",
                        color: "#fff",
                        fontSize: "1em",
                        padding: "0rem 2rem",
                      }}
                      className="btn-primary"
                    >
                      {" "}
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h4>Furnicheer</h4>
      <div className="product_continer">
        {/* {JSON.stringify(products,undefined,2)} */}
        {Furnicheer.map((product) => {
          const isProductInWishlist = WishList.find(
            (item) => item.id === product.id
          );
          return (
            <div key={product.id}>
              <div class="card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  onClick={() => {
                    dispatch(Wishlist_PRODUCT(product));
                  }}
                >
                  <path
                    d="M50 90s-18-16-30-28c-12-12-20-24-20-38 0-14 10-24 24-24 8 0 16 4 26 14 10-10 18-14 26-14 14 0 24 10 24 24 0 14-8 26-20 38C68 74 50 90 50 90z"
                    fill={isProductInWishlist ? "red" : "white"}
                    stroke="black"
                    stroke-width="1"
                  />
                </svg>
                <img
                onClick={()=>{
                  dispatch(SearchProduct(product))
                   navigate("/SearchIteam");
                }}
                  src={product.base64Image}
                  alt={product.name}
                  class="card-img-top "
                />
                <div class="card-body">
                  <p class="card-text">
                    <span>{product.name}</span>
                    <span>: {product.price} ₹</span>
                  </p>
                  <div className="button_continer">
                    <button
                      className="btn-primary"
                      onClick={() => {
                        dispatch(setProduct(product));
                      }}
                      style={{
                        backgroundColor: "#ff9f00",
                        color: "#fff",
                        fontSize: "1em",
                      }}
                    >
                      Add to cart{" "}
                    </button>
                    <button
                      onClick={() => {
                        BuyNow(product);
                      }}
                      style={{
                        backgroundColor: "#fb641b",
                        color: "#fff",
                        fontSize: "1em",
                        padding: "0rem 2rem",
                      }}
                      className="btn-primary"
                    >
                      {" "}
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h4>Grocery</h4>
      <div className="product_continer">
        {/* {JSON.stringify(products,undefined,2)} */}
        {Grocery.map((product) => {
          const isProductInWishlist = WishList.find(
            (item) => item.id === product.id
          );
          return (
            <div key={product.id}>
              <div class="card">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  onClick={() => {
                    dispatch(Wishlist_PRODUCT(product));
                  }}
                >
                  <path
                    d="M50 90s-18-16-30-28c-12-12-20-24-20-38 0-14 10-24 24-24 8 0 16 4 26 14 10-10 18-14 26-14 14 0 24 10 24 24 0 14-8 26-20 38C68 74 50 90 50 90z"
                    fill={isProductInWishlist ? "red" : "white"}
                    stroke="black"
                    stroke-width="1"
                  />
                </svg>
                <img
                onClick={()=>{
                  dispatch(SearchProduct(product))
                   navigate("/SearchIteam");
                }}
                  src={product.base64Image}
                  alt={product.name}
                  class="card-img-top "
                />
                <div class="card-body">
                  <p class="card-text">
                    <span>{product.name}</span>
                    <span>: {product.price} ₹</span>
                  </p>
                  <div className="button_continer">
                    <button
                      className="btn-primary"
                      onClick={() => {
                        dispatch(setProduct(product));
                      }}
                      style={{
                        backgroundColor: "#ff9f00",
                        color: "#fff",
                        fontSize: "1em",
                      }}
                    >
                      Add to cart{" "}
                    </button>
                    <button
                      onClick={() => {
                        BuyNow(product);
                      }}
                      style={{
                        backgroundColor: "#fb641b",
                        color: "#fff",
                        fontSize: "1em",
                        padding: "0rem 2rem",
                      }}
                      className="btn-primary"
                    >
                      {" "}
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
