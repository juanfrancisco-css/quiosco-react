import React from 'react'
import useSWR from 'swr'
import clienteAxios from '../config/axios'
import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'
import Categoria from '../components/Categoria'

export default function Productos() {

  const token  = localStorage.getItem('AUTH_TOKEN')
  /*
  cualquier peticion debera de estar autenticado
  */
 ////////////////////////////////////////////////////////////
 const {categorias,categoriaActual} = useQuiosco(); //para acceder
 
 /////////////////////////////////////////////////////////////

  const fetcher = ()=> clienteAxios('/api/productos',{
    headers:{
      Authorization:`Bearer ${token}`
  }
  }).then(datos=>datos.data)

  const {data,error,isLoading} = useSWR('/api/productos',fetcher,{ refreshInterval:1000})

  console.log(error)
  if(isLoading) return 'cargando ..'

  console.log(data.data)
  ///////////////////////////////////////////////////////////
  const productosFiltrado = data.data.filter(producto => producto.categoria_id === categoriaActual.id)
  /////////////////////////////////////////////////////
  return (
    <div>
        
        <h1 className='text-4xl font-black'>Productos</h1>
         <p className='text-2xl my-10'>
            Maneja la disponibilidad desde aqui.
        </p>
        {/*    //////////////////////////////////////////////////////////////////////////          */}
        <h1 className='text-4xl font-black '>
         {categoriaActual.nombre}
    </h1>
        <div className='mt-10'>
            
            {categorias.map( categoria => (
               <Categoria
               key={categoria.id} 
               categoria={categoria}
               />
            ))}
        </div>
         {/*    //////////////////////////////////////////////////////////////////////////          */}
      
        <div className=' mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 '>
             {productosFiltrado.map(producto =>(
               
                <Producto
                key={producto.id}
                producto={producto}
                botonDisponible={true}
                 />
             ))

             }
    </div>
    </div>
  )
}
