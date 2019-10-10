import React,{ Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'

class Checkout extends Component{
    state = {
        ingredients :{
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        }
    }
    render(){
        return(
            <div>
                <CheckOutSummary ingredients={this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout;