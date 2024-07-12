import React, { useContext, useEffect } from 'react'
import { source } from '../assets/source'
import { useTexture } from '@react-three/drei'
import {  useAssets, useSetAssets } from '../AssetsProvider/AssetsProvider'

const TexturesLoader = () => {
    const setAssets = useSetAssets()

    const texturePaths = source.textures.map(texture => `/textures${texture.src}`)
    const textures = useTexture(texturePaths)
  
    const loadedTextures = source.textures.reduce((acc, texture, index) => {
      acc[texture.name] = textures[index]
      return acc
    }, {})
  
    useEffect(() => {
    
      setAssets(prevAssets => ({
        ...prevAssets,
        textures: loadedTextures
      }))
    }, [setAssets])


  
    return null
  }

export default TexturesLoader