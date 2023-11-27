import React, { useState, useEffect } from "react";
import "./Nav.css";
import Logo from "../../Images/logo.png";
import Shop from "../../Images/shop_icon.png";
import MyOrder from "../../Images/first-order.svg";
import Login_img from "../../Images/login_img.png";
import Bokdatasevice from "../../services/Operations";
import Alert from "react-bootstrap/Alert";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { SetUser, SearchProduct } from "../../redux/Actions/ProductActons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const Nav = () => {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const electronicData = await Bokdatasevice.gettelectronics();
    const groceryData = await Bokdatasevice.getGrocery();
    const fashionData = await Bokdatasevice.getfashion();
    const furnitureData = await Bokdatasevice.getFurnicheer();

    const products = [
      ...electronicData.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      ...groceryData.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      ...fashionData.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      ...furnitureData.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    ];

    setAllProducts(products);
  };

  const dispatch = useDispatch();

  let Cartproduct = useSelector((state) => state.allProducts.Products.length);
    let WishList = useSelector((state) => state.allProducts.Wishlist.length);

  let LogedUser = useSelector((state) => state.allProducts.User);

  const [Logine_register, setLogine_register] = useState(true);
  const [Logine, setLogine] = useState({
    User_Name: "",
    Password: "",
  });
  const [register, setregister] = useState({
    User_Name: "",
    Mobile: "",
    Address: "",
    Password: "",
    ConformPassword: "",
  });
  const [message, setMessage] = useState({ error: false, mes: "" }); // Define the message state

  const toggle = () => {
    setLogine_register(!Logine_register);
  };

  const Login = (e) => {
    const { name, value } = e.target;
    setLogine({
      ...Logine,
      [name]: value,
    });
  };

  const postLogine = async () => {
    const { User_Name, Password } = Logine;
    const user_log = await Bokdatasevice.findUserByCredentials(
      User_Name,
      Password
    );
    if (user_log) {
      dispatch(SetUser(user_log));
      alert("welcome");   
        navigate("/");
    } else {
      alert("Unknown User");
        navigate("/");
    }
  };
  const Registration = (e) => {
    const { name, value } = e.target;
    setregister({
      ...register,
      [name]: value,
    });
  };
  const postRegister = async () => {
    const { User_Name, Mobile, Address, Password, ConformPassword } = register;
    const NewUser = {
      User_Name,
      Mobile,
      Address,
      Password,
      
    };

    if (register.Password === register.ConformPassword) {
      if (register.Mobile.length == 10) {
        try {
          await Bokdatasevice.AddUser(NewUser);
          Swal.fire({
            title: "Hello!",
            text: "plz go to Login",
            icon: "success",
            confirmButtonText: "Close!",
          });
            navigate("/");
        } catch (err) {
          Swal.fire({
            title: "Hello!",
            text: "Sorry! Something went wrong",
            icon: "error",
            confirmButtonText: "Close!",
          });
             navigate("/");

        }
        setregister({
          User_Name: "",
          Mobile: "",
          Address: "",
          Password: "",
          ConformPassword: "",
        });
      } else {
        alert("Please enter correct Mobile");
      }
    } else {
      alert("Please enter correct password");
    }
  
  };
 
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on search query (make sure to handle undefined values)
  const filteredProducts = allProducts.filter((product) =>
    product.name && searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : false
  );

 const [isDropdownOpen, setIsDropdownOpen] = useState(false);

 const toggleDropdown = () => {
   setIsDropdownOpen(!isDropdownOpen);
 };

 const closeDropdown = () => {
   setIsDropdownOpen(false);
 };
 const gotoserch = (prod) => {
  dispatch(SearchProduct(prod));
   navigate("/SearchIteam");
 };

  const Myordercheck = () => {
    if (LogedUser[0]) {
      
      navigate("Myorders");
      console.log("hellow");
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
      {message?.mes && (
        <Alert
          variant={message?.error ? "danger" : "success"}
          dismissible
          onClose={() => {
            setMessage("");
          }}
        >
          {message.mes}
        </Alert>
      )}

      <div className="Nav_container" style={{ backgroundColor: "#2874f0" }}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/">
              <img src={Logo} alt="Logo" />
            </Link>

            <form className="d-flex" style={{ width: "50%" }}>
              <input
                className="form-control search_Inpute me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />

              <ul className="product_container">
                {searchQuery && filteredProducts.length > 0
                  ? filteredProducts.map((product) => (
                      <span
                        to="SearchIteam"
                        style={{ color: "black", textDecoration: "none" }}
                        onClick={() => {
                          gotoserch(product);
                        }}
                      >
                        <li key={product.id} className="list_products">
                          <img
                            src={product.base64Image}
                            alt=""
                            style={{ width: "50px", height: "50px" }}
                          />
                          {product.name}
                        </li>
                      </span>
                    ))
                  : null}
              </ul>
            </form>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0"
                style={{ width: "100%", justifyContent: "center" }}
              >
                <li className="nav-item">
                  <span
                    className="nav-link active cursor-pointer_Myorder"
                    aria-current="page"
                    onClick={Myordercheck}
                  >
                    <img
                      src={MyOrder}
                      alt="Myorders"
                      style={{ width: "20px", marginRight: "4px" }}
                    />
                    Myorders
                  </span>
                </li>
                <li className="nav-item d-flex  align-items-center">
                  <FontAwesomeIcon icon={faUser} />

                  {LogedUser[0] ? (
                    // <span
                    //   className="onhover"
                    //   onClick={() => {
                    //     dispatch(SetUser(null));
                    //     navigate("/");
                    //   }}
                    // >
                    //   {LogedUser[0].User_Name}
                    //   <div className="droupdown">
                    //     <ul>
                    //       <li>Wishlist(0)</li>
                    //       <li>Sign out</li>
                    //     </ul>
                    //   </div>
                    // </span>
                    <span
                      className="onhover"
                      onMouseEnter={toggleDropdown}
                      onMouseLeave={closeDropdown}
                    >
                      {LogedUser[0].User_Name}
                      {isDropdownOpen && (
                        <div className="dropdown">
                          <ul>
                            <li>
                            
                              <Link
                                to="WishList"
                                style={{
                                  color: "black",
                                  textDecoration: "none",
                                }}
                              >
                                Wishlist({WishList})
                              </Link>
                            </li>
                            <li
                              onClick={() => {
                                dispatch(SetUser(null));
                                navigate("/");
                              }}
                            >
                              Sign out
                            </li>
                          </ul>
                        </div>
                      )}
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="btn  nav-link"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Sign in
                    </button>
                  )}
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="cart"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    Cart{Cartproduct}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      {/* Modale */}

      <div>
        {/* Button trigger modal */}

        {Logine_register ? (
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-body p-0">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-5 Logine_left">
                        <h4 className="Looks">Login</h4>
                        <h6 className="Sign_up">
                          Get access to your Orders, Wishlist <br /> and
                          Recommendations
                        </h6>
                        <img
                          src={Login_img}
                          alt="Login_img"
                          className="Login_img"
                        />
                      </div>
                      <div className="col-md-7">
                        <input
                          className="Form_Inpute"
                          type="text"
                          placeholder="Email OR User_Name"
                          name="User_Name"
                          onChange={Login}
                          value={Logine.User_Name}
                          required
                        />
                        <input
                          className="Form_Inpute"
                          type="password"
                          placeholder="Password"
                          name="Password"
                          onChange={Login}
                          value={Logine.Password}
                          required
                        />
                        <br />
                        <div style={{ textAlign: "center", marginTop: "1rem" }}>
                          <button onClick={postLogine}>Login</button>
                          <br />
                          <button
                            onClick={toggle}
                            style={{
                              color: "#2874f0",
                              fontWeight: "500",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            Create Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-body p-0">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-5 Logine_left">
                        <h4 className="Looks">Looks like you're new here!</h4>
                        <h6 className="Sign_up">
                          Sign up with your mobile number to <br /> get started
                        </h6>
                        <img
                          src={Login_img}
                          alt="Login_img"
                          className="Login_img"
                        />
                      </div>
                      <div className="col-md-7">
                        <input
                          className="Form_Inpute"
                          type="text"
                          placeholder="Email OR User_Name"
                          name="User_Name"
                          value={register.User_Name}
                          onChange={Registration}
                          required
                        />
                        <input
                          className="Form_Inpute"
                          type="text"
                          placeholder="Mobile Number"
                          name="Mobile"
                          value={register.Mobile}
                          onChange={Registration}
                          required
                        />
                        <input
                          className="Form_Inpute"
                          type="textarea"
                          placeholder="Address"
                          name="Address"
                          value={register.Address}
                          onChange={Registration}
                          required
                        />
                        <input
                          className="Form_Inpute"
                          type="password"
                          placeholder="Password"
                          name="Password"
                          value={register.Password}
                          onChange={Registration}
                          required
                        />
                        <input
                          className="Form_Inpute"
                          type="password"
                          placeholder=" conform Password"
                          name="ConformPassword"
                          value={register.ConformPassword}
                          onChange={Registration}
                          required
                        />
                        <br />
                        <div style={{ textAlign: "center", marginTop: "1rem" }}>
                          <button onClick={postRegister}>Submit</button>
                          <br />
                          <button
                            style={{
                              color: "#2874f0",
                              fontWeight: "500",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={toggle}
                          >
                            Login
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
