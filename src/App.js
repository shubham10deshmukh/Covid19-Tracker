import React from 'react';
import logo from './logo.svg';
import './App.css';
import FetchURL from './FetchURL';
import GlobalData from './GlobalData';
import IndiaData from './IndiaData'
import 'bootstrap/dist/css/bootstrap.min.css'
import IndiaGraph from './IndiaGraph';




function App() {

    const appTitle= "COVID-19 Tracker";
    var responsive ={
        height : "8%",
        width : '8%'
  }
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
    <div className="App">
      
      <header className="App-header">
      

      <div id="App-Title">{appTitle} </div> 
        <img style={responsive} src={logo} className="App-logo" alt="logo" />
       
        
        <a
          className="App-link"
          href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit WHO Guidelines for COVID-19
        </a>
       
      </header>
      
      <FetchURL />
      <IndiaGraph/>
      <IndiaData/>
      <h4> Global Stastics for COVID-19 </h4>
      <GlobalData/>
      <footer className="App-footer">
 <p> Developed by Shubham Deshmukh | {logoInstagram()} | {logoFacebook()} | {logoLinkedin()} </p>
        </footer>
    </div>
  );
}


export default App;
