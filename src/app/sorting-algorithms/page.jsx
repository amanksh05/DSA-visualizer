"use client"
import { useState, useEffect } from 'react';

export default function Home() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubbleSort');
  const [speed, setSpeed] = useState(500);
  const [size, setSize] = useState(30);

  useEffect(() => {
    generateArray();
  }, [size]);
  const generateArray = () => {
    if (sorting) return;
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    setArray(arr);
  };

  const bubbleSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
      }
    }
    setSorting(false);
  };

  const insertionSort = async () => {
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
    setSorting(false);
  };

  const selectionSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));
    }
    setSorting(false);
  };

  const mergeSort = async (arr = array, l = 0, r = array.length - 1) => {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
    setArray([...arr]);
    return;
  };

  const merge = async (arr, l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;

    let left = new Array(n1);
    let right = new Array(n2);

    for (let i = 0; i < n1; i++) left[i] = arr[l + i];
    for (let j = 0; j < n2; j++) right[j] = arr[m + 1 + j];

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = left[i];
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = right[j];
      j++;
      k++;
    }

    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, speed));
  };

  // Sorting Algorithm Selection and Execution
  const sortArray = () => {
    if (sorting) return;
    setSorting(true);

    switch (algorithm) {
      case 'bubbleSort':
        bubbleSort();
        break;
      case 'insertionSort':
        insertionSort();
        break;
      case 'selectionSort':
        selectionSort();
        break;
      case 'mergeSort':
        mergeSort();
        setSorting(false)
        break;
      default:
        break;
    }
  };

  return (
    <div className="font-sans mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sorting Algorithm Visualizer</h1>

      <div className="controls flex space-x-4 mb-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={generateArray}
        >
          Generate Array
        </button>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={sortArray}
        >
          Sort
        </button>

        <select
          className="border px-4 py-2 rounded bg-black text-white"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="bubbleSort">Bubble Sort</option>
          <option value="insertionSort">Insertion Sort</option>
          <option value="selectionSort">Selection Sort</option>
          <option value="mergeSort">Merge Sort</option>
        </select>

        <input
          type="range"
          min="10"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="slider"
        />
        <label>Speed: {speed}ms</label>

        <input
          type="range"
          min="10"
          max="100"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="slider"
        />
        <label>Size: {size}</label>
      </div>

      <div className="array-container transition-[height] duration-[0.3s] ease-[ease-in-out] flex justify-center items-end h-64 space-x-1">
        {array.map((value, index) => (
            <div
              key={index}
              className="bg-blue-500 flex items-baseline justify-center"
              style={{ height: `${value}%`, width: `${100 / size}%` }}
            ></div>
        ))}
      </div>
    </div>
  );
}
