import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

function Collapsible({title, subs, btnT = "Click me"}) {
    return (
        <Accordion type="multiple" collapsible className='min-w-96 bg-zinc-900'>
            <AccordionItem value="item-1" className= "px-3 rounded-lg">
                <AccordionTrigger className="text-xl font-semibold ">{title}</AccordionTrigger>
                <AccordionContent className="flex flex-col items-start font-mono  text-lg gap-2">
                    {subs}
                    <button className='p-2 px-4 transition-all bg-blue-500  text-white rounded-md hover:bg-blue-700 font-sans '>{btnT}</button>
                </AccordionContent>
            </AccordionItem>
        </Accordion>

    )
}

export default Collapsible