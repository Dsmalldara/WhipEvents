'use server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Navitems from './Navitems'
import MobileNav from './MobileNav'
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
async function Header() {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  return (
    <header className="w-full border-b border-b-gray-400 bg-primary-50 shadow-md">
        <div className='wrapper flex items-center justify-between'>
            <Link href='/' className='w-36 antialiased text-purple-800 md:px-4 footer-font'>
            WhipEvents
            </Link>
            <nav className=' hidden w-full md:flex-between max-w-xs md:pr-4'>
              <Navitems/>
            </nav>
            <div className='w-32 mr-4   flex gap-4 justify-end'>

           <div>
           {
                user ?  
              <div className=" ml-[-2rem] flex flex-row  gap-2 pr-[2rem]">
                 <img src={user.picture || "https://avatar.vercel.sh/rauchg"} alt="user picture " className='w-[4rem] h-[3rem] rounded-full' />
                  <Button asChild className=' px-6 rounded-full  shadow' size='sm'>
                  <LogoutLink>Logout</LogoutLink>
                  </Button>
                </div>
                :
                <div className=' flex font-sans font-bold'>
                                        <Button asChild className=' md:px-6 px-3 rounded-full mr-2 shadow' size='sm'>
                                        <LoginLink>Login</LoginLink>
                                        </Button>
                                        <Button asChild className=' md:px-6 px-3 rounded-full  shadow' size='sm'>
                                        <RegisterLink>Sign up</RegisterLink>                                      
                                        </Button> 
                                       
                                        </div>
                }

           </div>
                <MobileNav/>
            </div>
        </div>
    </header>
  )
}
export default Header