import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

export default function AdminSidebar() {

    const {logout,user} = useAuth({middleware:'auth'}); //debemos de estar autenticado para entrar en esta parte
  return (
    <aside className='md:w-72 h-screen'>
       
       <div className='p-4'>
             <img 
                 src='/img/logo.svg'
                 alt='imagen logotipo'
                 className='w-40'
            />

       </div>
       <nav className='flex flex-col p-4 '>
            <Link  to="/admin"  className='text-center bg-indigo-600 w-full p-3 font-bold text-white truncate visited:bg-indigo-500'>Ordenes</Link>
            <Link  to="/admin/productos" className='text-center bg-indigo-600 w-full p-3 font-bold text-white truncate mt-1 visited:bg-indigo-500'>Productos</Link>
       </nav>

      <div className='my-1 px-5'>
      <button
            type='button'
            className='text-center bg-red-500 w-full p-3 font-bold text-white truncate'
            onClick={logout}
            >
                Cerrar Sesión
            </button>

      </div>

    </aside>
  )
}
