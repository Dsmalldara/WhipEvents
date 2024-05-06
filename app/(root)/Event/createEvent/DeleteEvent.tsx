'use client'
import React, {useTransition } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { MdDelete } from "react-icons/md";
import { deleteEvent } from '@/app/api/event.actions';
import { usePathname } from 'next/navigation';
  
  export    function DeleteEvent({eventId, eventName}:any) {
    const pathname = usePathname()
    let [isPending, startTransition] = useTransition()
    return (
      <AlertDialog > 
        <AlertDialogTrigger className="p-medium-14 flex  focus:text-red-700 hover:text-red-700">
        <span className="text-2xl "> <MdDelete/></span>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              you're trying to delete <span className="p-bold-16 text-red-600"> {' '}{eventName} {' '} </span>  event. This will permanently delete your
             event and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='bg-red-500 focus:bg-red-500 hover:bg-red-700' 
            onClick={()=>{
                startTransition(async()=>{
                 await   deleteEvent({eventId, path:pathname})
                
                })
            }}
            // deleteEvent is a promise returned by deleteEvent function 
            >{isPending ? 'deleting...' :'delete'}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  