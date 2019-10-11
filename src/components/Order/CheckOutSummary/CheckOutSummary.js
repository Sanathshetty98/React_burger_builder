import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckOutSummary.module.css';

const checkOutSummary = (props) => {
    return(
        <div className={classes.CheckOutSummary}>
            <h1> We hope it tastes good!!!</h1>
            <div style={{ width: '100%', margin: 'auto',height:'300px'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <h4>Total price: {props.price.toFixed(2)} </h4>
            <Button 
                btnType = "Danger" 
                clicked={props.checkoutCancel}>CANCEL</Button> 
            <Button 
                btnType = "Success" 
                clicked={props.checkoutContinue}>CONTINUE</Button> 
        </div>
    );
}

export default checkOutSummary;