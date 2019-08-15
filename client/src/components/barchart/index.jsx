import React, { Component } from 'react';
import  {Bar } from 'react-chartjs-2';

class Barchart extends Component {
    state = { 
        data:{
            labels:['jan','feb','mar','apr','may','jun','jul'],
            datasets:[
                {
                    label:'Videos mades',
                   backgroundColor:['#f1c40f','rgba(255,0,255,0.75','#e67e22','#16a085','#2980b9'],
                    data:[65,59,80,81,56,55,40]
                }
            ]
        }
     }



    render() { 
        return (
    <div style={{position: 'relative' ,height:550}}>
           <Bar 
           options={{
               responsive:true
           }}
           data={this.state.data}
           />

        </div> 
          );
    }
}
 
export default Barchart;