import React from 'react';
import { Box, Button, withStyles } from '@material-ui/core';
import Header from './components/header.js';
import ColumnList from './components/columnlist.js';
import { parseCSVSpreadsheet, generateRandomInitialList } from './parser.js';

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
      teacherNames: [],
      lists: [],
      state: 'view', /* either view, working or editing */
    };
  }
  import () {
    // Insert dummy values for now
    fetch('./dummy.csv')
      .then(response => {
        if (response.status !== 200) return console.error(response.status);
        response.text().then(data => {
          // This adds numClasses, classSize, teacherNames, categories,
          //   students, studentNames and lists to the state
          const parsed = parseCSVSpreadsheet(data);
          const lists = generateRandomInitialList(
            parsed.studentNames, parsed.numClasses
          );
          this.setState({ ...parsed, lists });
        })
      }).catch(console.log);
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
        {this.state.teacherNames.length ? (
          <ColumnList
            teachers={this.state.teacherNames}
            students={this.state.students}
            categories={this.state.categories}
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
          restart={() => this.setState({ lists: generateRandomInitialList(
            this.state.studentNames, this.state.numClasses
          )})}
          state={this.state.state}
          showOptions={this.state.teacherNames.length > 0}
        />
      </Box>
    );
  }
}

export default withStyles(styles)(App);
