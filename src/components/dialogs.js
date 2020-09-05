import React from 'react';
import {unparseCSVSpreadsheet} from '../tools/parser.js';
import {
  TextField, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button, FormLabel, FormControl, FormGroup, FormControlLabel,
  Checkbox, Table, TableBody, TableRow, TableCell, Select, Input, MenuItem,
  useTheme, InputLabel
} from '@material-ui/core';

export function EditStudentDialog (props) {
  const studentNames = props.students.map(x=>x.name);
  const theme = useTheme();
  /**
   * props.student_idx :: Int
   * props.updateStudent :: Student -> void
   * props.teachers :: [name :: String]
   * props.students :: [{
       name :: String, categories :: [Bool], friends :: [student index]
       mustBeWith :: [student index], cannotBeWith :: [student index],
       possibleTeachers :: [index into teachers]
     }]
   * props.categories :: [String]
   */

  var [student, setStudent] = React.useState(
    JSON.parse(JSON.stringify(props.students[props.student_idx]))
  );
  var [errorMessage, setErrorMessage] = React.useState("");

  // Note: trims whitespace too
  const handleChange = key => evt => setStudent({
    ...student, [key]: evt.target.value.trim()
  });

  // Use dummy representations of lists of names as checkboxes are a poor choice
  // for this use case and a dynamic list is a lot of work
  // TODO: use <Select multiple /> instead https://material-ui.com/components/selects/#multiple-select

  // handle change to 'name 1, name 2, ...' represented as list of
  // indices into props.students
  var [dummies, setDummies] = React.useState({
    friends: student.friends.map(id => studentNames[id]),
    mustBeWith: student.mustBeWith.map(id => studentNames[id]),
    cannotBeWith: student.cannotBeWith.map(id => studentNames[id])
  });
  const handleDummyChange = key => evt => setDummies({
    ...dummies, [key]: evt.target.value
  });
  let [classIdx, setClassIdx] = React.useState(props.classIdx);
  const updateStudent = student => {
    // Rebase dummy values onto student by parsing CSV strings
    var stud = {};
    var nameError = false;
    for (const [key, value] of Object.entries(dummies)) {
      if (!value.length) stud[key] = [];
      else stud[key] = value.map(x=>studentNames.indexOf(x));
      var invalidIdx = stud[key].indexOf(-1);
      if (invalidIdx !== -1) nameError = value[invalidIdx];
    }

    // Validation
    if (student.possibleTeachers.length === 0) {
      setErrorMessage("Cannot have zero possible teachers.");
    } else if (nameError !== false) {
      setErrorMessage("Invalid name: '"+nameError+"'. Make sure spelling is exact.");
    } else {
      for (const [key, value] of Object.entries(stud)) {
        student[key] = value;
      }
      setStudent(student);
      if (classIdx !== props.classIdx && student !== props.students[props.student_idx])
        props.updateStudentClassIdx(classIdx);
      props.updateStudent(student);
    }
  }
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const DummyField = ({prop, printName}) => (
    <React.Fragment>
      <br/>
      <InputLabel id={prop+"-label"}>{printName}</InputLabel>
      <Select
        labelId={prop+"-label"}
        multiple
        value={dummies[prop]}
        onChange={handleDummyChange(prop)}
        input={<Input />}
        fullWidth>
        {studentNames.map(name => (
          <MenuItem key={name} value={name} style={getStyles(name, dummies[prop], theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </React.Fragment>
  );
  var dummyMarkup = (
    <React.Fragment>
      <br/><DummyField prop="friends" printName="Friends" />
      <br/><DummyField prop="mustBeWith" printName="Must Be With" />
      <br/><DummyField prop="cannotBeWith" printName="Cannot Be With" />
    </React.Fragment>
  );

  return (
 <Dialog open={true} onClose={()=>{}} aria-labelledby="form-dialog-title">
  <DialogTitle id="form-dialog-title">Editing {student.name}</DialogTitle>
  <DialogContent>
    <DialogContentText>
      To force a class change after lists are generated, you must edit a
      student's parameters.&nbsp;
      {errorMessage.length === 0 ? null : (
        <span style={{color:'red'}}>Error: {errorMessage}</span>
      )}
    </DialogContentText>
    <TextField
      label="Name"
      variant="filled"
      value={student.name}
      onChange={handleChange("name")}
      fullWidth />
    <InputLabel style={{marginTop:10}} id="teacher-label">Current Teacher</InputLabel>
    <Select
      labelId="teacher-label"
      native
      value={props.teachers[classIdx]}
      onChange={evt => setClassIdx(props.teachers.indexOf(evt.target.value))}
      fullWidth
    >
      {props.teachers.map((name, idx) =>
        <option value={name} key={idx}>{name}</option>
      )}
    </Select>
    {dummyMarkup}
    <FormControl component="fieldset" style={{marginTop:"20px"}}>
      <FormLabel component="legend">Categories</FormLabel>
      <FormGroup>
        {student.categories.map((on, idx) => (
          <FormControlLabel
            control={
              <Checkbox checked={on} onChange={() => {
                student.categories[idx] = !student.categories[idx];
                setStudent({...student});
              }} />
            }
            label={props.categories[idx]} key={idx}
          />
        ))}
      </FormGroup>
    </FormControl>
    <FormControl component="fieldset" style={{marginTop:"20px"}}>
      <FormLabel component="legend">Possible teachers</FormLabel>
      <FormGroup>
        {props.teachers.map((name, idx) => (
          <FormControlLabel
            control={
              <Checkbox checked={student.possibleTeachers.indexOf(idx) !== -1}
                onChange={() => {
                  const possible_idx = student.possibleTeachers.indexOf(idx);
                  if (possible_idx === -1) student.possibleTeachers.push(idx);
                  else student.possibleTeachers.splice(possible_idx, 1);
                  setStudent({...student});
                }}
              />
            }
            label={name} key={idx}
          />
        ))}
      </FormGroup>
    </FormControl>
  </DialogContent>
  <DialogActions>
    <Button color="primary" onClick={
      () => updateStudent(props.students[props.student_idx])
    }>
      Cancel
    </Button>
    <Button onClick={() => updateStudent(student)}
      color="primary">
      Update
    </Button>
  </DialogActions>
</Dialog>
  );
}

export function ViewIssuesDialog (props) {
  return (
 <Dialog open={true} onClose={()=>{}} aria-labelledby="form-dialog-title"
    fullWidth={true} maxWidth="md">
  <DialogTitle id="form-dialog-title">Issues with current class list</DialogTitle>
  <DialogContent>
    <Table size='small'>
      <TableBody>
        {props.issues.map((issue, idx) => (
          <TableRow key={idx}>
            <TableCell>
              {issue.message}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </DialogContent>
  <DialogActions>
    <Button color="primary" onClick={props.close}>
      Close
    </Button>
  </DialogActions>
</Dialog>
  );
}

export function downloadFile (filename, data) {
  let blob = new Blob([data], {type: 'text/csv'}),
      elem = document.createElement('a');
  elem.href = window.URL.createObjectURL(blob);
  elem.download = filename;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}

export function SavedClassesDialog (props) {
  const exportCSV = i => {
    const string = unparseCSVSpreadsheet(props.saves[i].data);
    const time = new Date(props.saves[i].time).toLocaleString();
    downloadFile("class_lists_"+props.saves[i].name+"_"+time+".csv", string);
  }
  return (
 <Dialog open={true} onClose={()=>{}} aria-labelledby="form-dialog-title"
    fullWidth={true} maxWidth="md">
  <DialogTitle id="form-dialog-title">Saved class lists</DialogTitle>
  <DialogContent>
    <Table size='small'>
      <TableBody>
        {/* we want them in reverse order, so newest is at the top */}
        {props.saves.slice(0).reverse().map((save, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <strong>{save.name}</strong>
            </TableCell>
            <TableCell>
              {new Date(save.time).toLocaleString()}
            </TableCell>
            <TableCell>
              <Button color='secondary' variant='contained' onClick={()=>exportCSV(props.saves.length-1-idx)}>
                Export CSV
              </Button>
            </TableCell>
            <TableCell>
              <Button color='secondary' variant='contained' onClick={()=>props.restore(save)}>
                Restore
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </DialogContent>
  <DialogActions>
    <Button color="primary" onClick={props.close}>
      Close
    </Button>
  </DialogActions>
</Dialog>
  );
}
