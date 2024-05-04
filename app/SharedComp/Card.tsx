import Link from 'next/link'
import React from 'react'
 type CardProps = {
    event:any,
    hasOrganized?:boolean,
    hidePrice?:boolean,
 }
function Card({event,hasOrganized,hidePrice}:CardProps) {
  return (
    <div>
        <div className="flex group: relative min-h-[280px] w-[20rem] max-w-[400px]  flex-col overflow-hidden  rounded-xl bg-white shadow-md transition-all hover:shadow-lg border  md:min-h-[338px]">
             <Link href={`/Event/${event._id}`}
            style={{ backgroundImage:`url(${event.imageUrl}) `}}
            className=" flex-center flex-grow bg-cover bg-gray-50 bg-center text-grey-500">
                    {/* {
                       <div  className=" flex min-h-[200px] flex-col gap-3 md:gap-5 ">
                        <div className="flex gap-2">
                            <span>
                                {  event.isFree ? 'Free' : `$${event.price}`}
                            
                            </span>
                        </div>
                        </div>   
                    } */}
            </Link>
     
          
        </div>
    </div>
  )
}

export default Card