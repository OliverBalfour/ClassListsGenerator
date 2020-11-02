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
        <h1 className={classes.className}>{props.name}<span className='cl-printonly'> {new Date().getFullYear()}</span></h1>
      </TableCell></TableRow>
    </TableHead>
    <TableBody>
      {props.list.map((student_idx, index_in_list) => {
        const stud = props.students[student_idx];
        return (
          <TableRow key={student_idx}>
            <TableCell>
              {stud.name} &nbsp;&nbsp;
              {relevantCategories[index_in_list].map((cat, i) => <span key={cat}>
                <ChipWrapper category={props.categories[cat]}
                  colour={props.categoryColours ? props.categoryColours[cat]:null}/>
                &nbsp;
              </span>)}
              <PrintOnlyStuff student={stud} />
              {props.state !== 'editing' ? null : (
                <CreateIcon fontSize='small' className={classes.pencil}
                  onClick={() => props.editStudent(student_idx)} />
              )}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
</TableContainer>
  );
}

const ChipWrapper = ({ category, colour }) => {
  const chipRef = React.useRef(null);
  React.useEffect(() => {
    chipRef.current.style = `background-color: ${colour}`;
  });
  return (
    <Chip label={category} size='small' ref={chipRef} />
  );
};

const PrintOnlyStuff = ({student}) =>
  <span className='cl-printonly'>{student.classID}</span>
