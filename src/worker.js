
// Web worker file to run iterate in background

import { iterate } from './tools/algorithm.js';

export const runAlgorithm = data => {
  let bestOption = { lists: data.lists, issues: data.issues,
    cost: data.issues.map(x => x.severity).reduce((a,b)=>a+b,0) };
  for (let i = 0; i < 20; i++) {
    let newOption = iterate(data);
    if (newOption.cost < bestOption.cost)
      bestOption = newOption;
  }
  postMessage(bestOption);
};
