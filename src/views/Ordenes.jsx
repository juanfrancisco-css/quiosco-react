import React from 'react'
import useSWR from 'swr'
import clienteAxios from '../config/axios'
import { FormatearDinero } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';

export default function Ordenes() {

    const token = localStorage.getItem('AUTH_TOKEN');

    const fetcher = () => clienteAxios('api/pedidos',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    const {data,error,isLoading} = useSWR('/api/pedidos',fetcher,{ refreshInterval:1000})
    console.log(data?.data)
    console.log(error)
    console.log(isLoading)

    const {handleClickCompletarPedido} = useQuiosco();

    if(isLoading) return 'Cargando ..'
  return (
    <div>
        <h1 className='text-4xl font-black'>Ordenes</h1>
         <p className='text-2xl my-10'>
            Administra las ordenes desde aqui.
        </p>

        <div className='grid grid-cols-2 gap-5'>
          {data.data.data.map(pedido =>(
            <div key={pedido.id} className='p-5 bg-white  shadow-lg space-y-2 border-b'>
              <p className='text-xl font-bold text-slate-600'>
                Orden del pedido numero  { pedido.id}:
              </p>
              {pedido.productos.map(producto => (
                <div key={producto.id} className=' border-b border-b-slate-200 last-of-type:border-none py-4'>
                   {/*
                   <p className='text-sm'>
                      ID: {producto.id}
                   </p>
                   */}
                   <p className=''>
                       {producto.nombre}
                   </p>
                   <p className=''>
                       Cantidad :{' '} <span className='font-bold'>{producto.pivot.cantidad}</span>
                   </p>
               </div>
              ))}
              <p className='text-lg '>
                Cliente: {' '}
                <span className='font-bold'>{pedido.user.name}</span>
              </p>
              <p className='text-lg font-bold text-amber-600 text-center'>
                Total a pagar : {' '}
                <span className='font-bold'>{FormatearDinero(pedido.total)}</span>
              </p>
              <button
                          type='button'
                          className= 'bg-indigo-600 hover:bg-indigo-800px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer'
                         onClick={()=>handleClickCompletarPedido(pedido.id)}
              
              >
             Acceptar Pedido
            </button>
            </div>
          ))}
        </div>
    </div>
  )
}
