import React from 'react';
import { Button, Paper, makeStyles } from '@material-ui/core';

export default function Column (props) {
  const classes = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      marginTop: '58px', marginRight: theme.spacing(1),
      fontFamily: 'sans-serif'
    },
    listName: {
      fontSize: '20px',
      display: 'block',
      marginBottom: '10px'
    }
  }))();

  return (
<Paper className={classes.paper}>
  <span className={classes.listName}>{props.list.name}</span>
  <Button variant='contained' color='primary'>Test</Button>
</Paper>
  );
}
