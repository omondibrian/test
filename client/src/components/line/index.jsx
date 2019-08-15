
import React from 'react';
import {Line as Linegraph} from 'react-chartjs-2';



const options = {
title: {
    display: true,
    text: 'Lessons Atttendance'
  },
  fill:true,
  color: [
    'red',    // color for data at index 0
    'blue',   // color for data at index 1
    'green',  // color for data at index 2
    'black',  // color for data at index 3
    //...
]

}

const styles = {
  graphContainer: {
    border: '1px solid black',
    padding: '15px'
  }
}

const LineChart = (props) =>{

    return (
      <div style={styles.graphContainer}>
        <Linegraph data={props.data}
          options={options}
        
        width={600} height={250}/>
      </div>
    )
  }


export default LineChart;

/**options availabe for line charts
 * //   scaleShowGridLines: true,
//   scaleGridLineColor: 'rgba(255,0,255,0.75)',
//   scaleGridLineWidth: 1,
//   scaleShowHorizontalLines: true,
//   scaleShowVerticalLines: true,
//   bezierCurve: true,
//   bezierCurveTension: 0.4,
//   pointDot: true,
//   pointDotRadius: 4,
//   pointDotStrokeWidth: 1,
//   pointHitDetectionRadius: 20,
//   datasetStroke: true,
//   datasetStrokeWidth: 2,
//   datasetFill: true,
//   legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for
 (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
 */
/**additional properties for datasets
 * // strokeColor: 'rgba(255,0,255,0.75)',
        // pointColor: 'rgba(255,0,255,0.75)',
        // pointStrokeColor: 'rgba(255,0,255,0.75)',
        // pointHighlightFill: 'rgba(255,0,255,0.75)',
        // pointHighlightStroke: 'rgba(255,0,255,0.75)',
 */