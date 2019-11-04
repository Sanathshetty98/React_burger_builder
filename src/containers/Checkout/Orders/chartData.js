import React from 'react';
import classes from './chartData.module.css';
const chartData = (props) => {
    return(
        <div>
            <h2><center>Customer Information</center></h2>
            {
                props.data.map( (ele,index) => {
                    return (
                        <div key={index} className={classes.ChartData}>
                            <h4> Customer {index +1}</h4>
                            <ul>
                                <li><p>Name: {ele.orderData.name}</p></li>
                                <li><p>E-mail: {ele.orderData.email}</p></li>
                                <li><p>Zip-Code: {ele.orderData.zipcode}</p></li>
                                <li><p>Order-Date: {ele.orderData.orderDate}</p></li>
                                <li><p>Delivery-Time: {ele.orderData.deliveryTime}</p></li>
                            </ul>
                            {/* <p> Name: {ele.orderData.name}, E-mail: {ele.orderData.email}, Zip-Code: {ele.orderData.zipcode} </p> */}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default chartData;