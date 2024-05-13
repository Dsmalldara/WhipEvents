import { capitalize, formatDateTime } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import Image from "next/image";
import { FiEdit } from "react-icons/fi"
import { FaLocationDot } from "react-icons/fa6";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { DeleteEvent } from '../(root)/Event/DeleteEvent';

 type CardProps = {
    event:any,
    hasOrganized?:boolean,
    hidePrice?:boolean,
 }
async function Card({event,hasOrganized,hidePrice}:CardProps) {
    const {getUser} = getKindeServerSession()
  const user = await getUser()
  console.log(user)
    hasOrganized =  user?.id === event.loggedInUser.id
  return (
            <div>
                <div className="flex group: relative min-h-[300px] w-[20rem] max-w-[400px]  flex-col overflow-hidden  rounded-xl bg-white shadow-md transition-all hover:shadow-lg border  md:min-h-[345px]">
                    <Link href={`/Event/${event._id}`} style={{ backgroundImage:`url(${event.imageUrl}) `}} className=" flex-center flex-grow bg-cover bg-gray-50 bg-center text-grey-500"/>
                       {
                        hasOrganized &&(
                            <div   className="absolute top-1 right-2 bg-white  shadow px-2 py-1 rounded text-2xl flex flex-col gap-3">
                               <div className="flex flex-col gap-3">
                              <Link href={`/Event/${event._id}/update`} className="flex focus:text-green-500 hover:text-green-600"> <FiEdit /></Link>
                                <DeleteEvent eventName={event.title} eventId={event._id}/>
                               </div>

                            </div>
                        )
                       } 
                        <Link href={`/Event/${event._id}`}  className=" flex min-h-[180px] flex-col gap-3 md:gap-5 p-5">
                                <div className="flex gap-2">
                                    <span className="p-semibold-14 w-min px-3 rounded-full py-1 text-green-600 bg-green-100">
                                        {  event.isFree ? 'Free' : `$${event.price}`}
                                    
                                    </span>
                                    <p className="p-medium-16 rounded-full px-3 py-1 w-min bg-grey-500/10 "> {event.category.name}</p>
                                </div>
                            <div>
                                <p className=" mt-2 sm:mt-0  "> {formatDateTime(event.startDate).dateOnly} </p>
                                <p className=" line-clamp-32 text-bold text-black  p-medium-16  flex-1"> {capitalize(event.title)}</p>
                            </div>
                                <div className="flex-between  w-full">
                                   <span className="flex gap-3">
                                   <p className="text-2xl text-slate-700"> <FaLocationDot/> </p> 
                                    <p className="p-medium-16 "> {capitalize(event.location)} </p>
                                   </span>
                                </div>      
                        </Link> 
                
                </div>
            </div>
         )
}

export default Card