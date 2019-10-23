import React,{Component} from 'react';
import Order from  '../../../components/Order/Order';
import axios from '../../../axios-orders';
import PieChart from './PieChart';
class Orders extends Component{
      state= {
            orders: [],
            loading: true
        }
   
     

     componentDidMount(){
         axios.get('/orders.json')   
               .then(res =>{
                     const fetch = [];
                     for(let key in res.data){
                         fetch.push({
                             ...res.data[key],
                             id: key
                         });
                     }
                     this.setState( {loading: false , orders: fetch} );
                 })
                .catch( error => {
                this.setState( {loading: false} )
                console.log(error);
               
               })
     }
     
    render(){
        console.log(this.state.orders);
        return(
            <div>
                {/* {this.state.orders.map( order => (
                    <Order 
                      key={order.id}   
                      ingredients={order.ingredients}
                      price={+order.price}/>
                ))} */}
                <PieChart  order={this.state.orders}/>
                
                
            </div>
        );
    }
}

export default Orders;