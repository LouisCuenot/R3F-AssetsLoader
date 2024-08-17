
import { createContext, useContext, useState } from "react"

const HooksContext = createContext()

export const HooksProvider = ({children, sLenisSize, lenisSize})=>{

   

    const useResizeScroll = (f) => {
        sLenisSize(f)
    }
    

    return(
        <HooksContext.Provider
            value={{
                lenisSize,
                useResizeScroll
            }}
        >
            {children}
        </HooksContext.Provider>
    )
}

export const useCustomHooks = () => useContext(HooksContext)
