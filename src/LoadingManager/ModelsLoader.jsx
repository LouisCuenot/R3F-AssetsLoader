import React, { useEffect } from 'react'
import { source } from '../assets/source'
import { useGLTF } from '@react-three/drei'
import { useSetAssets } from '../AssetsProvider/AssetsProvider'

const ModelsLoader = () => {

const setAssets = useSetAssets()

  const modelPaths = source.models.map(model => `/models${model.src}`)
  const models = useGLTF(modelPaths)

  const loadedModels = source.models.reduce((acc, model, index) => {
    acc[model.name] = models[index]
    return acc
  }, {})

  useEffect(() => {
    
    setAssets(prevAssets => ({
      ...prevAssets,
      models: loadedModels
    }))
  }, [setAssets])


  return null
}

export default ModelsLoader