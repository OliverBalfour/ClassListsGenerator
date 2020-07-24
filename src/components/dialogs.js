import React from 'react';
import {
  TextField, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, Button, FormLabel, FormControl, FormGroup, FormControlLabel,
  Checkbox, Table, TableBody, TableRow, TableCell, Select
} from '@material-ui/core';

export function EditStudentDialog (props) {
  const studentNames = props.students.map(x=>x.name);
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
    friends: student.friends.map(i => studentNames[i]).join(', '),
    mustBeWith: student.mustBeWith.map(i => studentNames[i]).join(', '),
    cannotBeWith: student.cannotBeWith.map(i => props.students[i].name).join(', ')
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
      if (value === "") stud[key] = [];
      else stud[key] = value.split(",").map(x=>studentNames.indexOf(x.trim()));
      var invalidIdx = stud[key].indexOf(-1);
      if (invalidIdx !== -1) nameError = value.split(",")[invalidIdx];
    }
    
    // Validation
    if (student.possibleTeachers.length === 0) {
      setErrorMessage("Cannot have zero possible teachers.");
    } else if (nameError !== false) {
      setErrorMessage("Invalid name: '"+nameError+"'. Make sure spelling is exact and there is one comma between each name.");
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
  var dummyMarkup = (<>
  <TextField
    label="Must be with (comma separated names)"
    variant="filled"
    value={dummies.mustBeWith}
    onChange={handleDummyChange("mustBeWith")}
    fullWidth
  />
  <TextField
    label="Cannot be with (comma separated names)"
    variant="filled"
    value={dummies.cannotBeWith}
    onChange={handleDummyChange("cannotBeWith")}
    fullWidth
  />
  <TextField
    label="Friends (comma separated names)"
    variant="filled"
    value={dummies.friends}
    onChange={handleDummyChange("friends")}
    fullWidth
  /></>);

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
      fullWidth
    />
    <Select
      native
      value={props.teachers[classIdx]}
      onChange={evt => setClassIdx(props.teachers.indexOf(evt.target.value))}
      fullWidth
    >
      {props.teachers.map((name, idx) =>
        <option value={name} key={idx}>{name}</option>
      )}
    </Select>
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
    {dummyMarkup}
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
