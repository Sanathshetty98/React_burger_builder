import React,{ Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandling/withErrorHandling';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat:1.3,
    bacon:0.7
};
class BurgerBuilder extends Component{
    state = {
        ingredients: null,
        total_price:4,
        purchaseable:false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount(){
        axios.get('https://react-burger-builder-fb9a9.firebaseio.com/ingredients.json')
              .then( response => {
                  this.setState( { ingredients: response.data} );
              } )
              .catch(error => { this.setState( {error: true})});
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
        /*
        alert("Your order has been placed!");
        if(onclick="ok")
    {
        document.location.reload(true);
    }
    */
    this.setState( {loading: true} );
    const order = {
        ingredients: this.state.ingredients,
        price: this.state.total_price,
        customer: {
            name: 'Sanath',
            address: {
                street: 'street 1',
                zipcode: '58842',
                country: 'India'
            },
            email: 'test@test.com'
        },
        deliveryMethod: 'fastest'
    }
    axios.post('/orders.json',order)
          .then(response => 
            this.setState( { loading: false, purchasing: false} ))
          .catch(error => 
            this.setState( { loading: false, purchasing: false} ));
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for( let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary=null; 
        let burger= this.state.error ? <p> Ingredients can't be loaded !!!! </p> : <Spinner />; 
        if(this.state.ingredients){
        burger = (
            <Aux>
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
        orderSummary = <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.total_price}
        purchaseCancel={this.purchaseCancelHandler}
        purchaseContinue={this.purchaseContinueHandler}/>;
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);