import React, { useEffect, useState } from "react";
import Bokdatasevice from "../../services/Operations";
import { setProduct } from "../../redux/Actions/ProductActons";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import Nav from "../NavBar/Nav";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [Electronice, setproducts] = useState([]);
  const [Grocery, setGrocery] = useState([]);
  const [Fashion, setFashion] = useState([]);
  const [Furnicheer, seFurnicheer] = useState([]);
  const navigate = useNavigate();

  let LogedUser = useSelector((state) => state.allProducts.User);

  const product = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct();
    console.log("Allproducts", product.allProducts.Products);
  }, []);

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
      <Nav />
      <h4>Electronice</h4>
      <div className="product_continer">
        {/* {JSON.stringify(products,undefined,2)} */}
        {Electronice.map((product) => (
          <div key={product.id}>
            <div class="card">
              <img
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
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => {
                      BuyNow(product);
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
        ))}
      </div>

      <h4>Fashion</h4>
      <div className="product_continer">
        {/* {JSON.stringify(products,undefined,2)} */}
        {Fashion.map((product) => (
          <div key={product.id}>
            <div class="card">
              <img
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
                  >
                    Add to cart{" "}
                  </button>
                  <button
                    onClick={() => {
                      BuyNow(product);
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
        ))}
      </div>
 
      <h4>Furnicheer</h4>
      <div className="product_continer">
        {/* {JSON.stringify(products,undefined,2)} */}
        {Furnicheer.map((product) => (
          <div key={product.id}>
            <div class="card">
              <img
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
                  >
                    Add to cart{" "}
                  </button>
                  <button
                    onClick={() => {
                      BuyNow(product);
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
        ))}
      </div>
      <h4>Grocery</h4>
      <div className="product_continer">
        {/* {JSON.stringify(products,undefined,2)} */}
        {Grocery.map((product) => (
          <div key={product.id}>
            <div class="card">
              <img
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
                  >
                    Add to cart{" "}
                  </button>
                  <button
                    onClick={() => {
                      BuyNow(product);
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
        ))}
      </div>
    </div>
  );
};

export default Home;
