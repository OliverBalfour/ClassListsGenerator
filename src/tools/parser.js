
import {generateRandomList,determineIssues} from './algorithm.js';

/*
// TODO:

need to display gender in both cases
the problem is when you import the spreadsheet the categories are in the wrong order
*/

const safeSplitComma = string => {
  // we can have commas in strings delimited by "these quotes"
  // this works around that
  var inString = false;
  var items = [];
  var currentItem = '';
  for (let c of string) {
    if (c === '"') {
      inString = !inString;
      continue;
    }
    if (inString || c !== ',') {
      currentItem += c;
    } else {
      items.push(currentItem.trim());
      currentItem = '';
    }
  }
  items.push(currentItem.trim());
  return items;
}

export function parseCSVSpreadsheet (rawDataString) {
  var lines = rawDataString.split(/[\r\n]+/); // split by all 3 line endings
  while (lines.indexOf("") !== -1) lines.splice(lines.indexOf(""), 1);
  var data;

  if (lines[0][0] === ',') {
    // requirements only
    data = parseRequirements(lines);
    data.lists = generateRandomList(data.studentNames, data.numClasses);
  } else {
    // exported sheet (lists, two blank lines, requirements, two blank lines, issues)
    let blanks = 0, blankIdxs = [];
    for (let i = 0; i < lines.length; i++) {
      if (isBlankLine(lines[i])) blanks++;
      else blanks = 0;
      if (blanks === 2) {
        blanks = 0;
        blankIdxs.push(i);
      }
    }
    // 0 to blankIdxs[0]-1 exclusive is class list
    // blankIdxs[0]+1 to blankIdxs[1]-1 exclusive is requirements list
    data = parseRequirements(lines.slice(blankIdxs[0]+1, blankIdxs[1]-1));
    data.lists = parseClassLists(data, lines.slice(0, blankIdxs[0]-1));
  }

  data.issues = determineIssues(data);

  return data;
}

function parseClassLists (state, lines) {
  const cols = state.teacherNames.length;
  const removeQuotes = x=>x[0] === '"' ? x.substring(1,x.length-1) : x;
  const extractCols = line => line.split(',').slice(0,cols).map(removeQuotes);
  const lists = state.teacherNames.map(x=>[]);
  const idxFromName = name => state.studentNames.indexOf(name);
  for (let i = 1; i < lines.length; i ++) {
    const names = extractCols(lines[i]);
    for (let j = 0; j < cols; j++) {
      if (names[j].length)
        lists[j].push(idxFromName(names[j]));
    }
  }
  return lists;
}

function parseRequirements (lines) {
  var numClasses = parseInt(lines[1].split(",")[5]);
  var minStudents = parseInt(lines[1].split(",")[1]);
  var maxStudents = parseInt(lines[1].split(",")[2]);

  var teacherNames = safeSplitComma(lines[1])[8].split(',').map(x=>x.trim()).filter(x => x.length);
  var categories = ["Female", ...safeSplitComma(lines[4]).slice(11)];
  var categoryColours = [];
  var colourRegex = /(.*)\((\w+)\)/;
  for (let i = 0; i < categories.length; i++) {
    var match = categories[i].match(colourRegex);
    if (match) {
      categories[i] = match[1];
      categoryColours.push(match[2]);
    } else categoryColours.push("default");
  }

  var students = [];
  var studentNames = lines.slice(5).map(safeSplitComma).map(x=>x[1]);
  for (let i = 5; i < lines.length; i++) {
    var row = safeSplitComma(lines[i]).slice(1);
    students.push({
      classID: safeSplitComma(lines[i])[0],
      name: row[0],
      categories: [row[1][0] === "F",
        ...row.slice(10).map(x => x.length > 0)], // list of bools
      friends: row.slice(2,7).map(name=>studentNames.indexOf(name))
                .filter(x=>x>=0),
      mustBeWith: row[8].length === 0 ? []
        : safeSplitComma(row[8]).map(name=>studentNames.indexOf(name))
          .filter(x=>x>=0),
      cannotBeWith: row[7].length === 0 ? []
        : safeSplitComma(row[7]).map(n=>studentNames.indexOf(n))
          .filter(x=>x>=0),
      // indices of teacher names within teacherNames
      // if ALL, add all indices [0,1,...,numClasses]
      possibleTeachers: (row[9].toLowerCase() === "all"
                      || row[9].toLowerCase() === "any" || row[9] === "")
        ? teacherNames.map((_,i) => i)
        : safeSplitComma(row[9]).map(name => teacherNames.indexOf(name))
          .filter(x=>x>=0)
    });
  }

  return {
    numClasses, // teacherNames.length
    classSize: [minStudents, maxStudents],
    teacherNames,
    categories,
    categoryColours,
    students,
    studentNames
  }
}

const isBlankLine = line => line.split('').filter(c => c !== ',').length === 0;

const commasep = numCols => list => {
  let s = list.map(x => {
    const y = x.toString();
    return (y.indexOf(',') === -1 || (y[0] === '"' && y[y.length-1]==='"')) ? y : `"${y}"`;
  }).join(',');
  for (let i = 0; i < numCols - list.length; i++)
    s += ',';
  return s;
}

function listsToCSV (state,sep) {
  // first we format the data as a matrix of values
  let rows = [state.teacherNames];
  for (let i = 0; i < Math.max(...state.lists.map(l=>l.length)); i++) {
    const row = [];
    for (let j = 0; j < state.lists.length; j++) {
      if (i < state.lists[j].length)
        row.push(state.students[state.lists[j][i]].name);
      else row.push("");
    }
    // add quotes to escape commas in names in case they pop up
    rows.push(row.map(val => `"${val}"`));
  }
  // next we turn it to CSV
  let string = rows.map(sep).join("\n");
  return string;
}

function requirementsToCSV (state,sep) {
  let lines = [];
  lines.push(sep(['','Min','Max']));
  lines.push(sep(['Students per class',state.classSize[0],state.classSize[1],'','No. classes',state.teacherNames.length,'','Teachers',state.teacherNames]));
  lines.push(sep([]));
  lines.push(sep(['Required','Optional','','','','','','','','Custom categories']));
  lines.push(sep(['Class code','Name','Gender','Friend 1','Friend 2','Friend 3','Friend 4','Friend 5',"Can't be with",'Must be with','Possible teachers',...state.categories]));
  for (let i = 0; i < state.students.length; i++) {
    var s = state.students[i];
    var f = n => state.students[n].name;
    var friends = s.friends.map(f);
    while (friends.length < 5) friends.push("");
    var cant = s.cannotBeWith.map(f).join(', ');
    var must = s.mustBeWith.map(f).join(', ');
    var teachers = s.possibleTeachers.length === state.teacherNames.length ? "ALL" : s.possibleTeachers.map(n=>state.teacherNames[n]).join(', ');
    var cats = s.categories.slice(1).map(b => b ? "YES" : "");
    lines.push(sep([s.classID,s.name,s.categories[0]?'F':'M',...friends,cant,must,teachers,...cats]));
  }
  return lines.join('\n');
}

function issuesToCSV (state,sep) {
  return sep(["Issues:"]) + '\n' + state.issues.map(is => sep([is.message])).join('\n');
}

export function unparseCSVSpreadsheet (state) {
  const numCols = Math.max(state.teacherNames.length + 8, state.categories.length + 10);
  const sep = commasep(numCols);
  const blank = '\n'+sep([]);
  return [listsToCSV(state,sep), requirementsToCSV(state,sep), issuesToCSV(state,sep)].join(blank+blank+'\n');
}
