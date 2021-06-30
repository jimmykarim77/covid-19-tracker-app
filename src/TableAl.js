import React from 'react'
import './Table.css'
import './TableAl.css'
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'

const useStyles = makeStyles({
    table: {
      minWidth: 300,
    },
  });

const TableAl = ({countries}) => {
    const classes = useStyles();
    return (
        <div>
           <TableContainer className="table__matriel">
               <Table  className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="willaya"> الولايات</TableCell>
                            <TableCell className="w__infected" align="right">الحالات المصابة</TableCell>
                            <TableCell className="w__recovered" align="right">حالات تعافي</TableCell>
                            <TableCell className="w__deaths" align="right">حالات الوفاة</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    { countries.map(({name, cases, recovered, deaths})=>(
                        <TableRow key={name} > 
                         <TableCell> {name} </TableCell>
                           <TableCell align="right"> {cases} </TableCell>
                           <TableCell align="right"> {recovered}  </TableCell>
                           <TableCell align="right"> {deaths} </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
               </Table>
           </TableContainer>
        </div>
       
    )
}

export default TableAl
