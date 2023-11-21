import { useContext } from "react";
import QuioscoContext, { QuioscoProvider } from "../context/QuioscoProvider";

const useQuiosco = () =>{
    return useContext(QuioscoContext)
}

export default useQuiosco