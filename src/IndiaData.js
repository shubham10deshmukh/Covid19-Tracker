import React, { useState } from "react";
import ReactDOM from "react-dom";
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';





class IndiaData extends React.Component {
    
    constructor(props)  {
        super(props);
        this.state = {
            isLoaded : false,
            error : null,
            StateWisedata : {}
           
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
            StateWisedata: result.statewise,
            
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
            
            const defaultColumnProperties = {
                resizable: true,
                width: 'auto'
              };
            
             const columns = [
                {
                    key: 'state',
                    name: 'State/UT'
                },             
                {
                    key: 'confirmed',
                    name: 'Total Confirmed',
                   
                },
                {
                    key: 'active',
                    name: 'Total Active',
                   
                },
               {
                key: 'deaths',
                name: 'Total Deaths'
                }, 
                {
                    key: 'recovered',
                    name: 'Total Recovered'
                },  
                {
                    key: 'deltaconfirmed',
                    name: 'Confirmed Today'
                },
                {
                    key: 'deltadeaths',
                    name: 'Deaths Today'
                }, 
                {
                    key: 'deltarecovered',
                    name: 'Recovered Today'
                },  
            ].map(c => ({ ...c, ...defaultColumnProperties }));;
            
             const rows = this.state.StateWisedata;
       
            return(
                
                 this.state.StateWisedata?   ( 
                    <DataGrid columns={columns} rows={rows} enableCellAutoFocus={false}/>
            ) : <p>Please Wait....</p> 
           
            );
                    

        }
        
     }
export default IndiaData;
