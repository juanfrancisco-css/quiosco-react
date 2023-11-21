import React from 'react'
import useQuiosco from '../hooks/useQuiosco'

export default function Categoria({categoria}) {
   
   // const {categoriaActual} = useQuiosco(); //para acceder
    const {handleClickCategoria,categoriaActual} = useQuiosco();//para acceder
    const{icono,id,nombre} = categoria
/*
         Si no quieres tener el codigo en el css 
         const resaltarCategoriaActual = () => categoriaActual.id === id ? "bg-amber-400" : "bg-white"

         y llamarla en la className de esta manera 
         {`${resaltarCategoriaActual()} ...`}
*/

  return (
    <div className={`${categoriaActual.id === id ? "bg-amber-400" : "bg-white"} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
        <img 
        src={`/img/icono_${icono}.svg`}
        alt="imagen icono"
        className='w-10'
        />
        <button 
        className='text-lg font-bold cursor-pointer truncate'
        type="button"
        onClick={() => handleClickCategoria(id)}
        >
            {nombre}
        </button>
    </div>
  )
}
