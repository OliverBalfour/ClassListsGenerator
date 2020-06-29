import React from 'react';
import { Button, Paper, Box, withStyles } from '@material-ui/core';
import Header from './header.js'

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: "#EEE",
  },
  body: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: '#EEE',
    margin: 0,
    display: 'flex'
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: '58px', marginRight: theme.spacing(1),
    fontFamily: 'sans-serif'
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
    width: '20%',
    display: 'inline-block',
    margin: theme.spacing(1),
    marginTop: 0
  },
  listName: {
    fontSize: '20px',
    display: 'block',
    marginBottom: '10px'
  }
});

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      lists: [{name: '5/6B'}, {name: '5/6K'}, {name: '5/6C'}, {name: '5/6L'}, {name: '5/6J'}],
      state: 'view' /* either view, working or editing */
    };
  }
  toggleState (newState) {
    if (this.state.state !== newState)
      this.setState({ state: newState });
    else
      this.setState({ state: 'view' });
  }
  render () {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        <Box className={classes.body}>
          <Box className={classes.columnContainer}>
            {this.state.lists.map((list, index) => (
              <Box className={classes.columnBox} key={index}>
                <Paper className={classes.paper}>
                  <span className={classes.listName}>{list.name}</span>
                  <Button variant='contained' color='primary'>Test</Button>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>
        <Header
          import={() => {}}
          export={() => {}}
          openListManager={() => {}}
          toggleState={this.toggleState.bind(this)}
          save={() => {}}
          restart={() => {}}
          state={this.state.state}
        />
      </Box>
    );
  }
}

export default withStyles(styles)(App);
