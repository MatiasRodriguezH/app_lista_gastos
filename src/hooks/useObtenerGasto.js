import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const useObtenerGasto = (id) => {
    const navigate = useNavigate();
    const [gasto, establecerGasto] = useState("");
    
    useEffect(() => {
        const obtenerGasto = async () => {
            const documento = await getDoc(doc(db, "gastos", id));

            if(documento.exists()){
                establecerGasto(documento);
            } else {
                navigate("/lista");
            };
        }

        obtenerGasto();
    }, [navigate, id])

    return [gasto];
}
 
export default useObtenerGasto;