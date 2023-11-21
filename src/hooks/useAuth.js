import { useEffect } from "react"
import useSWR from "swr"
import { useNavigate } from "react-router-dom"
import clienteAxios from "../config/axios"

export const useAuth = ({middleware , url}) => {

    const token  = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate();
//llamar en automatico a ese clienteAxios si tuviera { } pues no lo haria
    const {data:user,error,mutate} = useSWR('/api/user', ()=>
        clienteAxios('/api/user',{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    const login = async (datos, setErrores) =>{

        try{
              /*
        Cuando es una peticion tipo post el segundo parametro es el objeto con la informacion 
       
        */
                                             //ruta de la api de larave l
           const {data} = await clienteAxios.post('/api/login',datos)
            
           
           localStorage.setItem('AUTH_TOKEN',data.token)
           setErrores([])//limpiar los erroes , inicializar como un arreglo vacio
           await mutate()//revisa o revalida esa funcion
            
          }catch(error){
        
           setErrores(Object.values(error.response.data.errors))
        
          }
    }

    const registro = async( datos , setErrores) =>{
        
        try{

          
           const {data} = await clienteAxios.post('/api/registro',datos)
           localStorage.setItem('AUTH_TOKEN',data.token)
           setErrores([])//limpiar los erroes , inicializar como un arreglo vacio
           await mutate()//revisa o revalida esa funcion
            
           
            
          }catch(error){
        
          
        
           setErrores(Object.values(error.response.data.errors))
        
          }
    }

    const logout = async () =>{
        
       // console.log('Desde logout')
       try{
        /*
        Cuando es una peticion tipo post el segundo parametro es el objeto con la informacion 
        pero en este caso 
        */
                                             //null
        await clienteAxios.post('/api/logout',{},{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        //remover ese token
        localStorage.removeItem('AUTH_TOKEN');
        await mutate(undefined)//forzar a cambiar ese valor a undefined 
        //ese SWR cachea por eso hacemos eso

       }catch(error){

        throw Error(error?.response?.data?.errors)
       }
    }

    console.log(user)
    console.log(error)

    useEffect(()=>{

        if(middleware ==='guest' && url && user){
                  navigate(url)
        }
        if(middleware ==='guest' && user && user.admin){
            navigate('/admin')
        }
        if(middleware ==='admin' && user && !user.admin){
            navigate('/')
        }
        if(middleware === 'auth' && error){ //el usuario no ha iniciado sesion cuando esta el panel de productos
               navigate('/auth/login') //enviar al usuario 
        }

    },[user,error])//va a estar escuchando 

    console.log(middleware)

    return {
        login,
        registro,
        logout,
        user,
        error
    }
}
//export default useAuth
