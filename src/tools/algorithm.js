// Hill walking algorithm - kinda average interim solution
// Lists is a jagged array of student indices
// Class size is [min, max]
// Students is an array of student objects such that:
//  friends::[Int] - at least one should be in same class
//  categories::[Bool] - each boolean category should be roughly evenly distributed
//  mustBeWith::[Int], cannotBeWith::[Int]
//  possibleTeachers::[Int]
export function iterate (lists, students, classSize) {
  var numMoves = 0;
  for (let i = 0; i < 100; i++) {
    const perm = generatePermutation(lists, students, classSize);
    if (cost(perm, students) < cost(lists, students)) {
      lists = perm;
      numMoves ++;
      if (numMoves > 5) break;
    }
  }
  const issues = determineIssues(lists, students);
  return { lists, issues };
}

// Considerations: class size is not constant
function generatePermutation(lists, students, classSize) {
  lists = copy(lists);
  let a = rand(0, students.length),
      b = rand(0, students.length - 1);
  if (b === a) b = students.length - 1;
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].indexOf(a) >= 0) lists[i][lists[i].indexOf(a)] = b;
  }
  for (let i = lists.length - 1; i >= 0; i--) {
    if (lists[i].indexOf(b) >= 0) lists[i][lists[i].indexOf(b)] = a;
  }
  return lists;
}

// random integer in interval [min, max)
const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
// Deep copy primitive object/array
const copy = obj => JSON.parse(JSON.stringify(obj));

function cost (lists, students) {
  return determineIssues(lists, students).map(x => x.severity).reduce((a,b)=>a+b,0);
}

// determineIssues :: [[Int]], [Student] -> [{severity::Int, message::String}]
// Creates a list of issues with a list state for 1) display in a modal
// and 2) optimisation in `iterate`: minimises \sum_{k\in issues} k_{severity}
export function determineIssues (lists, students) {
  var issues = [];
  for (let j = 0; j < lists.length; j++) {
    const list = lists[j];
    for (let i = 0; i < list.length; i++) {
      const student = students[list[i]];
      for (const idx of student.mustBeWith) {
        if (list.indexOf(idx) === -1)
          issues.push({severity: 3, message: `${student.name} must be with ${students[idx].name}.`});
      }
      for (const idx of student.cannotBeWith) {
        if (list.indexOf(idx) !== -1)
          issues.push({severity: 5, message: `${student.name} cannot be with ${students[idx].name}.`});
      }
      let numFriends = 0;
      for (const idx of student.friends) {
        if (list.indexOf(idx) !== -1) numFriends ++;
      }
      if (numFriends < 1)
        issues.push({severity: 4, message: `${student.name} is not with any friends.`});
      if (student.possibleTeachers.indexOf(j) === -1)
        issues.push({severity: 3, message: `${student.name} must be with a different teacher.`});
    }
  }
  // TODO: sum number of each category per class, add abs(a-b-1)//2 severity points per no classes choose 2 (a,b) tuples per category?
  return issues;
}
