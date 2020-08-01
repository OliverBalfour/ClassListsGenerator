import React from 'react';
import { Box, Button, withStyles } from '@material-ui/core';
import Header from './components/header.js';
import ColumnList from './components/columnlist.js';
import { EditStudentDialog, ViewIssuesDialog } from './components/dialogs.js';
import { determineIssues, generateRandomList } from './tools/algorithm.js';
import worker from 'workerize-loader!./worker'; // eslint-disable-line import/no-webpack-loader-syntax
import { parseCSVSpreadsheet, unparseCSVSpreadsheet } from './tools/parser.js';

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
    this.workerInst = worker();
    this.workerInst.addEventListener('message', message => {
      if (this.state.state === 'working') {
        this.setState(message.data);
        this.stopWorking();
      }
    });
    // after 20 iterations which change nothing, pause
    this.numUselessIterations = 0;
  }
  handleFileUpload (evt) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.readAsText(evt.target.files[0]);
    });
  }
  downloadFile (filename, data) {
    let blob = new Blob([data], {type: 'text/csv'}),
        elem = document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
  export (e) {
    const string = unparseCSVSpreadsheet(this.state);
    // finally we download
    this.downloadFile("class_lists.csv", string);
  }
  dummyFileImport () {
    return new Promise((resolve, reject) =>
      fetch('./dummy.csv')
        .then(response => {
          if (response.status !== 200) reject(response.status);
          else response.text().then(resolve);
        })
    );
  }
  import (promise) {
    promise.then(data => {
      // This adds numClasses, classSize, teacherNames, categories,
      //   students, studentNames and lists to the state
      const parsed = parseCSVSpreadsheet(data);
      this.setState({ ...parsed, issues: determineIssues(parsed) });
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
    this.workerInst.runAlgorithm(this.state);
  }
  stopWorking () {
    this.setState({ state: 'view' });
  }
  restart () {
    this.stopWorking();
    const { studentNames, numClasses } = this.state;
    const lists = generateRandomList(studentNames, numClasses);
    const issues = determineIssues({...this.state, lists});
    this.setState({ lists, issues, state: "view" });
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
            <Button component="label"
              size='large' color='primary' variant='contained'>
              import
              <input type="file" style={{ display: "none" }}
                onChange={e => this.import(this.handleFileUpload(e))}/>
            </Button>
            &nbsp; a spreadsheet&nbsp;
            <span style={{fontSize: "1rem"}}>
              (or&nbsp;
              <span onClick={()=>this.import(this.dummyFileImport())}
                style={{color:"blue",textDecoration:"underline",cursor:"pointer"}}>
                see a demo
              </span>
              )
            </span>
          </Box>
        )}
        <Header
          import={e => this.import(this.handleFileUpload(e))}
          export={this.export.bind(this)}
          openListManager={() => {}}
          toggleState={this.toggleState.bind(this)}
          save={() => {}}
          restart={this.restart.bind(this)}
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
              this.setState({ students, editingStudent: -1 });
              this.setState({ issues: determineIssues(this.state) });
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
