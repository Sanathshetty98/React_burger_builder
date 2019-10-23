import React, {Component} from 'react';
import PieChart from 'react-minimal-pie-chart';
import classes from './PieChart.module.css';
class PieCharts extends Component{
   state = {
       countc: 0,
       countf: 0
   }

    render(){
         var calculateDelivery = (type) =>{
            let countf=0,countc=0;
            console.log(this.props)
            this.props.order.map( order => {
                  if(order.orderData.deliveryMethod ==='Fastest')
                  {
                      countf = countf + 1;
                  }
                  else
                  {
                      countc = countc + 1;
                  }
              })
              console.log(countc, countf)
            if(type === 'fast'){
                return countf;
            }
            else if(type === 'cheap'){
                return countc;  
            }
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
       }

    //    const {countf, countc  } = this.state;
    //    console.log(countc, countf)
        var countf = calculateDelivery('fast');
        var countc  = calculateDelivery('cheap');
        let data = [
            { title: 'Fastest', value: countf, color: '#E38627'},
            { title: 'Cheapest', value: countc, color: '#C13C37'}
        ]
        return (
            <div>
                
                 <PieChart label = {true} className={classes.PieChart} 
                    data={data}
                    />
    
            </div>   
        )
    }
    
} 
    


export default PieCharts;