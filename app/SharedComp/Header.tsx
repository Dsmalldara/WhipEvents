'use server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Navitems from './Navitems'
import MobileNav from './MobileNav'
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
async function Header() {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  console.log(user)
  return (
    <header className="w-full border-b border-b-gray-400 bg-primary-50">
        <div className='wrapper flex items-center justify-between'>
            <Link href='/' className='w-36 antialiased text-purple-800'>
            WhipEvents
            </Link>
            <nav className=' hidden w-full md:flex-between max-w-xs'>
              <Navitems/>
            </nav>
            <div className='w-32 mr-8 flex gap-4 justify-end'>

             {
                user ?  
              <div className=" ml-[-2rem] flex flex-row  gap-2 pr-[2rem]">
                 <img src={user.picture || 'imageUrl'} alt="user picture " className='w-[4rem] h-[3rem] rounded-full' />
                  <Button asChild className=' px-6 rounded-full  shadow' size='sm'>
                  <LogoutLink>Logout</LogoutLink>
                  </Button>
                </div>
                :
                <div className=' flex font-sans font-bold'>
                                        <Button asChild className=' px-6 rounded-full  shadow' size='sm'>
                                        <LoginLink>Login</LoginLink>
                                        </Button>
                                        <Button asChild className=' px-6 rounded-full  shadow' size='sm'>
                                        <RegisterLink>Sign up</RegisterLink>                                      
                                        </Button>  
                                        </div>
                }
                <MobileNav/>
            </div>
        </div>
    </header>
  )
}
export default Header