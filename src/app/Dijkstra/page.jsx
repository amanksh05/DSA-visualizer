// "use client"

// import React, { useState, useEffect } from 'react';
// import './App.css';

// const ROWS = 20;
// const COLS = 40;

// const createGrid = () => {
//   const grid = [];
//   for (let row = 0; row < ROWS; row++) {
//     const currentRow = [];
//     for (let col = 0; col < COLS; col++) {
//       currentRow.push(createNode(row, col));
//     }
//     grid.push(currentRow);
//   }
//   return grid;
// };

// const createNode = (row, col) => {
//   return {
//     row,
//     col,
//     isStart: false,
//     isEnd: false,
//     isVisited: false,
//     isWall: false,
//     distance: Infinity,
//     previousNode: null,
//     isShortestPath: false,
//   };
// };

// const App = () => {
//   const [grid, setGrid] = useState([]);
//   const [isStartNodeSet, setIsStartNodeSet] = useState(false);
//   const [isEndNodeSet, setIsEndNodeSet] = useState(false);
//   const [startNode, setStartNode] = useState(null);
//   const [endNode, setEndNode] = useState(null);

//   useEffect(() => {
//     const grid = createGrid();
//     setGrid(grid);
//   }, []);

//   const handleNodeClick = (row, col) => {
//     const newGrid = [...grid];
//     if (!isStartNodeSet) {
//       newGrid[row][col].isStart = true;
//       setStartNode(newGrid[row][col]);
//       setIsStartNodeSet(true);
//     } else if (!isEndNodeSet) {
//       newGrid[row][col].isEnd = true;
//       setEndNode(newGrid[row][col]);
//       setIsEndNodeSet(true);
//     } else {
//       newGrid[row][col].isWall = !newGrid[row][col].isWall;
//     }
//     setGrid(newGrid);
//   };

//   const dijkstra = async () => {
//     if (!startNode || !endNode) return;

//     const unvisitedNodes = getAllNodes(grid);
//     startNode.distance = 0;
//     const visitedNodesInOrder = [];

//     while (unvisitedNodes.length) {
//       sortNodesByDistance(unvisitedNodes);
//       const closestNode = unvisitedNodes.shift();

//       // Skip walls and nodes that are unreachable
//       if (closestNode.isWall) continue;
//       if (closestNode.distance === Infinity) return;

//       closestNode.isVisited = true;
//       visitedNodesInOrder.push(closestNode);

//       if (closestNode === endNode) {
//         await visualizeVisitedNodes(visitedNodesInOrder);
//         visualizeShortestPath(endNode);
//         return;
//       }

//       updateUnvisitedNeighbors(closestNode, grid);
//     }
//   };

//   const sortNodesByDistance = (nodes) => {
//     nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
//   };

//   const updateUnvisitedNeighbors = (node, grid) => {
//     const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
//     for (const neighbor of unvisitedNeighbors) {
//       neighbor.distance = node.distance + 1;
//       neighbor.previousNode = node;
//     }
//   };

//   const getUnvisitedNeighbors = (node, grid) => {
//     const neighbors = [];
//     const { row, col } = node;
//     if (row > 0) neighbors.push(grid[row - 1][col]);
//     if (row < ROWS - 1) neighbors.push(grid[row + 1][col]);
//     if (col > 0) neighbors.push(grid[row][col - 1]);
//     if (col < COLS - 1) neighbors.push(grid[row][col + 1]);
//     return neighbors.filter((neighbor) => !neighbor.isVisited);
//   };

//   const getAllNodes = (grid) => {
//     const nodes = [];
//     for (const row of grid) {
//       for (const node of row) {
//         nodes.push(node);
//       }
//     }
//     return nodes;
//   };

//   const visualizeVisitedNodes = async (visitedNodesInOrder) => {
//     for (let i = 0; i < visitedNodesInOrder.length; i++) {
//       const node = visitedNodesInOrder[i];
//       await new Promise((r) => setTimeout(r, 10)); // Small delay for visualization
//       const newGrid = [...grid];
//       newGrid[node.row][node.col].isVisited = true;
//       setGrid(newGrid);
//     }
//   };

//   const visualizeShortestPath = async (endNode) => {
//     const shortestPathNodes = [];
//     let currentNode = endNode;
//     while (currentNode !== null) {
//       shortestPathNodes.unshift(currentNode);
//       currentNode = currentNode.previousNode;
//     }

//     for (let i = 0; i < shortestPathNodes.length; i++) {
//       const node = shortestPathNodes[i];
//       await new Promise((r) => setTimeout(r, 50)); // Small delay for visualization
//       const newGrid = [...grid];
//       newGrid[node.row][node.col].isShortestPath = true;
//       setGrid(newGrid);
//     }
//   };

//   return (
//     <div>
//       <h1>Pathfinding Visualizer (Dijkstra's Algorithm)</h1>
//       <button onClick={dijkstra}>Start Dijkstra</button>
//       <div className="grid">
//         {grid.map((row, rowIdx) => {
//           return (
//             <div key={rowIdx} className="grid-row">
//               {row.map((node, nodeIdx) => {
//                 const { isStart, isEnd, isVisited, isWall, isShortestPath } = node;
//                 const extraClassName = isStart
//                   ? 'node-start'
//                   : isEnd
//                   ? 'node-end'
//                   : isWall
//                   ? 'node-wall'
//                   : isShortestPath
//                   ? 'node-shortest-path'
//                   : isVisited
//                   ? 'node-visited'
//                   : '';
//                 return (
//                   <div
//                     key={nodeIdx}
//                     className={`node ${extraClassName}`}
//                     onClick={() => handleNodeClick(node.row, node.col)}
//                   ></div>
//                 );
//               })}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default App;
