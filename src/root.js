import React from 'react';
import { Box, Button, withStyles } from '@material-ui/core';
import Header from './components/header.js';
import ColumnList from './components/columnlist.js';
import { EditStudentDialog, ViewIssuesDialog } from './components/dialogs.js';
import { iterate, determineIssues } from './tools/algorithm.js';
import { parseCSVSpreadsheet, generateRandomList } from './tools/parser.js';

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
      /* either view, working or editing */
      state: 'view',
      // if positive, modal is open with that index student's config
      editingStudent: -1,
      issues: [],
      viMod: false, // view issues modal open
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
          const lists = generateRandomList(
            parsed.studentNames, parsed.numClasses
          );
          const issues = determineIssues(lists, parsed.students);
          this.setState({ ...parsed, lists, issues });
        })
      }).catch(console.log);
  }
  toggleState (newState) {
    if (newState === "working" && this.state.state !== "working")
      this.startWorking();
    else this.stopWorking();

    if (this.state.state !== newState)
      this.setState({ state: newState });
    else
      this.setState({ state: 'import' });
  }
  startWorking () {
    this.worker();
    this.intev = setInterval(this.worker.bind(this), 500);
  }
  worker () {
    const { lists, issues } = iterate(
      this.state.lists, this.state.students, this.state.classSize);
    this.setState({ lists, issues });
  }
  stopWorking () {
    clearInterval(this.intev);
  }
  editStudent (student_idx) {
    // open modal to edit student information
    this.setState({editingStudent: student_idx});
  }
  render () {
    const { classes } = this.props;
    const classIdx = this.state.lists.map(list => list.indexOf(this.state.editingStudent) !== -1).indexOf(true);
    return (
      <Box className={classes.root}>
        {this.state.teacherNames.length ? (
          <ColumnList
            teachers={this.state.teacherNames}
            students={this.state.students}
            categories={this.state.categories}
            lists={this.state.lists}
            state={this.state.state}
            editStudent={this.editStudent.bind(this)}
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
          restart={() => this.setState({ lists: generateRandomList(
            this.state.studentNames, this.state.numClasses
          )})}
          state={this.state.state}
          showOptions={this.state.teacherNames.length > 0}
          issues={this.state.issues}
          viewIssues={() => this.setState({ viMod: !this.state.viMod })}
        />
        {this.state.editingStudent < 0 ? null : (
          <EditStudentDialog student_idx={this.state.editingStudent}
            teachers={this.state.teacherNames}
            students={this.state.students}
            categories={this.state.categories}
            updateStudent={student => {
              const students = this.state.students;
              students[this.state.editingStudent] = student;
              this.setState({ students, editingStudent: -1,
                issues: determineIssues(this.state.lists, students) });
            }}
            classIdx={classIdx}
            updateStudentClassIdx={newClassIdx => {
              this.state.lists[classIdx].splice(this.state.lists[classIdx].indexOf(this.state.editingStudent), 1);
              this.state.lists[newClassIdx].push(this.state.editingStudent);
              this.setState({ lists: this.state.lists });
            }}
          />
        )}
        {!this.state.viMod ? null : (
          <ViewIssuesDialog issues={this.state.issues}
            close={() => this.setState({ viMod: !this.state.viMod })} />
        )}
      </Box>
    );
  }
}

export default withStyles(styles)(App);
