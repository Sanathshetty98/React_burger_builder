import React, {Component} from 'react';
import PieChart from 'react-minimal-pie-chart';
import classes from './PieChart.module.css';
class PieCharts extends Component{
   state = {
       countc: 0,
       countf: 0
   }

    render(){
         var calculateDelivery = () =>{
            //console.log(this.props)
            var data = this.props.order.map( order => {
                //   if(order.orderData.deliveryMethod ==='Fastest')
                //   {
                //       countf = countf + 1;
                //   }
                //   else
                //   {
                //       countc = countc + 1;
                //   }
                var data;
                if(order.orderData.deliveryMethod === 'Fastest'){
                    data = {title: order.orderData.deliveryMethod, value: 1, color: '#E38627'}
                }
                else{
                    data = {title: order.orderData.deliveryMethod, value: 1, color: '#0000cc'}
                }
                return data;
              })
            //   console.log(countc, countf)
            // if(type === 'fast'){
            //     return countf;
            // }[
            
              
            // else if(type === 'cheap'){
            //     return countc;  
            // }

            // var calcCountry = () => {
            //    this.props.order.map( order => {
            //             obj = {
            //                 name : order.orderData.country,
            //                 count : 1
            //             }
                        


            //     })
            // }
        // this.setState({countc : calculateDelivery('cheap')});
        // this.setState({countf : calculateDelivery('fast')});
        console.log(data);
        data.sort((a,b) => a.title.localeCompare(b.title));
        return data;
       }
       var calcCountry = () =>{
        var data = this.props.order.map( order => {
            var data;
            if(order.orderData.country === 'India'){
                data = {title: order.orderData.country, value: 1, color: '#E38627'}
            }
            else if(order.orderData.country === 'USA'){
                data = {title: order.orderData.country, value: 1, color: '#00cc00'}
            }
            else{
                data = {title: order.orderData.country, value: 1, color: '#0000cc'}
            }
            return data;
          })
          data.sort((a,b) => a.title.localeCompare(b.title));
          return data;
       }

    //    const {countf, countc  } = this.state;
    //    console.log(countc, countf)
        // var countf = calculateDelivery('fast');
        // var countc  = calculateDelivery('cheap');
        let data1 = calculateDelivery();
        let data2 = calcCountry();
        return (
            <div>
            <div className={classes.PieChart}>
                 <PieChart  
                    data={data1}
                    /> 
                 <p>Delivery Method Statistics</p>
            </div>   
            <div className={classes.PieChart}>
                 <PieChart   
                    data={data2}
                    />
                 <p>Country Orders Statistics</p>
            </div>
            </div>
        )
    }
    
} 
    


export default PieCharts;