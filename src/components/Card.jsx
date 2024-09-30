"use client"
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link';

function Card({ name, desc }) {
    return (
        <div
            className='flex flex-col items-start justify-between gap-4 w-96 border border-gray-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out min-h-48 max-h-48 relative overflow-hidden'
            style={{
                backgroundImage: `url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')`,
                backgroundSize: 'cover'
            }}
        >
            <div className='absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-gray-200/80 pointer-events-none'></div>

            <div className='flex flex-col gap-3 relative z-10'>
                <h2 className='font-bold text-2xl text-gray-800'>{name}</h2>
                <p className='text-gray-600 font-semibold line-clamp-2 overflow-hidden'>
                    {desc}
                </p>
            </div>

            <div className='flex gap-4 relative z-10'>
                <Link href={"/Dijkstra"}>
                    <Button className="bg-white border border-black text-black hover:bg-gray-100 transition duration-200">About</Button>
                </Link>
                <Link href={"/Dijkstra"}>
                    <Button className="bg-black text-white border border-gray-800 hover:bg-gray-800 transition duration-200">View</Button>
                </Link>
            </div>
        </div>
    )
}

export default Card;
