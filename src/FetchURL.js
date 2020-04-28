import React from 'react';
import DonutChart from './DonutChart';
import button, { Button, Card } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;




 class FetchURL extends React.Component
{

constructor(props)  {
super(props);
this.state = {
    error : null,
    isLoaded : false,
    items: [] ,
    selectedState : null,
    selectedStateData : {},
    dropdownStates : []
   }}

 componentDidMount( ) {

      this.fetchData('https://api.covid19india.org/data.json');
      
  }
   fetchData = async (url) =>  {

     //'https://covid19india.p.rapidapi.com/getStateData/MH'
 await fetch(url, {
    "method": "GET",
    })
  .then(res => res.json())
  .then(
    (result) => {
      this.setState({
        isLoaded: true,
        items: result.statewise,
        selectedStateData : result.statewise[0],
        
      });
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }
  )
  }
  

  StateChartParameter() {
   if(this.state.selectedStateData)
   var segment = 0;
   {   segment=[
      {
          color: '#ff9e62',
          name : 'Active',
          value: parseInt(this.state.selectedStateData.active)
      },
      {
          color: '#f71100',
          name : 'Death',
          value: parseInt(this.state.selectedStateData.deaths)
      },
      {
          color: '#fbff08',
          name : 'Recovered',
          value: parseInt(this.state.selectedStateData.recovered)
      }
  ]
}
return segment;
 
 }
      DropdownListVal(){
        if(this.state.items != [])
        { 
          return  this.optionsData();
        }
        else
          
        return [  { value: 'MH', label: 'Maharashtra' },];
        //   { value: 'UP', label: 'Uttar Pradesh' },
          /*{
          type: 'group', name: 'group1', items: [
            { value: 'three', label: 'Three' },
            { value: 'four', label: 'Four' }
          ]
          },*/ // Commented Just in case I need groups
        
        //];
      

      } 
      _onSelect(e){
       
        const chartItems = this.state.items.map((d) =>  {
        if(this.state.items)
        { 
           if(d.statecode == e.value )
            {
              
              this.setState({
                selectedStateData : d ,
                selectedState : d.state
              });
            }
        }
         });
      };
      optionsData(){
          const chartItems = this.state.items.map((d) =>  {
            let chartdata = {value : d.statecode  , label:  d.state  }
            return chartdata; });
          return (chartItems);

      }
      calculatePercenatge(numerator, denominator)
      {
        var result= 0;
        
        if(parseInt(denominator) == 0 || parseInt(numerator) == 0)
        {
            result = 0;
            return result;
        }  
        
        if(parseInt(denominator) > 0 && parseInt(denominator) >= parseInt(numerator)) 
        {
          result = (numerator/denominator) * 100;
          return result;
        }
         return 0;
      }

   render() {
    var confirmed = this.state.selectedStateData.confirmed;
    var deaths = this.state.selectedStateData.deaths;
    var active = this.state.selectedStateData.active;
    var recovered = this.state.selectedStateData.recovered;
    
    const options = {
			animationEnabled: true,
			title: {
				text: "Patients Condtion Ratio"
      },
			subtitles: [{
        text: this.state.selectedStateData.state,//"yValue % Positive",
				verticalAlign: "center",
				fontSize: 18,
        dockInsidePlotArea: true,
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
        yValueFormatString: "###'%'",
				dataPoints: [
          { color:"grey",name: "No Cases",visible : 'false', y:  confirmed == 0 ? 100 : 0},
          { color:"red",name: "Deaths", y:  deaths == 0 ? "0": parseInt(this.calculatePercenatge(deaths,confirmed))},
					{ color:"green",name: "Recovered", y: recovered == 0 ? 0:parseInt(this.calculatePercenatge(recovered,confirmed)) },
					{ color:"yellow",name: "Active", y: active == 0 ? 0: parseInt(this.calculatePercenatge(active,confirmed)) }
				]
      }]
		}
  // if (confirmed != 0 && options != {})
  // {var chart = new CanvasJS.chart(options) //CanvasJS.Chart(options);
  //   chart.options.data.forEach(element => {
  //     element.name == "No Cases" ? element.visible = false : element.visible = true ;
  //   });
  // }
 //----------------------------------------------------------  
      return (
         this.state.selectedStateData != {} ?
        <Container className="p-1">
         <h1 className="header">Track COVID-19 here</h1>
          {/* <Jumbotron> */}
          <Dropdown options={this.DropdownListVal()} onChange={this._onSelect.bind(this)} value={this.state.selectedState} placeholder="Select Indian State" />
          <div style={{width: "100%" }}>
                 {/* <DonutChart loaded={this.state.isLoaded} param={this.StateChartParameter()} />  */}
                 <CanvasJSChart options = {options}/>
              </div>
        <table>
            <tr>  
              <td>
              
              </td>
            
           <td>
          
          <Card
             bg="secondary"> 
                <Card.Header>{this.state.selectedStateData.statecode}</Card.Header>
            <Card.Body>
              <Card.Title> Total Cases </Card.Title>
              <Card.Text>
              {this.state.selectedStateData.confirmed}
              </Card.Text>
            </Card.Body>
          </Card>
          
          </td>
          <td>
          
          <Card
             bg="warning"> 
                <Card.Header>{this.state.selectedStateData.state}</Card.Header>
            <Card.Body>
              <Card.Title> Active Cases</Card.Title>
              <Card.Text>
              {this.state.selectedStateData.active}
              </Card.Text>
            </Card.Body>
          </Card>
          
          </td>
          <td>
          
          <Card
             bg="success"> 
                <Card.Header>{this.state.selectedStateData.state}</Card.Header>
            <Card.Body>
              <Card.Title> Recovered Cases </Card.Title>
              <Card.Text>
              {this.state.selectedStateData.recovered}
              </Card.Text>
            </Card.Body>
          </Card>
          
          </td>
          <td>
         
          <Card
             bg="danger"> 
                <Card.Header>{this.state.selectedStateData.state}</Card.Header>
            <Card.Body>
              <Card.Title> Deaths </Card.Title>
              <Card.Text>
              {this.state.selectedStateData.deaths}
              </Card.Text>
            </Card.Body>
          </Card>
          
          </td>
         
          </tr>
          </table>
          {/* </Jumbotron> */}
        </Container >
         : <p>Please wait While the data Loads...</p>
      
    );

}


}



export default FetchURL;