import React from 'react'
import Link from 'next/link'
function Footer() {
  return (
    <footer className=' flex border-t-2  py-[1rem] bg-primary-footer px-4 '>
      <div className='wrapper flex-between flex flex-col gap-4  p-5 text-center sm:flex-row'>
       <Link href='/'>
       <h3 className="  p-medium-24 footer-font  text-purple-800">
          WhipEvents
        </h3>
        </Link>
        <p>
           &copy; 2024 WhipEvents. All rights reserved
          </p>
      </div>
    </footer>
  )
}

export default Footer