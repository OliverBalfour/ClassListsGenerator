
// Lists is a jagged array of student indices
// Class size is [min, max]
// Students is an array of student objects such that:
//  friends::[Int] - at least one should be in same class
//  categories::[Bool] - each boolean category should be roughly evenly distributed
//  mustBeWith::[Int], cannotBeWith::[Int]
//  possibleTeachers::[Int]
export function iterate (state) {
  let { lists, students, classSize } = state;
  // Use a weird mix of hill climbing and simulated annealing optimisation algorithms
  // Initially we choose the first five moves that reduce cost of up to 100 moves
  // By the end we string multiple moves together (up to 10 consecutively)
  // And they can increase cost with a low probability
  let maxAttemptedChanges = 1000,
      maxPermutationSteps = 3,
      currentCost = cost(state);
  for (let i = 0; i < maxAttemptedChanges; i++) {
    // if we are 'behind schedule' (not on track to reach c == maxChanges)
    // then we increase the number of permutation steps
    // and increase P(accept worse solution)
    // Generate a new permutation
    let perm = copy(lists);
    let schedule = i / maxAttemptedChanges;
    for (let j = 0; j < Math.ceil(schedule * maxPermutationSteps); j++)
      perm = generatePermutation(perm, students, classSize);
    // Update the lists
    let newCost = cost({...state, lists: perm});
    if (newCost < cost({...state, lists})) {
      lists = perm;
      currentCost = newCost;
    }
  }
  return { lists, issues: determineIssues({...state, lists}), cost: currentCost };
}

function generatePermutation(lists, students, classSize) {
  lists = copy(lists);
  // Most perms swap students, it's cleaner and there are more possible moves
  if (rand(0,2) < 1) {
    // swap two students (class size remains the same)
    let a = rand(0, students.length),
        b = rand(0, students.length - 1);
    if (b === a) b = students.length - 1;
    let asrc = searchClasses(lists, a),
        bsrc = searchClasses(lists, b);
    lists[asrc][lists[asrc].indexOf(a)] = b;
    lists[bsrc][lists[bsrc].indexOf(b)] = a;
  } else {
    // move one student to another class
    let a = rand(0, students.length),
        dst = rand(0, lists.length - 1),
        src = searchClasses(lists, a);
    if (dst === src) dst = lists.length - 1;
    lists[src].splice(lists[src].indexOf(a), 1);
    lists[dst].push(a);
  }

  // Test that no student is duplicated
  var studs = {};
  for (let list of lists)
    for (let student of list)
      if (studs[student]) console.error("Duplicated student");
      else studs[student] = true;

  return lists;
}

// random integer in interval [min, max)
const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);
// Deep copy primitive object/array
const copy = obj => JSON.parse(JSON.stringify(obj));

// Sum severities of the issues list
function cost (state) {
  return determineIssues(state)
    .map(x => x.severity)
    .reduce((a,b)=>a+b,0);
}

// Search a class list for student index x (-1 if not found)
const searchClasses = (lists, x) =>
  lists.map(list => list.indexOf(x) !== -1).indexOf(true);

// Creates a list of issues with a list state for 1) display in a modal
// and 2) optimisation in `iterate`: minimises \sum_{k\in issues} k_{severity}
export function determineIssues (state) {
  let { lists, students, classSize, categories, teacherNames } = state;
  var issues = [];
  for (let j = 0; j < lists.length; j++) {
    const list = lists[j];
    for (let i = 0; i < list.length; i++) {
      const student = students[list[i]];
      // Must/cannot be with
      for (const idx of student.mustBeWith) {
        if (list.indexOf(idx) === -1)
          issues.push({severity: 3, message: `${student.name} must be with ${students[idx].name}.`});
      }
      for (const idx of student.cannotBeWith) {
        if (list.indexOf(idx) !== -1)
          issues.push({severity: 5, message: `${student.name} cannot be with ${students[idx].name}.`});
      }
      // Friends
      let numFriends = 0;
      for (const idx of student.friends) {
        if (list.indexOf(idx) !== -1) numFriends ++;
      }
      if (numFriends < 1 && student.friends.length > 0)
        issues.push({severity: 3, message: `${student.name} is not with any friends.`});
      // Possible teacherNames
      if (student.possibleTeachers.indexOf(j) === -1)
        issues.push({severity: 5, message: `${student.name} must not be in ${teacherNames[j]}'s class.`});
    }
    // Class size
    if (list.length < classSize[0]) {
      const severity = classSize[0] - list.length;
      issues.push({
        severity: 8 * severity,
        message: `${teacherNames[j]}'s class has ${severity} too few students.`
      });
    } else if (list.length > classSize[1]) {
      const severity = list.length - classSize[1];
      issues.push({
        severity: 10 * severity,
        message: `${teacherNames[j]}'s class has ${severity} too many students.`
      });
    }
  }
  // Categories
  // catMat[categoryIdx][classIdx] is num people with that cat in that class
  const catMat = categories.map((_, i) => lists.map(
    // count number of students in list with category i enabled
    list => list.map(studentIdx => students[studentIdx].categories[i]).reduce((a,b)=>a+b,0)
  ));
  for (let i = 0; i < categories.length; i++) {
    const diff = Math.max(...catMat[i]) - Math.min(...catMat[i]);
    if ((diff > 1 && i !== 0) || (diff > 3 && i === 0)) { // gender imbalance is less important
      issues.push({
        severity: diff,
        message: `Imbalanced ${categories[i]} category: ${catMat[i]} students per class respectively.`
      });
    }
  }

  return issues;
}

export function generateRandomList (studentNames, numClasses) {
  const shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  var listIndices = shuffle(studentNames.map((_,i)=>i));
  var lists = [];
  var lastIndex = 0;
  let k = Math.ceil(studentNames.length/numClasses);
  for (let i = 0; i < numClasses; i++) {
    lists.push(listIndices.slice(lastIndex, lastIndex + k));
    lastIndex += k;
  }
  return lists;
}
