import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mesh } from 'three'

import { useScenes } from './World'


const Test = () => {

  const {navigateTo} = useScenes()

  

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
        navigateTo({
          targetPage:{
            url:'/',
            id:1
          },
          duration:1000,
        })
      }}
    >
      <boxGeometry />
      <meshBasicMaterial color={0xFF0000} />
    </mesh>
  )
}

export default Test