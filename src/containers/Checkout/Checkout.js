import React,{ Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients : null,
        total_price: 0
    }
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {};
        let price=0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price=param[1];
            }
            else{
            ingredients[param[0]] = +param[1];
            }
        }
        this.setState( { ingredients:ingredients, total_price: price} );
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
                    checkoutContinue={this.checkoutContinue}
                    price={this.state.total_price}/>
                <Route path={this.props.match.path + '/contact-data'} 
                       render={(props) =>(<ContactData ingredients={this.state.ingredients} total_price={this.state.total_price} {...props}/>)}/>
            </div>
        );
    }
}

export default Checkout;