import React from 'react'
import { useAssets } from '../AssetsProvider/AssetsProvider'
import { OrbitControls } from '@react-three/drei'

const Scene = () => {

    const { models } = useAssets()

  return (
    <>  
        <OrbitControls/>
        <ambientLight intensity={1} color={0xFFFFFF}/>
        <primitive object={models.model1.scene}/>
    </>
  )
}

export default Scene