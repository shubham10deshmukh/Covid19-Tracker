import React from 'react';
import { render } from 'react-dom';
import ComplexDonut from './react-svg-donuts/dist/complex';
import { Donut } from './react-svg-donuts/dist';
import 'react-svg-donuts/dist/complex.css';


class DonutChart extends React.Component
{
// Call this Class and Pass loaded and segments as props to fill and display the chart.
 render ()  {
    
   return (
      
<div id='doughnutMain'>

   {  this.props.loaded ? 
     <ComplexDonut size={200} radius={80} segments={this.props.param} thickness={40} startAngle={-90} />
      : ( <span>Loading...</span> )
    }
      
</div>
);


}

}
export default DonutChart;