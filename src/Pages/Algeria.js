import { Card, CardContent, Typography ,Tabs, Tab, AppBar, Backdrop,CircularProgress } from '@material-ui/core';
import React, {useEffect, useState}  from 'react';
import '../App.css';
import '../App'
import './Algeria.css'
import MapAlgeria from '../MapAlgeria'
import InfoBox from '../InfoBox'
import LineGraphAlg from '../LineGraphAlg';
import RechartAlg from '../RechartAlg';
import TableAlgeria from '../TableAlgeria';
import TableAl from '../TableAl';
import { prettyPrintStat, sortData } from '../utilAlgeria';
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
import Home from '../App';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Alg = () => {
  return (
    <div>
       <Router>
    <Switch>
    <Route path="/algeria" exact component={Algeria}/>
    <Route path="/" component={Home}/>

</Switch>
</Router> 

       
    </div>
  )
}

export default Alg

function Algeria() {

  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
 
  const [mapCountries, setMapCountries] = useState([]);
  const [casesTape, setCasesType] = useState("cases");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [value, setValue] = useState(0)
  const mapCenter = {lat: 33.8000, lng: 2.8651};
  const mapZoom = 6;
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
     
     },
     
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


    //create a function de the tab
    const handleTabs=(e, val)=>{
      setValue(val)
    }


    
    useEffect(()=>{
      fetch("https://disease.sh/v3/covid-19/countries/dz")
      .then(response=> response.json())
      .then(data=>{
       
        setCountryInfo(data);
        

      })
    },[])
   
    useEffect(()=>{
      const getCountriesData = async () =>{
       await fetch ("https://www.trackcorona.live/api/cities")
       .then((response)=> response.json())
       .then((data)=>{
         const cou = data.data.map((country)=>(
           {
          
             name: country.location,
             value:country.country_code,
             cases: country.confirmed,
             recovered: country.confirmed - country.recovered,
             deaths: country.recovered,
             lat:country.latitude,
             long:country.longitude
            }))
            
            const countries = cou.filter(country=>{
              const regex =  new RegExp("dz") 
              return country.value.match(regex)
                    
            })
           
           const sortedData = sortData(countries);
           setTableData(sortedData);
           setMapCountries(countries);
           setCountries(countries);
           setLoading(true);
       })
      }
      getCountriesData();
     
    }, [])
  
  
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

      <Link to='/'>
       <Button className="button__tlf__1" variant="contained" color="secondary">
        العالم
     </Button>
       </Link>
      
     <Button className="button_tlf__2" href="https://karim-portfolio.netlify.app/" variant="contained" color="secondary"  >
      تطوير
      </Button>
      </div>
         <div className="app__stats">
         
           <InfoBox 
           isRed
           active={casesTape==="cases"}
           onClick={e => setCasesType('cases')}
           title="الحالات المصابة" logo= {(<FaHeartbeat size="65px" color="#cc1034" />)} cases={prettyPrintStat(countryInfo.todayCases)} total={numeral(countryInfo.cases).format("0,0")} />
            
          
           <InfoBox 
           active={casesTape==="recovered"}
           onClick={e => setCasesType('recovered')}
           title="حالات شفاء" logo= {(<GiHealing size="65px" color="lightgreen" />)} cases={prettyPrintStat(countryInfo.todayRecovered)}  total={numeral(countryInfo.recovered).format("0,0")} />  
           <InfoBox 
           isRed
           active={casesTape==="deaths"}
           onClick={e => setCasesType('deaths')}
           title="حالات الوفاة" logo= {(<GiPirateGrave size="65px" color="red" />)} cases={prettyPrintStat(countryInfo.todayDeaths)} total={numeral(countryInfo.deaths).format("0,0")} />  
          </div>

          
          {loading ?  ""  : 
           <Backdrop className={classes.backdrop} open>
           <CircularProgress color="inherit" />
         </Backdrop>
          }

          <AppBar className="tab" position="static" > 
            <Tabs value={value} onChange={handleTabs}>
              <Tab className="tab_text" label=" خريطة "/>
              <Tab className="tab_text" label=" جدول "/>
              <Tab className="tab_text" label="رسم بياني "/>
              <Tab className="tab_text" label="تعليمات "/>
            </Tabs>
          </AppBar>
         {value === 0  && 
          <MapAlgeria className="app__map" casesType={casesTape} countries={mapCountries} center={mapCenter} zoom={mapZoom }
          />
         }

         { value === 1 && 
         <Card className="card__table">
           <CardContent>
           <TableAl  countries = {tableData} />
           </CardContent>
         </Card>
          

         }
         { value === 2 &&
           <Card className="card__table">
           <CardContent>
           <RechartAlg countries={countries} />  
           </CardContent>
         </Card>
         
          

         }
         
         {value === 3 && 
         <Card className="intruction"> 
         <CardContent>
           <Typography className="title__typo" variant="h4" >  الأسئلة الشائعة</Typography>
         <Accordion>
           <AccordionSummary className="panelSummary"
           expandIcon={<ExpandMoreIcon />}
           aria-controls='panel1a-content'id='panel1a-header'
           >
           <Typography className="subtitle__typo" variant="h6">  COVID-19 ما هو فيروس (كورونا)</Typography> 
          
           </AccordionSummary>
           <AccordionDetails>
            <Typography>
            فيروس (كورونا) من فصيلة فيروسات (كورونا) الجديد؛ حيث ظهرت أغلب حالات الإصابة به في مدينة ووهان الصينية نهاية ديسمبر 2019 على صورة التهاب رئوي حاد.
              </Typography>   
           </AccordionDetails>
         </Accordion>

         <Accordion>
           <AccordionSummary className="panelSummary"
           expandIcon={<ExpandMoreIcon />}
           aria-controls='panel1a-content'id='panel1a-header'
           >
           <Typography className="subtitle__typo" variant="h6"> ؟ COVID-19 ما هي فترة الحضانة لمرض</Typography> 
          
           </AccordionSummary>
           <AccordionDetails>
            <Typography>
            تتراوح فترة حضانة الفيروس التاجي COVID-19 من 3 إلى 5 أيام بشكل عام، ويمكن أن تصل إلى 14 يومًا. خلال هذه الفترة، يمكن أن يكون الشخص معديًا، أي يمكنه حمل الفيروس قبل ظهور الأعراض أو أي علامات ضعيفة (منظمة الصحة العالمية).
              </Typography>   
           </AccordionDetails>
         </Accordion>

         <Accordion>
           <AccordionSummary className="panelSummary"
           expandIcon={<ExpandMoreIcon />}
           aria-controls='panel1a-content'id='panel1a-header'
           >
           <Typography className="subtitle__typo" variant="h6"> كيف تم تحديد نوع الفيروس؟</Typography> 
          
           </AccordionSummary>
           <AccordionDetails>
            <Typography>
            تم التعرف على الفيروس عن طريق التسلسل الجيني
       
              </Typography>   
           </AccordionDetails>
         </Accordion>

         <Accordion>
           <AccordionSummary className="panelSummary"
           expandIcon={<ExpandMoreIcon />}
           aria-controls='panel1a-content'id='panel1a-header'
           >
           <Typography className="subtitle__typo" variant="h6">ما أصل هذا الفيروس؟ </Typography> 
          
           </AccordionSummary>
           <AccordionDetails>
            <Typography>
            يُعتقد أن فيروس (كورونا) الجديد مرتبط بالحيوان؛ حيث إن أغلب الحالات الأولية كان لها ارتباط بسوق للبحريات والحيوانات في مدينة ووهان
              </Typography>   
           </AccordionDetails>
         </Accordion>

         <Accordion>
           <AccordionSummary className="panelSummary"
           expandIcon={<ExpandMoreIcon />}
           aria-controls='panel1a-content'id='panel1a-header'
           >
           <Typography className="subtitle__typo" variant="h6"> هل ينتقل الفيروس بين البشر؟</Typography> 
          
           </AccordionSummary>
           <AccordionDetails>
            <Typography>
            نعم، ينتقل الفيروس بين البشر من الشخص المصاب بالعدوى إلى شخص آخر عن طريق المخالطة القريبة دون حماية
              </Typography>   
           </AccordionDetails>
         </Accordion>

         <Accordion>
           <AccordionSummary className="panelSummary"
           expandIcon={<ExpandMoreIcon />}
           aria-controls='panel1a-content'id='panel1a-header'
           >
           <Typography className="subtitle__typo" variant="h6">  هل ينتقل فيروس (كورونا) COVID-19 عبر الشحنات القادمة من الصين؟</Typography> 
          
           </AccordionSummary>
           <AccordionDetails>
            <Typography>
          
           بناءً على المعلومات المتوافرة حاليًا، لا يوجد خطر في البضائع المستوردة من الصين
              </Typography>   
           </AccordionDetails>
         </Accordion>

         <Accordion>
           <AccordionSummary className="panelSummary"
           expandIcon={<ExpandMoreIcon />}
           aria-controls='panel1a-content'id='panel1a-header'
           >
           <Typography className="subtitle__typo" variant="h6"> ؟ COVID-19 ما أعراض الإصابة بفيروس (كورونا) </Typography> 
          
           </AccordionSummary>
           <AccordionDetails>
            <Typography>
            تشمل الأعراض النمطية لفيروس (كورونا): الحمى - السعال - ضيق التنفس - وأحيانًا تتطور الإصابة إلى التهاب رئوي. وقد يتسبب في مضاعفات حادة لدى الأشخاص ذوي الجهاز المناعي الضعيف، والمسنين والأشخاص المصابين بأمراض مزمنة مثل: السرطان، والسكري، وأمراض الرئة المزمنة. وعند الشعور بأي من الأعراض السابقة يجب الاتصال بمركز (3030)
              </Typography>   
           </AccordionDetails>
         </Accordion>

        

         </CardContent>
       </Card>
       }
        </div>

      <Card className="app__right">
          <CardContent>
            <h3>إجمالي الحالات المصابة حسب الولاية</h3>
            <TableAlgeria  countries = {tableData} />
            <h3 className="app__graph__title">algeria new {casesTape} </h3>
            <LineGraphAlg className="app__graph" casesType = {casesTape} />
          </CardContent>
        </Card>
        

         
        
         </div> 
         
        <p className={classes.footer} >Copyright 2020, Creater by <span className="karim">HAMIMECHE.karim </span> 
         All rights reserved</p>
         </div>
       
     </ThemeProvider>
     
  );
}

