import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
class ChartComponent extends Component {
    constructor(props){
        super(props)
    }
    state = { 
        data:{
            labels:['android','node','web Development 1', ' Web Development 2','Wordpress'],
            backgroundColor: ['rgba(255,0,255,0.75)','rgba(0,255,0,0.75)','#ffffff','#4b94bf'],
            datasets:[
                {
                    label:'1st Years',
                    backgroundColor:'rgba(255,0,255,0.75)',
                    data:[11,13,24,35,36]
                },
                {
                    label:'2nd Years',
                     backgroundColor:'rgba(0,255,0,0.75)',
                    data:[11,23,34,25,16]
                },
                {
                    label:'3rd Years',
                    backgroundColor:'#ffffff',
                    data:[10,20,30,20,16]
                },
                {
                    label:'4th Years',
                    backgroundColor:'#4b94bf',
                    data:[9,3,4,5,6]
                }
            ]
        }
     }
     setGradientColors = ( canvas , color) =>{
         const ctx = canvas.getContext('2d');
         const gradient = ctx.createLinearGradient(0,0,600,550);
         gradient.addColorStop(0,color);
         gradient.addColorStop(0.95, 'rgba(133,122,144,0.5');
         return gradient;

     }
     getChartData = canvas =>{
         const data = this.props.data;
            if(data.datasets){
                let colors = ['rgba(255,0,255,0.75)','rgba(0,255,0,0.75)','#ffffff','#4b94bf'];
                data.datasets.forEach((set,i)=>{
                    set.backgroundColor = this.setGradientColors(canvas,colors[i]);
                    set.borderColor = 'white';
                    set.borderWidth = 2 ;
                })
            }
         return data;
     }
    render() { 
        return ( 
        <div>
           <Line data={this.getChartData} />

        </div> );
    }
}
 
export default ChartComponent;


