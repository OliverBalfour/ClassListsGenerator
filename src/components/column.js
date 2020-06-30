import React from 'react';
import {
  Paper, makeStyles,
  Table, TableBody, TableCell, TableHead, TableContainer, TableRow
} from '@material-ui/core';

export default function Column (props) {
  const classes = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      marginTop: '58px', marginRight: theme.spacing(1),
      fontFamily: 'sans-serif',
      width: '260px'
    },
    listName: {
      fontSize: '20px',
      display: 'block',
      marginBottom: '10px'
    },
    className: {
      margin: 0,
      fontFamily: 'sans-serif',
      fontSize: '20px'
    }
  }))();

  return (
<TableContainer component={Paper} className={classes.paper}>
  <Table size='small'>
    <TableHead>
      <TableRow><TableCell>
        <h1 className={classes.className}>{props.name}</h1>
      </TableCell></TableRow>
    </TableHead>
    <TableBody>
      {props.list.map(idx => props.students[idx].name).map((name, idx) => (
        <TableRow key={idx}><TableCell>{name}</TableCell></TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
  );
}
