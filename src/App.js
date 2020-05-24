import React from 'react';
import logo from './logo.svg';
import './App.css';
import FetchURL from './FetchURL';
import GlobalData from './GlobalData';
import IndiaData from './IndiaData'
import 'bootstrap/dist/css/bootstrap.min.css'
import IndiaGraph from './IndiaGraph';
import { ScrollingProvider, SectionLink, Section } from 'react-scroll-section';




function App() {

    const appTitle= "Kill The COVID";
    var responsive ={
        height : "8%",
        width : '8%'
      }
      const logoBacteria = () =>{ 
        return(
         <img style={responsive} src={require('./images/icon-bacteria.png')}/>
        );}
    const logoInstagram = () =>{ 
    return(
    <a href="https://www.instagram.com/shubham10deshmukh" target="_blank"> <img style={responsive} src={require('./images/icons8-instagram.png')}/> </a>
    );}
    const logoFacebook = () =>{ 
      return(
      <a href="https://www.facebook.com/shubham10deshmukh" target="_blank"> <img style={responsive} src={require('./images/icons8-facebook.png')}/> </a>
      );}
      const logoLinkedin = () =>{ 
        return(
        <a href="https://www.linkedin.com/shubham10deshmukh" target="_blank"> <img style={responsive} src={require('./images/icons8-linkedin.png')}/> </a>
        );}

  return (
    <div className="App" >
      <ScrollingProvider>

     
     
      <header className="App-header" style={{display:'none'}}>
        <div className="row" style={{width:"100%"}}>
          <div className="col-md-3">
      <Section id={'Top'}>
        <div style={{overflow:"hidden"}} >
        {logoBacteria()}
          {appTitle} 
      </div>
      </Section>
      </div>
     
      <div className="col-md-6">
        <div className="row">
                <div className="col-md-2">
            <SectionLink section="StateData" >
              {({ onClick, isSelected }) => (
                <div onClick={onClick} selected={isSelected}>
                  State Data
                </div>
              )}
            </SectionLink>
            </div>
            {/* <div className="col-md-1"/> */}
            <div className="col-md-3">
            <SectionLink section="Graph" className="col-md-2">
              {({ onClick, isSelected }) => (
                <div onClick={onClick} selected={isSelected}>
                  Cases Visualy
                </div>
              )}
            </SectionLink>
            </div>
            {/* <div className="col-md-1"/> */}
            <div className="col-md-3">
            <SectionLink section="IndiaTable" className="col-md-2">
              {({ onClick, isSelected }) => (
                <div onClick={onClick} selected={isSelected}>
                  All States
                </div>
              )}
            </SectionLink>
            </div>
            {/* <div className="col-md-1"/> */}
            <div className="col-md-3">
            <SectionLink section="GlobalTable" className="col-md-2">
              {({ onClick, isSelected }) => (
                <a onClick={onClick} selected={isSelected}>
                  All Countries
                </a>
              )}
            </SectionLink>
            </div>
      </div>
    </div>
       
        
    <div className="linkContainer"> <a
                  style={{display:"table-cell"}}
                    className="App-link"
                    href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                    target="_blank"
                    rel="noopener noreferrer">
                    WHO Guidelines for COVID-19
                  </a>
                  </div>
    
    
          </div>
      </header>
     
                <div className="header" name="header1" id="header1">  
                   <div className="logoContainer">
                        <h1>KILL<span> The COVID</span> </h1>
                  </div>
                  <div className="linkContainer"> <a
                    className="App-link"
                    href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                    target="_blank"
                    rel="noopener noreferrer">
                    WHO Guidelines for COVID-19
                  </a>
                  </div>
                  <div className="innerHeader">
                     
                      <ul className="navigation">
                      
                        <a><li>
                              <SectionLink section="StateData" >
                              {({ onClick, isSelected }) => (
                                <div onClick={onClick} selected={isSelected} style={{fontFamily:'Exo 2'}}>
                                  STATES
                                </div>
                              )}
                            </SectionLink>
                        </li></a>
                        <a><li>
                            <SectionLink section="Graph" >
                              {({ onClick, isSelected }) => (
                                <div onClick={onClick} selected={isSelected} style={{fontFamily:'Exo 2'}}>
                                  TRENDS
                                </div>
                              )}
                            </SectionLink> 
                          </li></a>
                        <a><li>
                            <SectionLink section="IndiaTable" >
                            {({ onClick, isSelected }) => (
                              <div onClick={onClick} selected={isSelected} style={{fontFamily:'Exo 2'}}>
                                INDIA
                              </div>
                            )}
                          </SectionLink>  
                        </li></a>
                        <a><li>
                            <SectionLink section="GlobalTable" >
                              {({ onClick, isSelected }) => (
                                <div onClick={onClick} selected={isSelected} style={{fontFamily:'Exo 2'}}>
                                  GLOBAL
                                </div>
                              )}
                            </SectionLink>  
                        </li></a>
                      </ul>
                  </div>
                 
                </div>
                
     
      
      <Section id={'StateData'}>
          <FetchURL />
      </Section>
      <Section id={'Graph'}>
          <IndiaGraph/> 
      </Section>
      <Section id={'IndiaTable'}>
      <div style={{margin:"2%"}}><h4  className="titleClass"> COVID-19 CASES IN INDIA </h4></div>
           <IndiaData/> 
      </Section>
      <Section id={'GlobalTable'}>
          <div style={{margin:"2%"}}><h4  className="titleClass"> COVID-19 CASES IN THE WORLD </h4></div>
           <GlobalData/> 
      </Section>
      


      
      
      <footer className="App-footer">
      <SectionLink section="Top">
        {({ onClick, isSelected }) => (
          <a onClick={onClick} selected={isSelected} style={{color: "white" , "text-decoration": "underline" }}>
             Go to Top ↑ 
          </a>
        )}
      </SectionLink>
     
 <p> Developed by Shubham Deshmukh | {logoInstagram()} | {logoFacebook()} | {logoLinkedin()} </p>
        </footer>
        </ScrollingProvider>
    </div>
  );
}


export default App;
