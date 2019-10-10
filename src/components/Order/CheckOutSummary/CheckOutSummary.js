import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckOutSummary.module.css';

const checkOutSummary = (props) => {
    return(
        <div className={classes.CheckOutSummary}>
            <h1>Hope it tastes good!!!</h1>
            <div style={{ width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType = "Danger" 
                clicked>CANCEL</Button> 
            <Button 
                btnType = "Success" 
                clicked>CONTINUE</Button> 
        </div>
    );
}

export default checkOutSummary;