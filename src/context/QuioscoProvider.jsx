import { createContext,useState,useEffect } from "react" 
//llamamos al state que consta de 3 partes
import { categorias as categoriasDB } from '../data/categorias'
import Categoria from "../components/Categoria";
import { toast } from "react-toastify";
import axios from "axios"; //coger los datos de laravel sustituyendo a categoriasDB
import clienteAxios from "../config/axios";

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) =>{

    /*const hola = ()=>{

    }*/
   // const hola ="Hola Mundo"
   /*
   useState es un hooks que almacena los datos que van a ir cambiando
   */
//             parte 1                              parte 2
    //const [categorias, setCategorias] = useState(categoriasDB);
    const [categorias, setCategorias] = useState([]); //ya que voy a importarla de la api , iniciar con un arr vacio
    //const[categoriaActual, setCategoriaActual]=useState(categorias[0]); //coge por defecto pa posicion 0
    const[categoriaActual, setCategoriaActual]=useState({}); // inicia con un objeto vacio
    const[modal, setModal] = useState(false);
    const[producto, setProducto] = useState({});//son objetos asi que inician como objetos vacio
    const[pedido, setPedido] = useState([]);//son arreglos asi que inician como arreglos vaacio
    const[total, setTotal] = useState(0);//son arreglos asi que inician como arreglos vaacio
    
//    console.log(categoriaActual) //saca el primer objeto que es cafe

   

//      cuando hay un click o u submit se presenta un evento 
    const handleClickCategoria = id =>{
       // console.log(id);
               //me devuelve un array nuevo
               /*
               Array [ {…} ]
​
                        0: Object { icono: "galletas", nombre: "Galletas", id: 6 }
                        ​​
                        icono: "galletas"
                        ​​
                        id: 6
                        ​​
                        nombre: "Galletas"
                        ​​
                        <prototype>: Object { … }
                        ​
                        length: 1
​
<prototype>: Array []
               */
               //convertirlo en un objeto este arreglo añadiendiendo [0] acceder directamente 
               //0: Object { icono: "galletas", nombre: "Galletas", id: 6 }
       const categoria = categorias.filter(categoria => categoria.id === id)[0]//me devuelve un array y accedo a la psocion 0 donde esta el objeto
      // console.log(categoria)
      setCategoriaActual(categoria) //modificar nunca por asignacion
    }
   
//mostrar el modal 
    const handleClickModal = () =>{
        setModal(!modal) //cambia el valor del modal , si esta en false cambia a true y si esta en true cambia a false en automatico
    }

    /*
    creo la funcion que pasa pide por parametro un objeto
    la funcion que hace es actualizar ese objeto con la informacion que tenga ese objeto
    */
    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleAgregarPedido = ({categoria_id,  ...producto}) =>{ //quitar esos elementos del objeto
       // console.log(producto)
/*
        Va a ir agregando 
        Podriamos haber usado .push opero esto me agraga la final y me devuelve la nueva longitud y NUNCA debes de modificar
        el objeto original. 
        De esta manera voy a estar agregando a pedido los productos
*/
      

       if(pedido.some(pedidoState => pedidoState.id === producto.id)){

      /*
      map :
      iterar y devuelve un array sin modificar el original

      si lo identificar retorna producto en caso contrario retorna pedidoState lo q tienes e memoria
                                                                                           true   or false
      */
        const pedidoActualizado=pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
       setPedido(pedidoActualizado)
       toast.success(`Guardado correctamente`) //mensaje
       
}else{

   
    setPedido([... pedido , producto]) //agragar el producto al pedido ir llenando el arreglo
    toast.success(`Agregrado  ${producto.nombre} al pedido`) //mensaje
}
    }


    const handleEditarCantidad = id =>{
       // console.log(id)

       const productoActualizar = pedido.filter(producto => producto.id === id)[0] //me devuelve un arreglo accedo a la posicion 
       /*
       Array [ {…} ]
​
            0: Object { nombre: "Latte Frio con Chocolate Grande", precio: 54.9, id: 4, … }
            ​
            length: 1
            ​
            <prototype>: Array []
       */
      // console.log(productoActualizar)
//ahora tengo un objeto
      setProducto(productoActualizar) 
      setModal(!modal) //cambia el valor del modal , si esta en false cambia a true y si esta en true cambia a false en automatico
    
    }

    const handleEliminarProductoPedido = id =>{

        const pedidoActualizar = pedido.filter(producto => producto.id !== id) 
        //todos los que sean diferentes al id q le estas pasando
        //osea coje todos menos el id que le pasas , al q le estas dando click

        console.log(pedidoActualizar)
        setPedido(pedidoActualizar)
        toast.success('Eliminado del Pedido ')

        
    }


    useEffect(()=>{
 //                                  acumulador  , elemento en el cual esta iterando 
        const nuevoTotal = pedido.reduce( (total , producto) =>
        //                                         primera operacion para calcular el subtotal
                                                  (producto.precio * producto.cantidad) //acumulador
                                                                                    + total,0) //valor de inicio es cero
               setTotal(nuevoTotal)
    },[pedido])
    

    //obtener de la api
   const obtenerCategorias = async () =>{
    const token  = localStorage.getItem('AUTH_TOKEN')
    try{

       // console.log(import.meta.env.VITE_API_URL)
        // const respuesta = await axios(`http://localhost/api/categorias`);
             // const {data} = await axios(`${import.meta.env.VITE_API_URL}/api/categorias`);
             const {data} = await clienteAxios(`/api/categorias`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
             })

             // console.log(data.data)
             setCategorias(data.data)
             setCategoriaActual(data.data[0])//por defecto el cafe 

            

    }catch(error){
        console.log(error);
    }
   }

   //llamarla en automatico la funcion una sola vez 
   //si tuviera un array de dependencia se llama varias veces
   useEffect(()=>{
    obtenerCategorias()
   },[])

   // console.log(producto)

   const handleSubmitNuevaOrden = async (logout) =>{

    const token  = localStorage.getItem('AUTH_TOKEN')

    try{
        //    COMUNICARSE CON PEDIDOS          llamara al method store peticion post
        const {data} =   await clienteAxios.post('/api/pedidos',
           {
            /*
            objeto que vamos a enviar al servidor
            */
           total,
           productos: pedido.map( producto => {
            return {
                id : producto.id,
                cantidad : producto.cantidad
            }
           })

           },{
            //dato en enviar pero el usuario debe de estar auth
            /*
            VAMOS A ENVIAR UNA PETCICION AUTTENTICADA PARA COMUNICARNOS CON 
            NUESTRO BACKEND
            */
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
           })

           toast.success(data.message)//mensaje del pedido
           //cronometro
           setTimeout(() => {
            setPedido([]) //limpiar la bandeja de pedido
           }, 1000);

           //cerra la sesion del usuario

           setTimeout(() => {
            localStorage.removeItem('AUTH_TOKEN');
            logout();
           }, 3000);

    }catch(error){
        console.log(error);
    }
   }

   const handleClickCompletarPedido = async id =>{
   // console.log(id)

   //peticion autenticada pues necesitaremos el token
   const token  = localStorage.getItem('AUTH_TOKEN')
    try{
           //actualizar una orden         //va a llamar al method update del controller 
           await clienteAxios.put(`/api/pedidos/${id}`,null,{
            headers:{
                Authorization:`Bearer ${token}`
            }
           })
           

    }catch(error){
        console.log(error)
    }
   }

   const handleClickProductoAgotado = async id =>{
    // console.log(id)
 
    //peticion autenticada pues necesitaremos el token
    const token  = localStorage.getItem('AUTH_TOKEN')
     try{
            //actualizar una orden         //va a llamar al method update del controller 
            await clienteAxios.put(`/api/productos/${id}`,null,{
             headers:{
                 Authorization:`Bearer ${token}`
             }
            })
            
 
     }catch(error){
         console.log(error)
     }
    }

//hacerla disponible
    return (
                <QuioscoContext.Provider
                        
                value={{
                            // hola parte 3
                            //hacer disponible
                            categorias,
                            categoriaActual,
                            handleClickCategoria,
                            modal,
                            handleClickModal,
                            producto,
                            handleSetProducto,
                            pedido,
                            handleAgregarPedido,
                            handleEditarCantidad,
                            handleEliminarProductoPedido,
                            total,
                            handleSubmitNuevaOrden,
                            handleClickCompletarPedido,
                            handleClickProductoAgotado
                


                }}
                >{children}</QuioscoContext.Provider>
        )
}

export {
    QuioscoProvider
}

export default QuioscoContext