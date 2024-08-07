import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mesh } from 'three'
import { useTransition } from '../HooksProvider/HooksProvider'


const Test2 = () => {

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
        onClick={()=>{
          setTransition({
            url:'/t',
            duration:1000
          })
        }}
        >
            <latheGeometry  />
            <meshNormalMaterial />
        </mesh>
    )
}

export default Test2
