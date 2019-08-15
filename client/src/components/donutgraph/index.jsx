import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Doughnutgraph = (props)=>{
   
   const  options = {
         title:{
             display:true,
             text:'Tution fee paid'
         }
     }
        return ( 
        <div >
            <Doughnut 
            options={options}
            data={props.data}
            height={300}
            />
        </div> );
    
}
 
export default Doughnutgraph;