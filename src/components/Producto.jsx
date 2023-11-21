import React from 'react'
import { FormatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'


export default function Producto({producto, botonAgregar = false , botonDisponible = false}) {
    const {nombre,precio,imagen,categoria,id} = producto
    const {handleClickModal,handleSetProducto,handleClickProductoAgotado} =useQuiosco();

    //console.log(nombre + precio)
    
  return (
    <div className='border p-2 shadow bg-white'>
    <div className=" transition-transform transform hover:scale-110">
          <img
          alt="Imagen Producto"
          className='w-full'
          src={`/img/${imagen}.jpg`}
          />
    </div>
          <div className='p-5'>
              <h3 className='text-1xl font-bold text-center truncate'>
                {nombre}
              </h3>
              <p className='mt-5 font-black text-md text-left text-amber-500'>
                {FormatearDinero(precio)}
              </p>

{botonAgregar && (
              <button
              type="button"
              className='bg-indigo-600 hover:bg-indigo-800 text-white  w-full cursor-pointer mt-5 p-3 uppercase font-bold'
              onClick={()=>{
                handleClickModal();
                handleSetProducto(producto);
              }}
              >
                Agregar
              </button>
  )}
  { botonDisponible && (
              <button
              type="button"
              className='bg-indigo-600 hover:bg-indigo-800 text-white  w-full cursor-pointer mt-5 p-3 uppercase font-bold'
              onClick={()=>handleClickProductoAgotado(producto.id)}
              >
                Producto Agotado
              </button>
  )}

          </div>
    </div>

  )
}
