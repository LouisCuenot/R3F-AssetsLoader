import { createContext, useContext, useState } from "react"

const HooksContext = createContext()

export const HooksProvider = ({children})=>{

    const [transition, setTransition] = useState(null)   

    return(
        <HooksContext.Provider
            value={{
                transition,
                setTransition
            }}
        >
            {children}
        </HooksContext.Provider>
    )
}

export const useTransition = () => useContext(HooksContext)
