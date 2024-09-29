"use client"

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';

import './dijkstra.css';

const App = () => {
    const [grid, setGrid] = useState([]);
    const [rows, setRows] = useState();
    const [cols, setCols] = useState();
    const [isStartNodeSet, setIsStartNodeSet] = useState(false);
    const [isEndNodeSet, setIsEndNodeSet] = useState(false);
    const [startNode, setStartNode] = useState(null);
    const [endNode, setEndNode] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [warning, setWarning] = useState('');

    useEffect(() => {
        const grid = createGrid();
        setGrid(grid);
    }, [rows, cols]);

    const createGrid = () => {
        const grid = [];
        for (let row = 0; row < rows; row++) {
            const currentRow = [];
            for (let col = 0; col < cols; col++) {
                currentRow.push(createNode(row, col));
            }
            grid.push(currentRow);
        }
        return grid;
    };

    const createNode = (row, col) => {
        return {
            row,
            col,
            isStart: false,
            isEnd: false,
            isVisited: false,
            isWall: false,
            distance: Infinity,
            previousNode: null,
            isShortestPath: false,
        };
    };

    const handleNodeClick = (row, col) => {
        const newGrid = [...grid];
        if (!isStartNodeSet) {
            newGrid[row][col].isStart = true;
            setStartNode(newGrid[row][col]);
            setIsStartNodeSet(true);
        } else if (!isEndNodeSet) {
            newGrid[row][col].isEnd = true;
            setEndNode(newGrid[row][col]);
            setIsEndNodeSet(true);
        } else {
            newGrid[row][col].isWall = !newGrid[row][col].isWall;
        }
        setGrid(newGrid);
    };

    const resetGrid = () => {
        setGrid(createGrid());
        setIsStartNodeSet(false);
        setIsEndNodeSet(false);
        setStartNode(null);
        setEndNode(null);
        setWarning('');
        setRows(0);
        setCols(0);
    };

    const dijkstra = async () => {
        if (!startNode || !endNode) {
            setWarning('Please set both start and end nodes.');
            return;
        }

        setWarning('');
        setIsLoading(true);

        const unvisitedNodes = getAllNodes(grid);
        startNode.distance = 0;
        const visitedNodesInOrder = [];

        while (unvisitedNodes.length) {
            sortNodesByDistance(unvisitedNodes);
            const closestNode = unvisitedNodes.shift();

            if (closestNode.isWall) continue;
            if (closestNode.distance === Infinity) {
                setWarning('No path exists between the start and end nodes.');
                setIsLoading(false);
                return;
            }

            closestNode.isVisited = true;
            visitedNodesInOrder.push(closestNode);

            if (closestNode === endNode) {
                await visualizeVisitedNodes(visitedNodesInOrder);
                visualizeShortestPath(endNode);
                setIsLoading(false);
                return;
            }

            updateUnvisitedNeighbors(closestNode, grid);
        }
    };

    const sortNodesByDistance = (nodes) => {
        nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    };

    const updateUnvisitedNeighbors = (node, grid) => {
        const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
        }
    };

    const getUnvisitedNeighbors = (node, grid) => {
        const neighbors = [];
        const { row, col } = node;
        if (row > 0) neighbors.push(grid[row - 1][col]);
        if (row < rows - 1) neighbors.push(grid[row + 1][col]);
        if (col > 0) neighbors.push(grid[row][col - 1]);
        if (col < cols - 1) neighbors.push(grid[row][col + 1]);
        return neighbors.filter((neighbor) => !neighbor.isVisited);
    };

    const getAllNodes = (grid) => {
        const nodes = [];
        for (const row of grid) {
            for (const node of row) {
                nodes.push(node);
            }
        }
        return nodes;
    };

    const visualizeVisitedNodes = async (visitedNodesInOrder) => {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            const node = visitedNodesInOrder[i];
            await new Promise((r) => setTimeout(r, 10));
            const newGrid = [...grid];
            newGrid[node.row][node.col].isVisited = true;
            setGrid(newGrid);
        }
    };

    const visualizeShortestPath = async (endNode) => {
        const shortestPathNodes = [];
        let currentNode = endNode;
        while (currentNode !== null) {
            shortestPathNodes.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }

        for (let i = 0; i < shortestPathNodes.length; i++) {
            const node = shortestPathNodes[i];
            await new Promise((r) => setTimeout(r, 50));
            const newGrid = [...grid];
            newGrid[node.row][node.col].isShortestPath = true;
            setGrid(newGrid);
        }
    };

    return (
        <div className='flex flex-col h-screen'>
            <div className='sticky top-0 z-50  w-full flex flex-col items-center gap-5 py-4'>
                <h1 className='text-2xl'>Dijkstra's Algorithm</h1>
                <div className='flex gap-5'>
                    <Input
                        placeholder="Rows"
                        className="text-white"
                        type="number"
                        value={rows}
                        max={15}
                        onChange={(e) => setRows(Number(e.target.value))}
                    />
                    <Input
                        placeholder="Cols"
                        className="text-white"
                        type="number"
                        value={cols}
                        max={15}
                        onChange={(e) => setCols(Number(e.target.value))}
                    />
                    <Button onClick={dijkstra} className="bg-gray-500 hover:bg-gray-600 text-white">
                        Start Dijkstra
                    </Button>
                    <Button onClick={resetGrid} className="bg-red-500 hover:bg-red-600 text-white">
                        Reset Grid
                    </Button>
                </div>
                {isLoading && <p className='text-blue-600' >Loading the shortest path...</p>}
                {warning && <p className='text-red-700 text-lg font-semibold'>{warning}</p>}
            </div>

            {/* Scrollable Grid Section */}
            <div className="grid rounded-xl bg-black p-4 flex-1 overflow-y-auto max-h-full items-center justify-center backdrop-blur-sm">
                {grid.map((row, rowIdx) => (
                    <div key={rowIdx} className="grid-row flex">
                        {row.map((node, nodeIdx) => {
                            const { isStart, isEnd, isVisited, isWall, isShortestPath } = node;
                            const extraClassName = isStart
                                ? 'node-start'
                                : isEnd
                                    ? 'node-end'
                                    : isWall
                                        ? 'node-wall'
                                        : isShortestPath
                                            ? 'node-shortest-path'
                                            : isVisited
                                                ? 'node-visited'
                                                : '';
                            return (
                                <div
                                    key={nodeIdx}
                                    className={`node ${extraClassName}`}
                                    onClick={() => handleNodeClick(node.row, node.col)}
                                ></div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
