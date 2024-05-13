import React from 'react'
import Image from 'next/image'
function LoadingComponent() {
  return (
    <div className='flex justify-center items-center h-screen bg-[#d3cdcd]'>
           <Image src="/animation.gif" alt="loading" width={100} height={100} />
    </div>
  )
}

export default LoadingComponent;