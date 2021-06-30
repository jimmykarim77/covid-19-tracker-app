import { Card, CardContent, FormControl, MenuItem, Select,Backdrop,CircularProgress } from '@material-ui/core';
import React, {useEffect, useState}  from 'react';
import './App.css';
import InfoBox from './InfoBox'
import LineGraph from './LineGraph';
import Map from './Map'
import Table from './Table';
import { prettyPrintStat, sortData } from './util';
import "leaflet/dist/leaflet.css";
import numeral from "numeral";
import IconButton from '@material-ui/core/IconButton';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Button from '@material-ui/core/Button';
import { createMuiTheme, makeStyles ,ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { GiPirateGrave, GiHealing } from "react-icons/gi";
import {FaHeartbeat} from "react-icons/fa";
import {BrowserRouter as Router, Route , Switch, Link} from 'react-router-dom' 
import Algeria from "./Pages/Algeria"

const Home = () => {
  return (
    <div>
       <Router>
    <Switch>
    <Route path="/" exact component={App}/>
<Route path="/algeria" component={Algeria}/>

</Switch>
</Router> 

       
    </div>
  )
}

export default Home



function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = 
  useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom]=useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesTape, setCasesType] = useState("cases");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading]= useState(false)

    //theme dark mode
    let theme = createMuiTheme({
      palette: {
      type: isDarkMode ? "dark" : "light",
      primary: {
        main: isDarkMode ? "#FFFFFF" : "#000000",
      },
      secondary:{
        main: isDarkMode ? "#FFFFFF" : "#333"
      },
      background: {
        default: isDarkMode ? grey[900] : "" ,
      },
     
     }
     });

    let useStyles = makeStyles(theme =>({
      body:{
        background: isDarkMode ? grey[900] : "", 
        color: theme.palette.getContrastText(isDarkMode ? grey[900] : "#ffffff"),
       
      },
      app__dropdown:{
       backgroundColor:  isDarkMode ? "#333" : "",
      },
      footer:{
        backgroundColor:  isDarkMode ? "#333" : " #e28989",
        padding:'20px',
        textAlign:'center'
      },
      backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#000',
      },
    
     
    }))

    let classes = useStyles();


  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=> response.json())
    .then(data=>{
      setCountryInfo(data);
    })
  },[])
 
  useEffect(()=>{
    const getCountriesData = async () =>{
     await fetch ("https://disease.sh/v3/covid-19/countries")
     .then((response)=> response.json())
     .then((data)=>{
       const countries = data.map((country)=>(
         {
           name: country.country,
           value:country.countryInfo.iso2
         }))

         const sortedData = sortData(data);
         setTableData(sortedData);
         setMapCountries(data);
         setCountries(countries);
         setLoading(true);
     })
    }
    getCountriesData();
   
  }, [])

  //contry change
  const onCountryChange = async (event) =>{
    const countryCode  = event.target.value;
    setCountry(countryCode);
    const url = countryCode === 'Worldwide' 
    ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    await fetch(url)
    .then(response=> response.json())
    .then(data=>{
      setCountry(countryCode)
      //all of the data from the country
      setCountryInfo(data);
     
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
    })
  }
  
  return (
   
   
    <ThemeProvider theme={theme}>
      <div className={classes.body}>
      <div className="App">
       
      <div className="app__left">
      <div className="app__header">
      
      <img src="/images/coronavirus.png" alt=""/> 
      <h1>COVID-19 TRACKER </h1>
     
      <div className="switch">
        <IconButton className="icon__b" checked={isDarkMode}
        onClick={()=> setIsDarkMode(mode=>!mode)}
        color="secondary" aria-label="Dark mode">
        <WbSunnyIcon color="primary" style={{ fontSize: 60 }} /> 
        </IconButton>
      
      </div>
     <FormControl className={classes.app__dropdown}>
         <Select variant="outlined"
         onChange={onCountryChange} value={country} >
         <MenuItem value="Worldwide"> Worldwide</MenuItem>
                {countries.map(country =>(
                 <MenuItem value={country.value}> {country.name}</MenuItem>
                 ))}
         </Select>
     </FormControl> 
       <Link to='/algeria'>
       <Button className="button__tlf__1" variant="contained" color="secondary">
       Algeria
     </Button>
       </Link>
      
     <Button className="button__tlf__2" href="https://karim-portfolio.netlify.app/" variant="contained" color="secondary"  >
       Creator
      </Button>
      
      </div>
         <div className="app__stats">
         
           <InfoBox 
           isRed
           active={casesTape==="cases"}
           onClick={e => setCasesType('cases')}
           title="Cases" logo= {(<FaHeartbeat size="65px" color="#cc1034" />)} cases={prettyPrintStat(countryInfo.todayCases)} total={numeral(countryInfo.cases).format("0,0")} />  
          
           <InfoBox 
           active={casesTape==="recovered"}
           onClick={e => setCasesType('recovered')}
           title="Recovered" logo= {(<GiHealing size="65px" color="lightgreen" />)} cases={prettyPrintStat(countryInfo.todayRecovered)}  total={numeral(countryInfo.recovered).format("0,0")} />  
           <InfoBox 
           isRed
           active={casesTape==="deaths"}
           onClick={e => setCasesType('deaths')}
           title="Deaths" logo= {(<GiPirateGrave size="65px" color="red" />)} cases={prettyPrintStat(countryInfo.todayDeaths)} total={numeral(countryInfo.deaths).format("0,0")} />  
          </div>
           
          {loading ?  ""  : 
           <Backdrop className={classes.backdrop} open>
           <CircularProgress color="inherit" />
         </Backdrop>
          }

         <Map className="app__map" casesType={casesTape} countries={mapCountries} center={mapCenter} zoom={mapZoom }
         />

         </div>

         <Card className="app__right">
           <CardContent>
             <h3>Lives Cases by Country</h3>
             <Table  countries = {tableData} />
                <h3 className="app__graph__title">Wordwide new {casesTape} </h3>
             <LineGraph className="app__graph" casesType = {casesTape} />
           </CardContent>
         </Card>
         
         </div> 
         
        <p className={classes.footer} >Copyright 2020, Creater by <span className="karim">H.karim </span> 
         All rights reserved</p>
         </div>
       
     </ThemeProvider>
     
  );
}


