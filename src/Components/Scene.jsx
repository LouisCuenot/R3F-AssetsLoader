import React from 'react'
import { useAssets } from '../AssetsProvider/AssetsProvider'
import { OrbitControls } from '@react-three/drei'

const Scene = () => {

    const { models, textures } = useAssets()

    console.log(textures)

  return (
    <>  
        <OrbitControls/>
        <ambientLight intensity={1} color={0xFFFFFF}/>
        <primitive object={models.model1.scene}/>
        <mesh>
            <planeGeometry args={[10,10]}/>
            <meshBasicMaterial map={textures.texture1}/>
        </mesh>
        
    </>
  )
}

export default Scene