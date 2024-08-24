import React, { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCustomHooks } from '../../HooksProvider/HooksProvider';
import { useLenis } from '@studio-freight/react-lenis';
import { useScenes } from '../World';



export const getSceneUrlContext = createContext();
export const useSceneParams = () => useContext(getSceneUrlContext)

const Scene = ({ url, children, height, steps, isInfinite }) => {

  const lenis = useLenis()
  const { pathname } = useLocation()
  const { useResizeScroll, lenisSize } = useCustomHooks()
  const { currentScene, setCurrentScene, setTargetScene, setTransiFactor } = useScenes()

  useEffect(() => {
    if (pathname === url) {
      useResizeScroll(height)
    }
  }, [pathname])

  useEffect(() => {
    if (currentScene.url === url) {
      lenis.resize()
      let step = 0;
      if (currentScene.id > 0) {
        step = steps[currentScene.id - 1].start + steps[currentScene.id - 1].duration
      }
      lenis.scrollTo(lenis.limit * step, {
        immediate: true,
      })
    }
  }, [lenisSize])

  const getProgressRange = (progress) => {

    for (let i = 0; i < steps.length; i++) {
      let stepStart = steps[i].start
      let stepEnd = steps[i].start + steps[i].duration

      //If inside a step
      if (progress > stepStart && progress < stepEnd) {
        setCurrentScene({
          url: url,
          id: i
        })
        setTargetScene({
          url: url,
          id: i + 1
        })
        setTransiFactor((progress - stepStart) / steps[i].duration)
      }

      //If lower than first step
      if (i === 0 && progress <= stepStart) {

        setTransiFactor(0)

        setCurrentScene({
          url: url,
          id: i
        })
        setTargetScene({
          url: null
        })
      }

      //If Between two steps
      if (i < steps.length - 1 && progress >= stepEnd && progress <= steps[i + 1].start) {

        setTransiFactor(0)

        setCurrentScene({
          url: url,
          id: i + 1
        })
        setTargetScene({
          url: null
        })
      }

      //If higher than last step
      if (i === steps.length - 1 && progress >= stepEnd) {

        setTransiFactor(0)

        setCurrentScene({
          url: url,
          id: i + 1
        })
        setTargetScene({
          url: null
        })
      }




    }

  }

  useEffect(() => {

    const handleScroll = (e) => {
      if (steps) {
        getProgressRange(e.progress)
      }
    }


    if (currentScene.url === url) {
      if(isInfinite){
        lenis.options.infinite = true
      }else(
        lenis.options.infinite = false
      )
      lenis.on('scroll', handleScroll)
    }
    return () => lenis.off('scroll', handleScroll)
  }, [pathname])

  const scrollToSubScene = (id) => {
    let step = 0;
    if(id>0){
      step = steps[currentScene.id - 1].start + steps[currentScene.id - 1].duration
    }
    lenis.scrollTo(lenis.limit * step,{
      duration:1.5
    })
  }



  return (
    <getSceneUrlContext.Provider
      value={{
        url,
        steps,
        scrollToSubScene
      }}
    >
      <group>
        {children}
      </group>
    </getSceneUrlContext.Provider>
  );
};

export default Scene;
