import React from 'react'

import { createRef,useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  
  const [errores,setErrores] = useState([]);
  const {registro} = useAuth({middleware: 'guest', url:'/'})

  const handleSubmit = async e =>{
    e.preventDefault();

   // console.log(nameRef)
  // console.log(nameRef.current.value)
  //enviar a laravel
  const datos ={
         name: nameRef.current.value,
         email: emailRef.current.value,
         password: passwordRef.current.value,
         password_confirmation: passwordConfirmationRef.current.value
  }

  //obtenemos un objeto
  console.log(datos)
registro(datos,setErrores)
  
/*
                             CORTARLO Y SUSTITUIRLO POR LA FUNCION REGISTRO
  try{

    //const respuesta = await clienteAxios.post('/api/registro',datos)
    
   // console.log(respuesta) //ruta de la api de laravel
   const {data} = await clienteAxios.post('/api/registro',datos)
    
   console.log(data)
    console.log(data.token)

    
  }catch(error){

   // console.log(error.response.data.errors)
   console.log(Object.values(error.response.data.errors))

   setErrores(Object.values(error.response.data.errors))

  }
  */
  }

  return (
    <>
       <h1 className='text-4xl font-black'>
        Crea tu Cuenta
       </h1>
       <p>
        Crea tu cuenta llenando el formulario
       </p>

       <div className='bg-white shadow-md rounded-md mt-10 px-5 py-10'>
             <form
             onSubmit={handleSubmit}
             noValidate
             >
              

              
              { errores ? errores.map((error,i) => 
           
              <Alerta key={i}>{error}</Alerta>
             
              ) 
              
              : null
              }
             
                <div className='mb-4'>
                    <label 
                    className='text-slate-800'
                     htmlFor='name'
                    >
                    Nombre
                    </label>
                    <input 
                    type="text" 
                    id="name"
                    className='mt-2  w-full block p-3 bg-gray-50'
                    placeholder='Tu Nombre'
                    ref={nameRef}
                    />
                </div>
                <div className='mb-4'>
                    <label 
                    className='text-slate-800'
                     htmlFor='email'
                    >
                    Email
                    </label>
                    <input 
                    type="text" 
                    id="email"
                    className='mt-2  w-full block p-3 bg-gray-50'
                    placeholder='Tu Email'
                    ref={emailRef}
                    />
                </div>
                <div className='mb-4'>
                    <label 
                    className='text-slate-800'
                     htmlFor='password'
                    >
                    Password
                    </label>
                    <input 
                    type="password" 
                    id="password"
                    className='mt-2  w-full block p-3 bg-gray-50'
                    placeholder='Tu Password'
                    ref={passwordRef}
                    />
                </div>
                <div className='mb-4'>
                    <label 
                    className='text-slate-800'
                     htmlFor='password_confirmation'
                    >
                  Repetir Password
                    </label>
                    <input 
                    type="password" 
                    id="password_confirmation"
                    className='mt-2  w-full block p-3 bg-gray-50'
                    placeholder='Repetir Password'
                    ref={passwordConfirmationRef}
                    />
                </div>
                <input 
                type="submit"
                value="Crear Cuenta"
                className=' bg-indigo-600 hover:bg-indigo-800 text-white  w-full p-3 mt-5 cursor-pointer uppercase rounded-md'
                />
             </form>
       </div>
       <nav className='mt-5 text-center'>
            <Link to='/auth/login'>
                ¿Ya tienes cuenta? Inicia Sesión.
            </Link>
    </nav>
    </>
  )
}
