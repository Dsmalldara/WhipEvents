import React from 'react'
import Link from 'next/link'
function Footer() {
  return (
    <footer className=' flex border-t-2 '>
      <div className='wrapper flex-between flex flex-col gap-4  p-5 text-center sm:flex-row'>
       <Link href='/'>
       <h1>
          WhipEvents
        </h1>
        </Link>
        <p>
           &copy; 2024 WhipEvents. All rights reserved
          </p>
      </div>
    </footer>
  )
}

export default Footer