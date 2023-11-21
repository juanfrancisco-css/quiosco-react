//import React from 'react' <--- ya no es necesario
import { Outlet } from "react-router-dom"
import ReactModal from "react-modal"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Sidebar from "../components/Sidebar"
import Resumen from "../components/Resumen"
import useQuiosco from "../hooks/useQuiosco"
import ModalProducto from "../components/ModalProducto"
import { useAuth } from "../hooks/useAuth"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
ReactModal.setAppElement('#root')

export default function Layout() {
//le estoy diciendo que este es auth
  const {user,error} = useAuth({middleware: 'auth'}) //proteger la ruta
  const {modal,handleClickModal} = useQuiosco();
  console.log(modal);

  console.log(user)
  console.log(error)

  return (
    <>
    <div className="md:flex">
      Layout
      <Sidebar />

              <main className="flex-1 h-screen overflow-y-scroll bg-white p-5">
              <Outlet />
              </main>
      

      <Resumen />
    </div>
    {modal && (
      <ReactModal isOpen={modal} style={customStyles}>

        <ModalProducto />
        
      </ReactModal>
    )

    }
       <ToastContainer />
    </>
  )
}
