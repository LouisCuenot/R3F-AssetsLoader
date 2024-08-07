import React, { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Group } from 'three'
import { useTransition } from '../../HooksProvider/HooksProvider'

const Scene = ({
  url,
  currentScene,
  setCurrentScene,
  currentTransiTarget,
  setCurrentTransiTarget,
  children,
  scenes
}) => {

  const {pathname} = useLocation()

  const {transition} = useTransition()

  const sceneRef = useRef()

  useEffect(()=>{
    if(sceneRef.current){
      scenes.current = [...scenes.current,sceneRef.current]
    }
  },[])

  useEffect(()=>{
    if(url === pathname){
      setCurrentScene(sceneRef.current)
    }
  },[pathname])

  useEffect(()=>{
    if(!transition)return
    if(transition.url === url){
      setCurrentTransiTarget(sceneRef.current)
    }
  },[transition])




  return (
    <group
      ref={sceneRef}
      name={url}
    >
        {(sceneRef.current === currentScene || sceneRef.current === currentTransiTarget) && children}
    </group>
  )
}

export default Scene