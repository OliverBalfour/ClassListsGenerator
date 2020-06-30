
export function parseCSVSpreadsheet (rawDataString) {
  var lines = rawDataString.split(/[\r\n]+/); // split by all 3 line endings

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

  var numClasses = parseInt(lines[1].split(",")[5]);
  var minStudents = parseInt(lines[1].split(",")[1]);
  var maxStudents = parseInt(lines[1].split(",")[2]);

  var teacherNames = safeSplitComma(lines[1]).slice(8);
  var categories = ["Female", ...safeSplitComma(lines[5]).slice(10)];

  var students = [];
  var studentNames = lines.slice(6).map(l => l.substring(0, l.indexOf(',')));
  for (let i = 6; i < lines.length; i++) {
    var row = safeSplitComma(lines[i]);
    students.push({
      name: row[0],
      categories: [row[1] === "F",
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
                      || row[9].toLowerCase() === "any")
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
    students
  }
}
