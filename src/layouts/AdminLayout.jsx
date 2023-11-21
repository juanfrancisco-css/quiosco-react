import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import { useAuth } from '../hooks/useAuth'


export default function AdminLayout() {
    /*
    Proteger todas las rutas que se extiendan de este layaout
    */
   useAuth({middleware:'admin'})
  return (
    <>
          <div className="md:flex">
    
      <AdminSidebar />

              <main className="flex-1 h-screen overflow-y-scroll bg-slate-100 p-5">
              <Outlet />
              </main>
      

     
    </div>
    </>
  )
}
