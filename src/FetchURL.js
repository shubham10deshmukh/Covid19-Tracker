import React from 'react';
import DonutChart from './DonutChart';
import button, { Button, Card } from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './App.css';
import Flexbox from 'flexbox-react';

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
  

 
      // DropdownListVal(){
      //   if(this.state.items != [])
      //   { 
      //     return  this.optionsData();
      //   }
      //   else
      //   return [  { value: 'MH', label: 'Maharashtra' },];
      // } 

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
        var chartItems =0;  
        chartItems = this.state.items.map((d) =>  {
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
        text: "",
        color: "darkslategrey",
        fontWeight: 750,
        fontSize :30
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
        indexLabelPlacement: "outside",
        yValueFormatString: "###'%'",
				dataPoints: [
          //{ color:"grey",name: "No Cases",visible : 'false', y:  confirmed == 0 ? 100 : 0},
          { color:"#a6a6a6",name: "Deaths", y:  deaths == 0 ? "0": parseInt(this.calculatePercenatge(deaths,confirmed))},
					{ color:"#00cc2c",name: "Recovered", y: recovered == 0 ? 0:parseInt(this.calculatePercenatge(recovered,confirmed)) },
					{ color:"#ff0000",name: "Active", y: active == 0 ? 0: parseInt(this.calculatePercenatge(active,confirmed)) }
				]
      }]
		}
    
 //----------------------------------------------------------   bg="secondary">   bg="warning" bg="success"bg="danger"
 
          var styleDDL =
          { 
          "position" : "relative",
          "width" : "100%",
          "bottom": "0",
          "left": "0",
          "border":"solid",
          "color": "rebeccapurple",
          "font-weight": "900",
          'margin-left':"0"
          
        }
      return (
         this.state.selectedStateData != {} ?
         <Container style={{border:"solid 1px", paddingTop: "1%", paddingBottom: "1%",marginTop: "1%", width:'95%'}}>

        <div className="row" style={{ width:"inherit"}}>
             <div className="col-md-1" style={{    flex: "0 0 4.333333%" , maxWidth: "4.333333%"}}>
            </div> 
            
            <div className="col-md-3" >
              <div className="row" style={{justifyContent: 'left' , paddingLeft:"2%"}}>
                <p style={{ color: 'darkslategrey', fontWeight: 750, fontFamily: 'Exo 2', fontSize:'x-large'}}>Indian State</p>
              </div>
              <div className="row" style={{ width:"100%" , paddingLeft:"2%"}}>
            {this.optionsData() != 0 ?
            <Dropdown style={{styleDDL}} options={this.optionsData()} onChange={this._onSelect.bind(this)} value={this.state.selectedState} placeholder="All India"/>
            : "Loading.."}</div>
            </div>
            <div className="col-md-8" style={{marginBottom: '3%'}} >
            <CanvasJSChart options = {options} style={{position:"relative"}}/> 
            </div>
            
        </div>
       

            <div class="band">
                  
                  
                  <div class="item-1">
                        <a  class="card makeBlue">
                        <div class="thumb"></div>
                          <div className="cardHeader"> {this.state.selectedStateData.state} </div>
                          <article>
                            <h1><h3>{this.state.selectedStateData.confirmed} </h3>  </h1>
                            <span>Total Cases</span>
                          </article>
                        </a>
                  </div>
                    
                 
                  <div class="item-2">
                  <a  class="card makeRed">
                          <div class="thumb"></div>
                          <div className="cardHeader"> {this.state.selectedStateData.state} </div>
                          <article>
                            <h1><h3>{this.state.selectedStateData.active} </h3>  </h1>
                            <span>Active Cases</span>
                          </article>
                    </a>
                  </div>
                    
                 
                  <div class="item-3">
                  <a  class="card makeGreen">
                          <div class="thumb"></div>
                          <div className="cardHeader"> {this.state.selectedStateData.state} </div>
                          <article>
                            <h1><h3>{this.state.selectedStateData.recovered} </h3>  </h1>
                            <span>Recovered Cases</span>
                          </article>
                  </a>
                  </div>

                  <div class="item-3">
                  <a  class="card makeGrey">
                          <div class="thumb"></div>
                          <div className="cardHeader"> {this.state.selectedStateData.state} </div>
                          <article>
                            <h1><h3>{this.state.selectedStateData.deaths} </h3>  </h1>
                            <span>Deceased Cases</span>
                          </article>
                  </a>
                  </div>
                    
            </div>

       
       {/* This was the old CARD layout */}
        {/* <div className="styleCardsParent" >
          
          
        <Card className="styleCards makeBlue">
            
                <Card.Header>{this.state.selectedStateData.state}</Card.Header>
            <Card.Body>
              <Card.Title>{this.state.selectedStateData.confirmed}  </Card.Title>
              <Card.Text>
              Total Cases
              </Card.Text>
            </Card.Body>
          </Card>
          
        
          
          <Card className="styleCards makeRed"> 
                <Card.Header>{this.state.selectedStateData.state}</Card.Header>
            <Card.Body>
              <Card.Title> {this.state.selectedStateData.active} </Card.Title>
              <Card.Text>
              Active Cases 
              </Card.Text>
            </Card.Body>
          </Card>
          
          
          
          <Card className="styleCards makeGreen"> 
                <Card.Header>{this.state.selectedStateData.state}</Card.Header>
            <Card.Body>
              <Card.Title> {this.state.selectedStateData.recovered} </Card.Title>
              <Card.Text>
              Recovered Cases
              </Card.Text>
            </Card.Body>
          </Card>
          
          
         
          <Card className="styleCards makeGrey"> 
                <Card.Header>{this.state.selectedStateData.state}</Card.Header>
            <Card.Body>
              <Card.Title> {this.state.selectedStateData.deaths} </Card.Title>
              <Card.Text>
              Deaths
              </Card.Text>
            </Card.Body>
          </Card>
          
        </div > */}
        
        </Container> 
         : <p>Please wait While the data Loads...</p>
      
    );

}


}



export default FetchURL;