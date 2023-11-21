import React from 'react'

export default function Alerta({children}) {
  return (
    <div className='text-center text-sm my-3 bg-red-500 text-white p-3 font-bold uppercase rounded-md'>
        {children}
    </div>
  )
}
