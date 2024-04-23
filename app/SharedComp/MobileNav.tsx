import React from 'react'
import { IoMdMenu } from "react-icons/io";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Separator } from "@/components/ui/separator"
import Navitems from './Navitems';

function MobileNav() {
  return (
    <nav className=' text md:hidden'>
        <Sheet >
  <SheetTrigger className='align-middle mt-2'>
    <IoMdMenu className='text-2xl '/>
  </SheetTrigger>
  <SheetContent className='flex flex-col gap-6   bg-primary-50 md:hidden'>
   <div>
    <h1 className=''>
        whipEvents
    </h1>
    </div> 
    <Separator/>
    <Navitems/>
  </SheetContent>
</Sheet>

    </nav>
  )
}

export default MobileNav