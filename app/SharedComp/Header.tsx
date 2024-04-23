import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Navitems from './Navitems'
import MobileNav from './MobileNav'
function Header() {
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
              <Button asChild className=' px-6 rounded-full  shadow' size='default'>
                <Link href='/sign-in' className=' flex font-sans font-bold'>
                Login
                </Link>
                </Button>  
                <MobileNav/>
            </div>
        </div>
    </header>
  )
}
export default Header