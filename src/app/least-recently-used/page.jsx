"use client";
import React, { useState } from 'react';
import { LRUCache } from '@/app/least-recently-used/LRUutil';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

function page() {
    const [capacity, setCapacity] = useState(0);
    const [cache, setCache] = useState(new LRUCache(capacity));
    const [cacheState, setCacheState] = useState([]);
    const [keyInput, setKeyInput] = useState('');
    const [valueInput, setValueInput] = useState('');
    const [getInput, setGetInput] = useState('');

    const updateCacheCapacity = (newCapacity) => {
        const newCache = new LRUCache(newCapacity);
        cacheState.forEach(item => {
            newCache.put(item.key, item.value);
        });
        setCache(newCache);
        setCacheState([...newCache.getCacheState()]);
        toast.success(`Cache capacity set to ${newCapacity}`); // Notify on capacity update
    };

    const handleSetCapacity = () => {
        const newCapacity = parseInt(capacity);
        if (!isNaN(newCapacity) && newCapacity > 0) {
            updateCacheCapacity(newCapacity);
        } else {
            toast.error('Please enter a valid capacity greater than 0'); // Show error toast
        }
    };

    const handleSet = () => {
        if (capacity <= 0) {
            toast.error('Please set a valid cache capacity before adding items.'); // Notify if capacity is not set
            return;
        }

        const key = parseInt(keyInput);
        const value = valueInput.trim();

        if (isNaN(key)) {
            toast.error('Please enter a valid number for key'); // Show error toast
            return;
        }

        cache.put(key, value);
        setCacheState([...cache.getCacheState()]);
        setKeyInput('');
        setValueInput('');
        toast.success(`Added: Key: ${key}, Value: ${value}`); // Notify on successful put
    };

    const handleGet = () => {
        if (capacity <= 0) {
            toast.error('Please set a valid cache capacity before fetching items.'); // Notify if capacity is not set
            return;
        }

        const key = parseInt(getInput);
        const value = cache._get(key);
        if (value === -1) {
            toast.error(`Key: ${key} not found in cache`); // Show error toast
        } else {
            toast.info(`Key: ${key}, Value: ${value}`); // Show info toast
        }
        setGetInput(''); // Clear input after getting
        setCacheState([...cache.getCacheState()]);
    };

    return (
        <div className='w-fit mt-10 '>
            <h1 className='text-xl font-bold mb-10 text-center'>Least recently used Cache simulator</h1>
            <div className='flex items-center justify-center gap-4'>
                <input
                    placeholder='Enter the capacity of cache'
                    className='p-2 pl-5 w-[250px] md:w-[400px] lg:w-[500px] rounded-md text-black'
                    type='number'
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                />
                <button onClick={handleSetCapacity} className="p-2 px-4 rounded-md bg-gray-800">Set Capacity</button>
            </div>

            <div className='flex items-center justify-center gap-4 mt-4'>
                <input
                    placeholder='Enter key'
                    className='p-2 pl-5 w-36 rounded-md flex-1 text-black'
                    type='number'
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                />
                <input
                    placeholder='Enter value'
                    className='p-2 pl-5 w-36 rounded-md flex-1 text-black'
                    type='text'
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                />
                <button onClick={handleSet} className="p-2 px-4 rounded-md bg-gray-800">Put</button>
            </div>

            <div className='mt-4 flex gap-4'>
                <input 
                    value={getInput}
                    onChange={(e) => setGetInput(e.target.value)}
                    placeholder='Fetch key'
                    className='p-2 pl-5 w-36 flex-1 rounded-md text-black'
                    type='number'
                />
                <button onClick={handleGet} className="p-2 px-4 rounded-md bg-gray-800">Get</button>
            </div>

            <div className="mt-5 flex flex-col items-center justify-center gap-10">
                <h3 className='bg-white text-black font-semibold rounded-lg px-4 py-2 border border-white'>Cache State</h3>
                {cacheState.length === 0 ? (
                    <div className='bg-orange-600 items-center w-fit justify-center px-5 py-2 rounded-xl'>
                        <p>Umm hmm..... Nothing to show in the cache.. ://</p>
                    </div>
                ) : (
                    <ul className='list-none p-0 flex flex-row gap-4'>
                        {cacheState.map((item, index) => (
                            <li
                                className={`p-3 mx-1 border border-white rounded-lg flex flex-col items-center justify-between  gap-5
                                ${index === 0 ? 'bg-green-600' : index === cacheState.length - 1 ? 'bg-red-600' : 'bg-gray-500'}`}
                                key={item.key}
                            >
                                <div className='flex flex-col'>
                                    <span className='text-white font-semibold'>Key: {item.key}</span>
                                    <span className='text-white font-semibold'>Value: {item.value}</span>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                    {index === 0 && (
                                        <span className='text-black bg-yellow-300 px-2 py-1 rounded-lg font-bold'>
                                            MRU
                                        </span>
                                    )}
                                    {index === cacheState.length - 1 && (
                                        <span className='text-white bg-blue-500 px-2 py-1 rounded-lg font-bold'>
                                            LRU
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <ToastContainer /> {/* Add ToastContainer to render notifications */}
        </div>
    );
}

export default page;
