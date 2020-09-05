import React from 'react';
import {
  Paper, makeStyles,
  Table, TableBody, TableCell, TableHead, TableContainer, TableRow,
  Chip
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

export default function Column (props) {
  const classes = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      marginTop: '58px', marginRight: theme.spacing(1),
      fontFamily: 'sans-serif',
      width: '320px'
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
    },
    pencil: {
      float: 'right',
      cursor: 'pointer'
    }
  }))();

  // Jagged array of category indices for each student
  const relevantCategories = props.list.map(student_idx =>
    props.students[student_idx].categories.map(
      // category is enabled, and not the first dummy category
      (cat, i) => cat && i !== 0 ? i : -1
      // filter out disabled categories
    ).filter(cat => cat >= 0)
  );

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
        <TableRow key={idx}>
          <TableCell>
            {name} &nbsp;&nbsp;
            {relevantCategories[idx].map(cat => (
              <span key={cat}>
                <Chip label={props.categories[cat]} size='small' />&nbsp;
              </span>
            ))}
            {props.state !== 'editing' ? null : (
              <CreateIcon fontSize='small' className={classes.pencil}
                onClick={() => props.editStudent(props.list[idx])} />
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
  );
}
