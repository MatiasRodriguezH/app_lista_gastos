import React, {useState, useEffect, useContext} from "react";
import UseObtenerGastosDelMes from "../hooks/useObtenerGastosDelMes";

const TotalGastadoContext = React.createContext();

const useTotalDelMes = () => useContext(TotalGastadoContext)

const TotalGastadoProvider = ({children}) => {
    const [total, cambiarTotal] = useState(7);
    const gastos = UseObtenerGastosDelMes();

    useEffect (() => {
        let acumulado = 0;
        gastos.forEach((gasto) => {
            acumulado += Number(gasto.cantidad);
        })
        cambiarTotal(acumulado);
    }, [gastos])

    return(
        <TotalGastadoContext.Provider value={{total: total}}>
            {children}
        </TotalGastadoContext.Provider>
    )
}

export {TotalGastadoProvider, useTotalDelMes};