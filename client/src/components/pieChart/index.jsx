import React from 'react'
import { Pie } from 'react-chartjs-2';

function Piechart(props) {
   const options = {
        title: {
    display: true,
    text: 'module registration'
  }
    }
    return (
        <div>
            <Pie 
            data={props.piechartdata}
            options={options}
            height={300}
            />
        </div>
    )
}

export default Piechart
