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
    checkoutCancel=()=>{
        this.props.history.goBack();
    }
    checkoutContinue=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        return(
            <div>
                <CheckOutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancel={this.checkoutCancel}
                    checkoutContinue={this.checkoutContinue}/>
            </div>
        );
    }
}

export default Checkout;