import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Column from './column.js'

export default function ColumnList (props) {
  /**
   * props.teachers :: [name :: String]
   * props.students :: [{
     name :: String, categories :: [Bool], friends :: [student index]
     mustBeWith :: [student index], cannotBeWith :: [student index],
     possibleTeachers :: [index into teachers]
   }]
   * props.categories :: [String]
   * props.lists :: [[index into students]] where subarrays are teacher indexed
   */
  const classes = makeStyles(theme => ({
    body: {
      position: 'absolute',
      top: 0, left: 0,
      width: '100%', height: '100%',
      backgroundColor: '#EEE',
      margin: 0,
      display: 'flex'
    },
    columnContainer: {
      position: 'relative',
      width: '100%',
      top: 0, bottom: 0,
      padding: theme.spacing(2),
      overflowX: 'scroll',
      whiteSpace: 'nowrap'
    },
    columnBox: {
      position: 'relative',
      width: '360px',
      display: 'inline-block',
      margin: theme.spacing(1),
      marginTop: 0
    }
  }))();

  return (
<Box className={classes.body}>
  <Box className={classes.columnContainer}>
    {props.teachers.map((name, index) => (
      <Box className={classes.columnBox} key={index}>
        <Column name={name} list={props.lists[index]}
          students={props.students} categories={props.categories}
          state={props.state} editStudent={props.editStudent} />
      </Box>
    ))}
  </Box>
</Box>
  );
}
