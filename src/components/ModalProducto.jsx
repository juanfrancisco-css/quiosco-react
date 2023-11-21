import React from 'react'
import { useState,useEffect } from 'react'; //para añadir al carrito para crear
import useQuiosco from '../hooks/useQuiosco' //poder utilizar
import { FormatearDinero } from '../helpers';

export default function ModalProducto() {

    const {modal,handleClickModal,producto,handleAgregarPedido,pedido} = useQuiosco();
    const[cantidad,setCantidad]=useState(1); //valor inicial
    const[cantidadSuperada,setCantidadSuperada]=useState(''); //valor inicial
    const[msjAgragarPedido,setMsjAgragarPedido]=useState(''); //valor inicial
    const[edicion,setEdicion]=useState(false); //valor inicial
/*
filter: 
Este método crea un nuevo array con todos los elementos que pasan una 
prueba implementada por una función proporcionada. 
En resumen, filtra los elementos del array según el criterio establecido 
por la función y devuelve un nuevo array con esos elementos.


some: 
Este método verifica si al menos un elemento en el array cumple con la condición proporcionada por una función. 
Devuelve true si al menos un elemento satisface la condición, de lo contrario, devuelve false.

useEffect -> Siempre va a tener un callback y le puedes asociar  array de dependencias opcional
             Ademas de ser una funcion
             se ejecuta una vez si le pasa un arreglo vacio
             Para cargar funciones , hacerlas llamar en automatico
*/
  useEffect(()=> {
    if(pedido.some(pedidoState => pedidoState.id === producto.id)){

                        console.log('ya esta en el pedido')

                        const productoEdicion=pedido.filter(pedidoState => pedidoState.id === producto.id)[0]
                        setCantidad(productoEdicion.cantidad)

                        setEdicion(true)
    }
    
  },[pedido])
   
    console.log(cantidadSuperada)
    console.log('producto')
    console.log(producto)
    console.log('pedido')
    console.log(pedido)



    //verificar si ese producto ya esta en el pedido
   // const estaEnArray = pedido.find(item => item.id === producto.id );

//console.log(estaEnArray)

//const desabilitarBotonPedido = () => estaEnArray ? " bg-indigo-300 hover:bg-indigo-300  disabled " : "bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
    
  return (
    
    <div className='md:flex gap-10'>
       
      <div className='md:w-1/3'>
      <img
        alt='Imagen del Producto'
        src={`img/${producto.imagen}.jpg`}
        className='w-80'
        />
      </div>

      

      <div className='md:w-2/3'>
        <div class="flex justify-end">

                <button
                type="button"
                onClick={handleClickModal}
                className='items-stretch'
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                </button>
        </div>
       { msjAgragarPedido && (
        <p className='p-3 bg-yellow-200 text-white rounded mt-2'>
        { msjAgragarPedido}
        </p>
       )
                
       }
        

        <h1 className='text-2xl font-bold mt-5'>
            {producto.nombre}
        </h1>

        <p className='mt-5 font-black text-xl text-amber-500'>
              {FormatearDinero(producto.precio)}
        </p>

        <p className='text-red-600 p-2 '>{cantidadSuperada}</p>

        <div className='flex gap-4'>
            <button
            type='button'
            onClick={() => {
                if(cantidad <= 1) return 
                setCantidad(cantidad - 1)
                setCantidadSuperada(' ')
            }}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            </button>
          <p className='text-xl'>{cantidad}</p>
       
          <button
           type='button'
           onClick={() => {
            if(cantidad >= 5){
                let msj='No hay existencias disponibles para pedidos tan grande'
                 setCantidadSuperada(msj)
                return 
            } 
            setCantidad(cantidad + 1)
            
        }}
          >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>

          </button>
        </div>
         {/*
        {estaEnArray ? (
        <p className='text-red-600 mt-3 p-3'>Has añadido este producto ya a tu pedido</p>
       ) : (
        <p></p>
       )}
       */}

 {/*className={`bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded ${desabilitarBotonPedido()}`}*/}
        <button
        type='button'
       
        className={`bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded `}
        onClick={()=>{
         {/* if(!estaEnArray)*/}
                                      {/* Agregar cantidad al principio de ese objeto para retornar un solo elemento */}
          handleAgregarPedido({... producto,cantidad})
    
          setMsjAgragarPedido('Pedido Agregrado')
          handleClickModal()
        }}
        >
          {edicion ? 'Guardar cambios' : ' Añadir al Pedido' }
       
        </button>
       
      
         
      </div>
       
      
        
       
       
    </div>
  )
}
