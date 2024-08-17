import React, { createContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCustomHooks } from '../../HooksProvider/HooksProvider';
import { useLenis } from '@studio-freight/react-lenis';
import { useScenes } from '../World';



export const getSceneUrlContext = createContext();

const Scene = ({ url, children, height, steps }) => {

  const lenis = useLenis()
  const { pathname } = useLocation()
  const {useResizeScroll, lenisSize} = useCustomHooks()
  const {currentScene, setCurrentScene, setTargetScene, transiFactor, setTransiFactor} = useScenes()

  useEffect(()=>{
    if(pathname === url){
      useResizeScroll(height)
    }
  },[pathname])

  useEffect(()=>{
    if(currentScene.url === url){
      lenis.resize()
      let step = 0;
      if(currentScene.id > 0){
        step = steps[currentScene.id-1].start + steps[currentScene.id-1].duration
      }
      lenis.scrollTo(lenis.limit*step,{
        immediate:true,
      })
    }
  },[lenisSize])

 const getProgressRange = (progress) => {
  
    for(let i = 0; i<steps.length;i++){
      let stepStart = steps[i].start
      let stepEnd = steps[i].start + steps[i].duration

      //If inside a step
      if(progress > stepStart && progress < stepEnd){
        setCurrentScene({
          url:url,
          id:i
        })
        setTargetScene({
          url:url,
          id:i+1
        })
        setTransiFactor((progress - stepStart) / steps[i].duration)
      }

      //If lower than first step
      if(i === 0 && progress <= stepStart){
        if(transiFactor !== 0){
          setTransiFactor(0)
        }
        setCurrentScene({
          url:url,
          id:i
        })
        setTargetScene({
          url:null
        })
      }

      //If Between two steps
      if(i < steps.length - 1  && progress >= stepEnd && progress <= steps[i+1].start ){
        if(transiFactor !== 0){
          setTransiFactor(0)
        }
        setCurrentScene({
          url:url,
          id:i+1
        })
        setTargetScene({
          url:null
        })
      }

      //If higher than last step
      if(i === steps.length - 1 && progress >= stepEnd){
        if(transiFactor !== 0){
          setTransiFactor(0)
        }
        setCurrentScene({
          url:url,
          id:i+1
        })
        setTargetScene({
          url:null
        })
      }



      
    }
    
  }

  useEffect(()=>{

    const handleScroll = (e) => {
      if(steps){
        getProgressRange(e.progress)
      }
    }
    

    if(currentScene.url === url){
      lenis.on('scroll',handleScroll)
    }
    return () => lenis.off('scroll',handleScroll)
  },[pathname])


  
  return (
    <getSceneUrlContext.Provider 
      value={{
        url,
        steps
      }}
    >
      <group>
        {children}
      </group>
    </getSceneUrlContext.Provider>
  );
};

export default Scene;
