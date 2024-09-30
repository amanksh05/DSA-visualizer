import Card from '@/components/Card'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <Card name={"Dijkstra"}desc={"lorem ipsum "}/>
      {/* <Link href={"/Dijkstra"}>Dijkstra</Link>
      <Link href={"/least-recently-used"}>LRU</Link> */}

    </div>
    
  )
}

export default page