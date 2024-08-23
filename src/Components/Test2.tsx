import { useFrame } from '@react-three/fiber'
import React, { useRef, forwardRef, useImperativeHandle, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mesh } from 'three'
import { useScenes } from './World'
import { useSceneParams } from './Scene/Scene'





const Test2 = () => {

  const {currentScene, navigateTo} = useScenes()
  const {scrollToSubScene} = useSceneParams()


  

  



const tRef = useRef<Mesh>(null)

  useFrame(()=>{
    if(tRef.current){
      tRef.current.rotation.x += 0.01
      tRef.current.rotation.z += 0.001
    }
  })

    return (
        <mesh
        ref={tRef}
        onClick={()=>{
          scrollToSubScene(0)
        }}
        position-x={2.5}
        >
            <latheGeometry  />
            <meshNormalMaterial />
        </mesh>
    )
}

export default Test2
