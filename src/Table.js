import React from 'react'
import './Table.css'
import numeral from "numeral"
import { Typography } from '@material-ui/core'
const Table = ({countries}) => {
    return (
        <div className="table">
            { countries.map(({country, cases, countryInfo})=>(
                <tr>
                    <div className="f1">
                     <td >  
                        <img className="table__flag" src={countryInfo.flag} alt="flag"/>
                         </td>
                    <td > 
                    <Typography color="textSecondary">{country}</Typography>
                         </td>
                         </div>
                         <vr></vr>
                     <td className="f2"> <strong>
                     <Typography color={"textSecondary"}> {numeral(cases).format("0,0")}</Typography>
                          </strong></td>
                </tr>

            ))}
        </div>
    )
}

export default Table
