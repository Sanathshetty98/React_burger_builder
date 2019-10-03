import React,{ Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat:1.3,
    bacon:0.7
};
class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        total_price:4,
        purchaseable:false,
        purchasing: false
    }
    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
        .map( igkey => {
            return ingredients[igkey];
        })
        .reduce( ( sum, el ) => { 
            return sum + el;
        }, 0);
        this.setState( { purchaseable: sum > 0} );
    }
    addedIngredients = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.total_price;
        const newPrice = oldPrice + priceAddition ;
        this.setState({ total_price : newPrice , ingredients : updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredients = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0)
        {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients ={
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.total_price;
        const newPrice = oldPrice - priceDeduction ;
        this.setState({ total_price : newPrice , ingredients : updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler = () => {
        this.setState( { purchasing : true} )
    }
    purchaseCancelHandler = () =>{
        this.setState( { purchasing : false} )
    }
    purchaseContinueHandler = () => {
        alert("You can continue");
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for( let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.total_price}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded = {this.addedIngredients}
                ingredientRemoved = {this.removeIngredients}
                price = {this.state.total_price}
                disabled={disabledInfo}    
                purchaseable={this.state.purchaseable}
                ordered={this.purchaseHandler}
                /> 
            </Aux>
        );
    }
}

export default BurgerBuilder;