"use server";
import { DropdownMenu,  DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent} from '@/components/ui/dropdown-menu'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import Navitems from "./Navitems";
import MobileNav from "./MobileNav";
import Image from 'next/image';
import { MenuIcon } from 'lucide-react'
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
async function Header() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <header className="w-full border-b border-b-gray-400 bg-primary-50 shadow-md">
      <div className="wrapper flex items-center justify-between">
        <Link
          href="/"
          className="w-36 antialiased text-purple-800 md:px-4 footer-font"
        >
          WhipEvents
        </Link>
        <nav className=" hidden w-full md:flex-between max-w-xs md:pr-4">
          <Navitems />
        </nav>
        <div className="w-32 mr-4   flex gap-4 justify-end">
          <div>
            {user ? (
              <div className=" ml-[-2rem] flex flex-row  gap-2 pr-[2rem]">
               
                  <DropdownMenu>
    <DropdownMenuTrigger className='flex outline-none  border rounded-full md:px-2 md:py-1  gap-1'>
    <MenuIcon className='mx-auto my-auto md:block hidden'/>
    <Avatar>
                  <AvatarImage src={user.picture || undefined} />
                  <AvatarFallback> <Image src="/defaultUser.jpeg" alt='default image'  width={40} height={40}/></AvatarFallback>
                </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="md:mr-4">
        <DropdownMenuItem >
        <LogoutLink>Logout</LogoutLink>
        </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
              </div>
            ) : (
              <div className=" flex font-sans font-bold">
              
                    <DropdownMenu>
    <DropdownMenuTrigger className='flex outline-none    border rounded-full md:px-2 md:py-1   gap-1'>
    <MenuIcon className='mx-auto my-auto md:block hidden'/>
   <Image src="/defaultUser.jpeg" alt='default image' className='rounded-full' width={40} height={40}/>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="md:mr-4">
       <DropdownMenuItem>
        <RegisterLink>Register</RegisterLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
        <LoginLink>Login</LoginLink>
        </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
              </div>
            )}
          </div>
         <div className="mr-4  md:mr-0">
         <MobileNav />
         </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
