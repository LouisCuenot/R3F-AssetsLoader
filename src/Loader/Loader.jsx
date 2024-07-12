import { Html, useProgress } from '@react-three/drei'
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { source } from '../assets/source'

const Loader = ({setAreAssetsLoaded}) => {
  const numberOfAssets = useRef(0)
  const loadedPercentageRef = useRef({ value: 0 })
  const animationRef = useRef(null)
  const [loadedPercentage, setLoadedPercentage] = useState(0)
  

  const { loaded } = useProgress()

  useEffect(() => {
    numberOfAssets.current += source.textures.length
    for (let i = 0; i < source.models.length; i++) {
      numberOfAssets.current += source.models[i].nbOfRessources
    }
  }, [])

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.kill()
    }

    animationRef.current = gsap.to(loadedPercentageRef.current, {
      value: (loaded * 100) / numberOfAssets.current,
      duration: 4,
      ease:"power3.out",
      onUpdate: () => {
        setLoadedPercentage(Math.round(loadedPercentageRef.current.value))
      }
    })
  }, [loaded])

  useEffect(()=>{
    if(loadedPercentage === 100){
      setAreAssetsLoaded(true)
    }
  },[loadedPercentage])

  return (
    <Html center>
      <div>{loadedPercentage}</div>
    </Html>
  );
};

export default Loader
