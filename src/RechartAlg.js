import React  from 'react'
import { Bar } from "react-chartjs-2"
const RechartAlg = ({countries}) => {

  const Labels =  countries.map(country=>country.name)
  const dataVal = countries.map(country=>country.cases)
 const ChartData = {
   labels : Labels,
   datasets: [
     {
       label: "حالة",
       backgroundColor:"#cc1034",
       borderColor:"rgba(0,0,0,1)",
       borderWidth:1,
       data: dataVal,
     }
   ]
 }
    return (
        <div style={{height:"500px"}}>
          <Bar
       
          options={{
              maintainAspectRatio: false,
              title:{
                display:true,
                text: "رسم بياني دائري يمثل العدد الإجمالي للحالات المصابة بالولاية",
                fontSize:25,
                fontColor:"#e28989"
              
              },
              scales:{
                 yAxes:[{
                   ticks: {
                     beginAtZero:true,
                     fontSize: 15,
                     fontColor: '#e28989'
                   }
                 }],
                 xAxes: [{
                   ticks: {
                     fontSize: 16,
                     maxTicksLimit: 46 ,
                     fontColor:'#e28989'
                  
                   }
                 }]
              }
            }
        }
        data={ChartData}
          >

          </Bar>
 
        </div>
    )
}

export default RechartAlg
