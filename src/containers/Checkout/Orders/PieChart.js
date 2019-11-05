import React, {Component} from 'react';
//import PieChart from 'react-minimal-pie-chart';
import classes from './PieChart.module.css';
import Chart from "chart.js";
import axios from '../../../axios-orders';
import Modal from '../../../components/UI/Modal/Modal2';
import ChartData from './chartData';
//import Spinner from '../../../components/UI/Spinner/Spinner';
class PieCharts extends Component{
   state = {
       orders : [],
       data1 : [],
       data2 : [],
       result : [],
       clicked : false,
       loading : true

   }
   purchaseCancelHandler = () =>{
        this.setState( { clicked : false} )
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
    orderData = () => {
        //code
    }
    calcCity = () =>{
        // var data = this.state.orders.map( order => {
        //     var data;
        //     data = {title: order.orderData.country, value: 1}
        //     return data;
        //   })
        //   data.sort((a,b) => a.title.localeCompare(b.title));
        //   console.log(data);
        //   return data;
        var data = this.sortFn('orderData.city', this.state.orders), count=1, activeString='', totalOrders=[];
        data = data.map( (order, i) => {
        let curString = order.orderData.city;
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
        this.setState({data2: totalOrders})
        return totalOrders;

       }
                                //data1 = calculateDelivery();
                                    //console.log(data1);
                                    
                                    //console.log(this.state.data1);
                                    //data2 = calcCity();
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
    orderData = (label) => {
        console.log(label);
    }
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

              let data1 = this.calculateDelivery();
              console.log(data1);
              this.setState({data1 : data1});
              console.log(this.state.data1);

              let data2 = this.calcCity();
              console.log(data2);
              this.setState({data2 : data2});
              console.log(this.state.data2);

              console.log(this.state.orders);
              if(this.state.data1 !== null){ 
                console.log(this.state.data1);

                this.setState({loading : false});
                let self = this;

                var chart1 = new Chart(myChartRef1, {
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
                                    "#e74c3c",
                                    "#9b59b6",
                                    "#f1c40f",
                                    "#34495e"
                                ],
                                label: this.state.data1.map((ele) => ele.title),//"Sales",
                                data: this.state.data1.map((ele) => ele.value),
                            }
                        ]
                    },
                    options: {
                    legend: {
                      display: true
                      },
                      title: {
                        display: true,
                        text: ' Order Statistics based on Delivery Method '
                       },
                    // 'onClick' : function (evt, item) {
                    // console.log ('legend onClick', evt);
                    // console.log('legd item', item);
                     onClick : function(e){
                     var activePoints = chart1.getElementsAtEvent(e);
                     //console.log(activePoints);
                     if(activePoints.length > 0){
                     var selectedIndex = activePoints[0]._index;
                     let label = this.data.datasets[0].data._chartjs.listeners[0]._config.label[selectedIndex];
                     console.log(label);
                     const result = self.state.orders.filter(word => word.orderData.deliveryMethod === label );
                     console.log(result);
                     self.setState({result: result, clicked: true});
                     console.log(self.state.result);
                     //this.orderData();
                     //this.setState({label: label});
                     //console.log(this.state.label);
                     }
                     
                      }
                      
                    }
                });
                }
                if(this.state.data2 !== null){ 
                    console.log(this.state.data2);
                    let self = this;
                    var chart2 = new Chart(myChartRef2, {
                        type: "pie",
                        data: {
                            //Bring in data
                            labels:this.state.data2.map((ele) => ele.title),
                            datasets: [
                                {
                                   backgroundColor: [
                                      "#2ecc71",
                                      "#3498db",
                                      "#95a5a6",
                                      "#f1c40f",
                                      "#e74c3c",
                                      "#34495e",
                                      "#9b59b6"
                                      
                                    ],
                                    label: this.state.data2.map((ele) => ele.title),//"Sales",
                                    data: this.state.data2.map((ele) => ele.value),
                                }
                            ]
                        },
                        options: {
                        legend: {
                          display: true
                          },
                          title: {
                            display: true,
                            text: ' City - Wise Order Statistics '
                            },
                          onClick : function(e){
                            var activePoints = chart2.getElementsAtEvent(e);
                            //console.log(activePoints);
                            if(activePoints.length > 0){
                                var selectedIndex = activePoints[0]._index;
                                let label = this.data.datasets[0].data._chartjs.listeners[0]._config.label[selectedIndex];
                                console.log(label);
                                const result = self.state.orders.filter(word => word.orderData.city === label );
                                console.log(result);
                                self.setState({result: result, clicked: true});
                                console.log(self.state.result);
                            }
                            
                           }
                           
                        
                      }
                    });
                }
            })
            .catch( error => {
            this.setState( {loading: false} )
            console.log(error);
            })

        const myChartRef1 = this.chartRef1.current.getContext("2d");
            
                     
           
         const myChartRef2 = this.chartRef2.current.getContext("2d");
         
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

            // var calcCity = () => {
            //    this.props.order.map( order => {
            //             obj = {
            //                 name : order.orderData.country,
            //                 count : 1
            //             }
            //     })
            // }
        // this.setState({countc : calculateDelivery('cheap')});
        // this.setState({countf : calculateDelivery('fast')});
        

        //  const {countf, countc  } = this.state;
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

        // let chart1 = <Spinner />;
        // let chart2 = <Spinner />;
        // if(!this.state.loading){
        //     chart1 = (
        //         <canvas
        //             id="myChart"
        //             ref={this.chartRef1}
        //         />
        //     );
        //     chart2 = (
        //         <canvas
        //             id="myChart"
        //             ref={this.chartRef2}
        //             data1= {this.data1}
        //         />
        //     );
        // }
        let result = null;
        if( this.state.result.length >0){
            result = <ChartData data={this.state.result} />;
        }

        if(this.state.data1 !== null){
            return (  
                <div>
                    <Modal show = {this.state.clicked}
                           modalClosed={this.purchaseCancelHandler}>
                        {result}
                    </Modal>
                <div className={classes.PieChart}>
                     {/* <PieChart  
                        data={data1}
                        />  */}
                        <canvas
                            id="myChart"
                            ref={this.chartRef1}
                        />
                     <p> Order Statistics based on Delivery Method </p>
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
                     <p>City - Wise Order Statistics</p>
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