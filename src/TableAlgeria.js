import React from 'react'
import './Table.css'
import numeral from "numeral"
import { Typography } from '@material-ui/core'
const TableAlgeria = ({countries}) => {
    return (
        <div className="table">
            { countries.map(({name, cases})=>(
                <tr>
                    <div className="f1">
                    
                    <td > 
                    <Typography color="textSecondary">{name}</Typography>
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

export default TableAlgeria
