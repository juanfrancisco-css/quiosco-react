import React from 'react'
import { createRef,useState } from 'react'
import { Link } from 'react-router-dom'
//import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';


export default function Login() {

 
  const emailRef = createRef();
  const passwordRef = createRef();
  
  
  const [errores,setErrores] = useState([]);
  const {login} = useAuth({
    middleware:'guest',
    url:'/'
  })

  const handleSubmit = async e =>{
    e.preventDefault();

   // console.log(nameRef)
  // console.log(nameRef.current.value)
  //enviar a laravel
  const datos ={
        
         email: emailRef.current.value,
         password: passwordRef.current.value,
        
  }

  login(datos,setErrores)
  //obtenemos un objeto
  //console.log(datos)

/*
                         CORTARLO Y PEGARLO EN EL HOOKS DE AUTH LOGIN
  try{

    //const respuesta = await clienteAxios.post('/api/registro',datos)
    
   // console.log(respuesta)           //ruta de la api de laravel
   const {data} = await clienteAxios.post('/api/login',datos)
    
   // console.log(data.token)
   localStorage.setItem('AUTH_TOKEN',data.token)
   setErrores([])//limpiar los erroes , inicializar como un arreglo vacio
    
  }catch(error){

   // console.log(error)
   // console.log(error.response.data.errors)
   //console.log(Object.values(error.response.data.errors))

   setErrores(Object.values(error.response.data.errors))

  }
  */
  }

  return (
    <>
    <h1 className='text-4xl font-black'>
     Iniciar Sesión
    </h1>
    <p>
    Para crear un pedido debes de iniciar sesión.
    </p>

    <div className='bg-white shadow-md rounded-md mt-10 px-5 py-10'>
          <form
          onSubmit={handleSubmit}
          noValidate
          >

{ errores ? errores.map((error,i) =>  <Alerta key={i}>{error}</Alerta>):null}
             
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
            
             <input 
             type="submit"
             value="Iniciar Sesión"
             className=' bg-indigo-600 hover:bg-indigo-800 text-white  w-full p-3 mt-5 cursor-pointer uppercase rounded-md'
             />
          </form>
    </div>

    <nav className='mt-5 text-center'>
            <Link to='/auth/registro'>
                ¿No tienes cuenta? Haz click aqui para crear una.
            </Link>
    </nav>
 </>
  )
}
