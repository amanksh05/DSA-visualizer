import Card from '@/components/Card'
import React from 'react'

function page() {
  const list = [
    {
      "name": "Dijkstra",
      "desc": "Shortest path finder from source to node",
      "link": "/Dijkstra"
    },
    {
      "name": "Least recently used",
      "desc": "Operating system concept",
      "link": "/least-recently-used"
    },
  ]

  return (
    <div className="grid grid-flow-col gap-5 mt-10">
      {
        list.map((item, key) => (
          <Card key={key} name={item.name} desc={item.desc} link={item.link} />
        ))
      }
    </div>
  )
}

export default page;
