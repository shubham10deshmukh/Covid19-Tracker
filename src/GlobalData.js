import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';





class GlobalData extends React.Component {
    
    constructor(props)  {
        super(props);
        this.state = {
            isLoaded : false,
            error : null,
            result: '',
            Globaldata : {},
            Countrydata : {}
           
        } 
        
    } 
    

        fetchGlobalData = ()  =>{
        var url = "https://api.covid19api.com/summary";
        fetch(url, {
        "method": "GET",
       
        })
        .then(res => res.json())
        .then(
        (result) => {
            this.setState({
            isLoaded: true,
            DataCheck : result,
            Globaldata: result.Global,
            Countrydata : result.Countries
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
        
        rowGetter(i) {
           // const worldRow = Object.assign({"Country" : "World" } , this.state.Globaldata);
        
           // let row = [ worldRow].concat( [].concat( this.state.Countrydata).sort((a, b) => a.TotalConfirmed < b.TotalConfirmed ? 1:-1));
            
        // const a = {'TotalActive' : parseInt(this.state.Countrydata[].TotalConfirmed) - parseInt(this.state.Countrydata[].TotalDeaths)};
          const defaultColumnProperties = {
             TotalActive : this.state.Countrydata[i].TotalConfirmed -  this.state.Countrydata[i].TotalDeaths 
          };
         
            
            //let row = [ worldRow].concat( [].concat( this.state.Countrydata).sort((a, b) => a.TotalConfirmed < b.TotalConfirmed ? 1:-1)).map(c => ({ ...c, ...defaultColumnProperties }));
            
           
          }
        render(){  
            
            
            const defaultColumnProperties = {
                resizable: true,
                width: 'auto'
              };
            
             
             const columns = [
                {
                    key: 'Country',
                    name: 'Country/Region'
                },             
                {
                    key: 'TotalConfirmed',
                    name: 'Total Confirmed',     
                },
                {
                key: 'TotalDeaths',
                name: 'Total Deaths'
                }, 
                {
                    key: 'TotalRecovered',
                    name: 'TotalRecovered'
                },  
                {
                    key: 'NewConfirmed',
                    name: 'Confirmed Today'
                },
                {
                    key: 'NewRecovered',
                    name: 'Recovered Today'
                },  
            ].map(c => ({ ...c, ...defaultColumnProperties }));
            
               const worldRow = Object.assign({Country : "World" } , this.state.Globaldata);
        //    //const countryDataSorted = Object.assign({TotalActive : (parseInt(this.state.Countrydata.TotalConfirmed) - parseInt(this.state.Countrydata.TotalDeaths) ) } , this.state.Countrydata);
             const rows = [ worldRow].concat( [].concat( this.state.Countrydata).sort((a, b) => a.TotalConfirmed < b.TotalConfirmed ? 1:-1))
             
         
           const i = 'You have reached maximum request limit.'; 
            return(
                
                this.state.isLoaded && this.state.DataCheck!='You have reached maximum request limit.'?   ( 
                    <DataGrid
                    enableCellAutoFocus={false}
                    columns={columns}    
                   rows={rows}      
                    
                  />
            ) : <p>Please Wait....</p> 
           
            );
                    

        }
        
     }
export default GlobalData;
