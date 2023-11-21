import React from 'react'
import useQuiosco from '../hooks/useQuiosco'
import ResumenProducto from './ResumenProducto';
import { FormatearDinero } from '../helpers';
import { useAuth } from '../hooks/useAuth';


export default function Resumen() {

  const {pedido,total,handleSubmitNuevaOrden} = useQuiosco();

  const {logout} = useAuth({}); //pasarle un objeto vacio para q no nos marque un error
  console.log(pedido)

  //devuelve true si no hay pedido y false si tienen pedido
  const comprobarPedido = () => pedido.length === 0;
  console.log( comprobarPedido());

  const handleSubmit = e =>{
    e.preventDefault();
    handleSubmitNuevaOrden(logout); //la hacemos llamar
  }

  return (
    <aside className='w-72 h-screen overflow-y-scroll p-5'>
         <h1 className='text-4xl font-bold text-center'>
            Mi Pedido
         </h1>
         
         <p className='flex  text-lg my-5 p-3 bg-yellow-200 rounded'>

         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
</svg>
<span className='ml-2'>
Aqui podras ver el resumen de tu pedido y los totales
</span>



         </p>

         <div className='py-10'>
              {pedido.length === 0 ? (
                <p className='text-center text-xl'>
                       No hay elementos aún
                </p>
              ) : (
                  
                  pedido.map(producto => (
                    <ResumenProducto 
                    key={producto.id} 
                    producto={producto}
                    />
                  ))
              )}
         </div>
         <p className='text-xl mt-10  p-3 border-t border-solid border-black '>
          Total :{''} {FormatearDinero(total)}
         </p>

         <form 
         className='w-full'
         onSubmit={handleSubmit}
         >
                 <div className='mt-5'>
                     <input
                          type='submit'
                          className={`${comprobarPedido() ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-800'} px-5 
                          py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
                          value='Confirmar Pedido'
                          disabled={comprobarPedido()}
                   />
                     
                 </div>
         </form>
     
    </aside>
  )
}
