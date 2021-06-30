import './InfoBox.css'
import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'


   

const InfoBox = ({title,logo ,cases,active,isRed ,total, ...props}) => {
    
    return (
       
           
        <Card 
        onClick={props.onClick}
       className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'} `}
       
       > 
            <CardContent className="tt">
                <div className="ff">
                <Typography className= 'infoBox__title' color="textSecondary">{title}</Typography>
                
                 <h2 className={`infoBox__cases ${!isRed && "infoBox__cases__green"}` }> {cases} </h2>
                <Typography className= 'infoBox__total' color="textSecondary"> {total}  Total</Typography>
                </div>
               <div className="infobox__logo"> {logo}</div>
                 
            </CardContent>
        </Card>
        
    )
}
export default InfoBox
