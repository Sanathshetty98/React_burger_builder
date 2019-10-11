import React,{ Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary/CheckOutSummary'
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients :{
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        }
    }
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {};
        for(let param of query.entries()){
            ingredients[param[0]] = +param[1]
        }
        this.setState( { ingredients:ingredients } );
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
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        );
    }
}

export default Checkout;