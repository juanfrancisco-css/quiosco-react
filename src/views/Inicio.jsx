import React from 'react'
import useSWR from 'swr'
import clienteAxios from '../config/axios'
//import { productos as data } from '../data/productos' //importando los datos 
import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'
import { Alert, Flex, Spin } from 'antd';




export default function Inicio() {

  const {categoriaActual} = useQuiosco()
 
 /* const fetcher = () => clienteAxios('/api/productos').then(data =>{
    console.log(data)
  })*/
  const token  = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('/api/productos',{
    headers:{
      Authorization:`Bearer ${token}`
  }
  }).then(data => data.data)
  const { data, error, isLoading } = useSWR('/api/productos', fetcher,{
    refreshInterval:1000
  })//ese fetcher es un callback()
   // console.log(productos)
   //return //necesario para limpiar
   console.log(error)
   /*console.log(data)
   console.log(error)
   console.log(isLoading)*/

   //console.log(data.data)
   //if(isLoading) return 'Cargando ...'
   if(isLoading)
   return (
    <Flex gap="small" vertical>
     
      <Spin tip="Loading...">
        <Alert
          message="Espera un momento"
          description="Cargando los productos ..."
          type="info"
        />
      </Spin>
    </Flex>
  );

  
   
  // console.log(hola)

  //filter crea una copia de una parte determinada filtrando 
  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)
  return (
    <>
    <h1 className='text-4xl font-black '>
         {categoriaActual.nombre}
    </h1>
   
    <div className=' mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 '>
             {productos.map(producto =>(
               
                <Producto
                key={producto.id}
                producto={producto}
                botonAgregar={true}
                 />
             ))

             }
    </div>
    </>
   
  )
}
