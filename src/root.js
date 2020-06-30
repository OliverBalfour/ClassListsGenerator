import React from 'react';
import { Box, Button, withStyles } from '@material-ui/core';
import Header from './components/header.js';
import ColumnList from './components/columnlist.js';
import { parseCSVSpreadsheet } from './parser.js';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: "#EEE",
  },
  fallback: {
    position: 'absolute',
    top: 0, left: 0,
    width: '100%', height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    fontSize: '30px'
  }
});

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      lists: [],
      state: 'view', /* either view, working or editing */
    };
  }
  import () {
    // Insert dummy values for now
    fetch('./ClassListsGenerator/dummy.csv')
      .then(response => {
        if (response.status !== 200) return console.error(response.status);
        response.text().then(data => {
          console.log(parseCSVSpreadsheet(data));
        })
      }).catch(console.log);

    const lists = require('./data/dummy.json');
    this.setState({ lists: lists });
  }
  toggleState (newState) {
    if (this.state.state !== newState)
      this.setState({ state: newState });
    else
      this.setState({ state: 'import' });
  }
  render () {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        {this.state.lists.length ? (
          <ColumnList
            lists={this.state.lists}
          />
        ) : (
          <Box className={classes.fallback}>
            Please &nbsp;
            <Button onClick={this.import.bind(this)}
              size='large' color='primary' variant='contained'>
              import
            </Button>
            &nbsp; a spreadsheet
          </Box>
        )}
        <Header
          import={this.import.bind(this)}
          export={() => {}}
          openListManager={() => {}}
          toggleState={this.toggleState.bind(this)}
          save={() => {}}
          restart={() => {}}
          state={this.state.state}
          showOptions={this.state.lists.length > 0}
        />
      </Box>
    );
  }
}

export default withStyles(styles)(App);
