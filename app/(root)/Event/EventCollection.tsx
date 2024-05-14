import Card from '@/app/SharedComp/Card'
import { fetchAllEvents } from '@/app/api/event.actions'
import React from 'react'
type EventCollectionType  = {
    data: any[],
    emptyTitle: string,
    emptyStateSummary: string,
    eventCollectionType: 'eventCollection' | 'My_tickets' | 'All_events'
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?:string
}
async function EventCollection({data,emptyTitle,emptyStateSummary,eventCollectionType,page,totalPages,urlParamName}:EventCollectionType) {
  
    return (
   <section>
    {
        data.length > 0 ? (
           <div className='flex flex-col items-center gap-10'>
           <ul className='grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
           {
            data.map((event)=>{
                const hasOrganized = eventCollectionType === 'All_events'
                const hidePrice =  eventCollectionType === 'My_tickets'
                return (
                    <li key={event._id} className='flex justify-center'>
                        <Card event={event} hasOrganized={hasOrganized} hidePrice={hidePrice}/>
                    </li>
                )
            })
           }
           </ul>
           </div>
        )
        : (
            <div className='flex flex-col bg-primary-50 not-found items-center justify-between  px-[2rem] py-[8rem] rounded antialiased  shadow-md headerp md:w-[95%] mx-auto' >
                <h3 className='h3-medium'>{emptyTitle}</h3>
                <p className='p-regular-24 footer-font'>{emptyStateSummary}</p>
            </div>
        )
    }
   </section>
  )
}

export default EventCollection