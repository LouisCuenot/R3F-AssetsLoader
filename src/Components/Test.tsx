import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mesh } from 'three'
import { useTransition } from '../HooksProvider/HooksProvider'


const Test = () => {

  const navigate = useNavigate()

  const {setTransition} = useTransition()

  

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
      position-z={0}
      onClick={()=>{
        setTransition({
          url:'/',
          duration:3000
        })
      }}
    >
      <boxGeometry />
      <meshBasicMaterial color={0xFF0000} />
    </mesh>
  )
}

export default Test