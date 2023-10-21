import React, { useEffect, useState } from 'react';
import './Myorders.css';
import Nav from "../NavBar/Nav";
import Bokdatasevice from "../../services/Operations";
import { useSelector } from "react-redux";

const Myorders = () => {
    const LogedUser = useSelector((state) => state.allProducts.User);
    const [Myorder, setMyorder] = useState([]);

    useEffect(() => {
        
        if (LogedUser[0]?.id) {
            Bokdatasevice.getOrdersByUserId(LogedUser[0].id)
                .then(orders => {
                    setMyorder(orders);
                })
                .catch(error => {
                    console.error("Error fetching user orders:", error);
                });
        }
    }, []);

    console.log(Myorder);

    return (
        <div>
            <Nav />
            <div className="container">
                {Myorder.map((order, index) => (
                    <div className="row" key={index}>
                        <div className="col-md-4"><img src={order.base64Image} alt={order.name} style={{height:'8rem'}}/></div> {/* Replace property1 with the actual property name */}
                        <div className="col-md-4">{order.description}</div> {/* Replace property2 with the actual property name */}
                        <div className="col-md-4">
                            <p>{order.fullName}</p>
                            <p>{order.Email}</p>
                        </div> {/* Replace property3 with the actual property name */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Myorders;


