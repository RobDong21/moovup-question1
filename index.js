// We use an adjency list to represent the graph
const adjencyList = {
  a: ["b", "d", "h"],
  b: ["a", "c", "d"],
  c: ["b", "d", "f"],
  d: ["a", "b", "c", "e"],
  e: ["d", "f", "h"],
  f: ["c", "e", "g"],
  g: ["f", "h"],
  h: ["a", "e", "g"],
};

//a. Write a function that returns all the possible paths between A­-H.
// We will use Depth First Search approach
const findAllPaths = (adjencyList, entry, destination) => {
  const results = [];

  const traverse = (node = entry, path = []) => {
    path.push(node);
    if (node === destination) {
      results.push(path.join(""));
      return;
    }

    for (const neighbor of adjencyList[node]) {
      if (!path.includes(neighbor)) {
        traverse(neighbor, [...path]);
      }
    }
  };

  traverse();
  return results;
};

console.log(`The possible paths are: ${findAllPaths(adjencyList, "a", "h")}`);
console.log("=========================================");

//b. Write a function that returns the least number of hops (shortest path) between A­-H.
// we can use the answer from a

const findShortestPath = (adjencyList, entry, destination) => {
  const results = findAllPaths(adjencyList, entry, destination);
  return results.sort((a, b) => a.length - b.length)[0];
};

const resultShortestPath = findShortestPath(adjencyList, "a", "h");
console.log(
  `The shortest path has length ${resultShortestPath.length} and is "${resultShortestPath}"`
);
console.log("=========================================");

// or we can use Breadth First Search for better performance compare to Depth First Search since we are exploring neighbor before digging into each child
const findShortestPathWithBFS = (adjencyList, entry, destination) => {
  const queue = [[entry, [entry]]];
  const visited = new Set();

  while (queue.length > 0) {
    const [node, path] = queue.shift();
    visited.add(node);
    for (const neighbor of adjencyList[node]) {
      if (neighbor === destination) {
        return path + [destination];
      } else {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, path + [neighbor]]);
        }
      }
    }
  }
};

console.log(
  `The shortest path is "${findShortestPathWithBFS(adjencyList, "a", "h")}"`
);
