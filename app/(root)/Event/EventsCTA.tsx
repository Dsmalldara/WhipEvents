import React from 'react'
import Image from "next/image";
import AccordionEvent from '@/components/AccordionEvent';
function EventsCTA() {
  return (
    <section className="wrapper md:py-10 py-5   bg-primary-50">
           <div className="grid px-10  md:gap-12 gap-8 md:grid-cols-2 grid-rows-[auto_auto]">
            <div>
                <img src="/createevent.png" className="h-[30rem] w-[33rem] md:w-[30rem]" alt="get tickets on whipevents"/>
            </div>
            <div className='md-[w-80%]'>
                <h3 className="md:text-[1.5rem]  text-[1rem] capitalize text-balance font-semibold text-amber-950">
                NO HIDDEN FEES OR SETUP CHARGES
                    </h3>
                <h1 className="md:h2-medium mt-6 font-bold md:font-normal text-balance">
                Access All Ticketing Features at No Cost
                </h1>
                <p className="md:text-[1.2rem] text-[0.95rem] leading-8 font-[100] mt-4 md:mt-8">
                WhipEvents lets you effortlessly create your box office and events,
                 offering a wealth of features at no cost. Free ticket events incur no fees, and for paid tickets,
                  fees can be seamlessly transferred to buyers.
                 Whether your event is small or large, free or paid, you’ll receive exceptional customer support.
                </p>
                <p className='pt-7 text-xl font-bold md:text-start text-center'>
                    Create your event
                </p>
            </div>
           </div>
           <AccordionEvent/>
    </section>
  )
}

export default EventsCTA