import React, { createContext, useContext, useState } from 'react'

const AssetsContext = createContext()

export const AssetsProvider = ({children}) => {

    const [assets, setAssets] = useState({
        textures:{},
        models:{}
    })


  return (
    <AssetsContext.Provider value={{
        assets,
        setAssets
    }}
    >
        {children}
    </AssetsContext.Provider>
  )
}

export const useAssets = () => useContext(AssetsContext).assets
export const useSetAssets = () => useContext(AssetsContext).setAssets