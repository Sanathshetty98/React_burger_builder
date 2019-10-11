import React from 'react';
import classes from './Order.module.css';

const order = (props) =>(
    <div className={classes.Order}>
        <p> Ingredients: salad(1)</p>
        <p> Price: <strong>Rs 5</strong></p>
    </div>
);

export default order;