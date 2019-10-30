import React, {Component} from 'react';
//import PieChart from 'react-minimal-pie-chart';
import classes from './PieChart.module.css';
import Chart from "chart.js";
import axios from '../../../axios-orders';
class PieCharts extends Component{
   state = {
       orders : [],
       data1 : [],
       data2 : []
   }
    sortFn = (prop, arr) => {
    prop = prop.split('.');
    var len = prop.length;
    
    arr.sort(function (a, b) {
        var i = 0;
        while( i < len ) {
            a = a[prop[i]];
            b = b[prop[i]];
            i++;
        }
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    });
    return arr;
}
 calculateDelivery = () =>{
        //console.log(this.props)
        var data = this.sortFn('orderData.deliveryMethod', this.state.orders), count=1, activeString='', totalOrders=[];
        data = data.map( (order, i) => {
        let curString = order.orderData.deliveryMethod;
        if(activeString !== curString) {
            if(i !== 0) {
                totalOrders.push({title: activeString, value: count})
            }
        count = 1;
            activeString = curString;
        } else {
            count ++;
        }
        if(i === data.length - 1) {
            totalOrders.push({title: activeString, value: count})
        }
        })
        console.log(totalOrders);
        this.setState({data1: totalOrders})
        return totalOrders;
    }
    calcCountry = () =>{
        var data = this.state.orders.map( order => {
            var data;
            data = {title: order.orderData.country, value: 1}
            return data;
          })
          data.sort((a,b) => a.title.localeCompare(b.title));
          console.log(data);
          return data;
       }
       //data1 = calculateDelivery();
        //console.log(data1);
        
        //console.log(this.state.data1);
        //data2 = calcCountry();
        //dataObject1 = eval(data1);
         //console.log(dataObject1);
         //var dataObject2 = eval("("+data2+")");
        //  if(dataObject1 === undefined){
        //     var result1 = dataObject1.reduce((res, obj) => {
        //         if (!(obj.title in res)){
        //              res.__array.push(res[obj.title] = obj);
        //           }
        //            else {
        //                res[obj.title].value += obj.value;
        //             }
        //              return res;
        //          })
        //  }
        //  console.log(result1);
    chartRef1 = React.createRef();
    chartRef2 = React.createRef();
     componentDidMount() {
            axios.get('/orders.json')   
            .then(res =>{
                const fetch = [];
                for(let key in res.data){
                    fetch.push({
                        ...res.data[key],
                        id: key
                    });
                }
              this.setState( {orders: fetch} );
              console.log(this.state.orders);
            })
            .catch( error => {
            this.setState( {loading: false} )
            console.log(error);
            })
        
        console.log(this.state.orders);
        let data1 = this.calculateDelivery();
        console.log(data1);
        const myChartRef1 = this.chartRef1.current.getContext("2d");
            if(this.state.data1 !== undefined){
                new Chart(myChartRef1, {
                    type: "pie",
                    data: {
                        //Bring in data
                        labels:this.state.data1.map((ele) => ele.title),
                        datasets: [
                            {
                               backgroundColor: [
                                  "#2ecc71",
                                  "#3498db",
                                  "#95a5a6",
                                  "#9b59b6",
                                  "#f1c40f",
                                  "#e74c3c",
                                  "#34495e"
                                ],
                                label: "Sales",
                                data: [86, 67, 91],
                            }
                        ]
                    },
                    options: {
                    legend: {
                      display: true
                      }
                    },
                    'onClick' : function(e){
                        var activePoints = myChartRef1.getElementsAtEvent(e);
                        var selectedIndex = activePoints[0]._index;
                        alert(this.data.datasets[0].data[selectedIndex]);
                    
                    
                    }
                });
           
            }

         const myChartRef2 = this.chartRef2.current.getContext("2d");
        
         new Chart(myChartRef2, {
             type: "pie",
             data: {
                 //Bring in data
                labels: ["Jan", "Feb", "March"],
                 datasets: [
                     {
                         backgroundColor: [
                           "#2ecc71",
                           "#3498db",
                           "#95a5a6",
                          "#9b59b6",
                           "#f1c40f",
                           "#e74c3c",
                           "#34495e"
                         ],
                         label: "Sales",
                        data: [86, 67, 91],
                     }
                 ]
             },
             options: {
             legend: {
               display: true
               }
             },
         });
     }
    render(){
        
                //   if(order.orderData.deliveryMethod ==='Fastest')
                //   {
                //       countf = countf + 1;
                //   }
                //   else
                //   {
                //       countc = countc + 1;
                //   }
                // var data;
                // data = {title: order.orderData.deliveryMethod, value: 1}
                // return data;
              
            // if(type === 'fast'){
            //     return countf;
            // }
            
              
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
        

    //    const {countf, countc  } = this.state;
    //    console.log(countc, countf)
        // var countf = calculateDelivery('fast');
        // var countc  = calculateDelivery('cheap');
        // debugger;
        

        //   var result2 = dataObject2.reduce(function(res, obj) {
        //       if (!(obj.title in res)){
        //           res.__array.push(res[obj.title] = obj);
        //      }
        //      else {
        //           res[obj.title].value += obj.value;
        //       }
        //      return res;
        //   })
        if(this.state.data1 !== null){
            return (
                <div>
                <div className={classes.PieChart}>
                     {/* <PieChart  
                        data={data1}
                        />  */}
                        <canvas
                            id="myChart"
                            ref={this.chartRef1}
                        />
                     <p>Delivery Method Statistics</p>
                </div>   
                <div className={classes.PieChart}>
                     {/* <PieChart   
                        data={data2}
                        /> */}
                        <canvas
                            id="myChart"
                            ref={this.chartRef2}
                            data1= {this.data1}
                        />
                     <p>Country Orders Statistics</p>
                </div>
                </div>
            );
        }
        else{
            return null;
        }
    }
    
}
   
export default PieCharts;