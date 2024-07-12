import React from 'react'
import { source } from '../assets/source'
import { useGLTF, useTexture } from '@react-three/drei'
import ModelsLoader from './ModelsLoader'
import TexturesLoader from './TexturesLoader'

const LoadingManager = () => {

  


  return (
    <>
      <TexturesLoader/>
      <ModelsLoader/>
    </>
  )
}

export default LoadingManager