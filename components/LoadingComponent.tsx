import React from 'react'

function LoadingComponent() {
  return (
    <div className='mx-auto justify-between items-center w-36 flex flex-row '>
           <p> submitting </p>
           <span className='w-[1.6rem]  h-[1.6rem] rounded-full border-2 border-blue-800 border-b-2 border-b-slate-200  animate-spin'></span>
    </div>
  )
}

export default LoadingComponent