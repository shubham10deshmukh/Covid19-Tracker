import React, { useState } from "react";
import CanvasJSReact from './canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


    




class IndiaGraph extends React.Component {

    
    constructor(props)  {
        super(props);
        this.state = {
            isLoaded : false,
            error : null,
            dailyData : [],
        }          
    } 
    

        fetchGlobalData = ()  =>{
        var url = "https://api.covid19india.org/data.json";
        fetch(url, {
        "method": "GET",
       
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
            isLoaded: true,
            dailyData: result.cases_time_series,
            
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

        componentDidMount( ) {

            this.fetchGlobalData();
        } 
        render(){  
           
               
    // Options for Chart for Number of Death Cases 
    const chartItemsDeath = this.state.dailyData.map((d) =>  {
        let dateValue = new Date(d.date.concat('2020'))
        let chartdata = {x : dateValue, y:  parseInt(d.totaldeceased)   }
        return chartdata; });

        const optionsDeathCases = {
                
            theme: "light2",
			animationEnabled: true,
			title:{
				text: "Death Cases in India"
			},
			axisX: {
                title: "Date",
                valueFormatString: "DD MMM",
               includeZero : true
			},
			axisY: {
                title: "Number of Cases",
                valueFormatString: "##",
				titleFontColor: "#6D78AD",
                lineColor: "#6D78AD",  
                gridThickness: 1,
                gridDashType: 'dot',
                labelFontColor: "#6D78AD",
				tickColor: "#6D78AD",
                includeZero: true,
                interval : 100
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
			},
                data: [{	
                          lineColor: "red",			
                          type: "stackedArea",
                          name: "Cases",
                          xValueFormatString: "DD MMM",
			              yValueFormatString: "#,##,###",
                          dataPoints: chartItemsDeath
                 }]
             }


// Options for Chart for Number of Positive Cases 
        const chartItems = this.state.dailyData.map((d) =>  {
        let dateValue = new Date(d.date.concat('2020'))
        let chartdata = {x : dateValue  ,y:  parseInt(d.totalconfirmed)   }
        return chartdata; });

        const optionsPositiveCases = {
                
            theme: "light2",
			animationEnabled: true,
			title:{
				text: "Positive Cases in India"
			},
			axisX: {
                title: "Date",
                valueFormatString: "DD MMM",
               
			},
			axisY: {
                title: "Number of Cases",
                valueFormatString: "##",
				titleFontColor: "#6D78AD",
                lineColor: "#6D78AD",   
                gridThickness: 1,
                gridDashType: 'dot',
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD",
                includeZero: true,
                interval : 5000
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
			},
                data: [{				
                          type: "column",
                          name: "Cases",
                          xValueFormatString: "DD MMM",
			                yValueFormatString: "#,##,###",
                          dataPoints: chartItems
                 }]
             }

       
            return(
                
                 this.state.dailyData?   ( 
                    <div style={{width: 'auto',height: 'auto'}}>
                        <div style={{margin: '3%',height: 'auto'}}>
                          <CanvasJSChart options = {optionsPositiveCases}/>
                          <CanvasJSChart options = {optionsDeathCases }/>
                        </div>

                    
                    </div>
            ) : <p>Please Wait....</p> 
           
            );
                    

        }
        
     }
export default IndiaGraph;
