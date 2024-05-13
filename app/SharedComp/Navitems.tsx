'use client'
import { headerLink } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function Navitems() {
  const pathname = usePathname()

  return (
      <ul className='flex md:flex-between w-full md:flex-row flex-col gap-8 md:gap-12 items-start'>
      {
        headerLink.map((link,header)=>{
          const isActive = pathname === link.href
          return(
            <li key={header} className={`${isActive && 'text-primary-500'} flex-center  p-medium-16 whitespace-nowrap `}>
              <Link 
              href={link.href} >
              {link.title}
              </Link>
            </li>
          )
        })
      }
      </ul>
  )
}

export default Navitems