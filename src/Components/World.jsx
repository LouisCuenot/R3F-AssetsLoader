import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useAssets } from '../AssetsProvider/AssetsProvider'
import { OrbitControls, PerspectiveCamera, useFBO, shaderMaterial } from '@react-three/drei'
import renderShaderVert from './RenderShader/renderShader.vert?raw'
import renderShaderFrag from './RenderShader/renderShader.frag?raw'
import { extend, useFrame, useThree } from '@react-three/fiber'
import Scene from './Scene/Scene'
import { useLocation, useNavigate } from 'react-router-dom'
import Test2 from './Test2'
import Test from './Test'
import gsap from 'gsap'
import SubScene from './SubScene/SubScene'
import { MathUtils } from 'three'
import { useLenis } from '@studio-freight/react-lenis'


const RenderMaterial = shaderMaterial(
  {
    uTexture: null,
    uTransiTexture: null,
    uProgress: 0
  },
  renderShaderVert,
  renderShaderFrag,
  (material) => {
    material.transparent = true;
  }
)

extend({ RenderMaterial })

export const getScenesRefContext = createContext()

export const useScenes = () => useContext(getScenesRefContext)



const World = () => {

  const lenis = useLenis()

  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { viewport } = useThree()

  const scenesRef = useRef([])

  const [currentScene, setCurrentScene] = useState({
    url: pathname
  })
  const [targetScene, setTargetScene] = useState({
    url: null
  })
  const [transiFactor, setTransiFactor] = useState(0)


  const renderCamera = useRef()
  const renderMeshRef = useRef()
  const renderMaterialRef = useRef()

  const renderTarget = useFBO()
  const transiRenderTarget = useFBO()

  useFrame(({
    gl,
    scene
  }) => {

    if (!currentScene || !renderMeshRef.current) return

    renderMeshRef.current.visible = false
    renderMaterialRef.current.uniforms.uProgress.value = transiFactor



    let cScene = null
    for (const s of scenesRef.current) {
      if (s.userData.url === currentScene.url && s.userData.subSceneId === (currentScene.id | 0)) {
        cScene = s
        cScene.visible = true
      } else {
        s.visible = false
      }
    }

    gl.setRenderTarget(renderTarget)
    gl.render(scene, renderCamera.current)

    if (cScene) {
      cScene.visible = false
    }

    if (targetScene.url) {
      let tScene = null
      for (const s of scenesRef.current) {
        if (s.userData.url === targetScene.url && s.userData.subSceneId === (targetScene.id | 0)) {
          tScene = s
          tScene.visible = true
        } else {
          s.visible = false
        }
      }

      gl.setRenderTarget(transiRenderTarget)
      gl.render(scene, renderCamera.current)
      if (tScene) {
        tScene.visible = false
      }
      renderMaterialRef.current.uniforms.uTransiTexture.value = transiRenderTarget.texture

    }

    renderMaterialRef.current.uniforms.uTexture.value = renderTarget.texture
    gl.setRenderTarget(null)
    renderMeshRef.current.visible = true


  })

  const navigateTo = ({
    targetPage,
    duration,
    animType
  }) => {
    if (!targetPage) return

    lenis.stop()

    setTargetScene({
      url: targetPage.url,
      id: targetPage.id | 0
    })

    const tFactor = {
      value: 0
    }

    gsap.to(tFactor, {
      value: 1,
      duration: duration * 0.001,
      ease: 'power1.in',
      onUpdate: () => setTransiFactor(tFactor.value),
      onComplete: () => {
        setCurrentScene({
          url: targetPage.url,
          id: targetPage.id | 0
        })
        setTargetScene({
          url: null
        })
        setTransiFactor(0)
        navigate(targetPage.url)
        lenis.start()
      }
    })

  }





  return (
    <>

      <getScenesRefContext.Provider
        value={{
          scenesRef,
          currentScene,
          setCurrentScene,
          targetScene,
          setTargetScene,
          transiFactor,
          setTransiFactor,
          navigateTo
        }}
      >
        <Scene
          url={"/"}
          height={5}
          isInfinite={true}
          steps={[
            {
              start: 0.4,
              duration: 0.2
            }
          ]}
        >
          <SubScene
            id={0}
          >
            <mesh
              position-x={-2.5}
              onClick={() => {
                navigateTo({
                  targetPage:{
                    url:'/t',
                    id:0
                  },
                  duration:1000,
                })
              }}
            >
              <sphereGeometry />
              <meshBasicMaterial color={0xF63D02} />
            </mesh>
          </SubScene>
          <SubScene
            id={1}
          >
            <Test2 />
          </SubScene>
        </Scene>
        <Scene
          url={"/t"}
          height={2}
        >
          <SubScene>
            <Test />
          </SubScene>
        </Scene>
      </getScenesRefContext.Provider>

      <PerspectiveCamera ref={renderCamera} fov={75} position-z={5} />
      <mesh
        ref={renderMeshRef}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <renderMaterial
          ref={renderMaterialRef}
          uTexture={null}
          uTransiTexture={null}
          uProgress={transiFactor}
        />
      </mesh>

      <mesh
        position-z={4.9}
        onClick={(e) => {
          if (!targetScene.url) return
          console.log('CANCELED SPAM CLICK')
          e.stopPropagation()
        }}
        visible={false}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
      </mesh>
    </>
  )
}

export default World