import React, { useEffect, useRef, useState } from 'react'
import { useAssets } from '../AssetsProvider/AssetsProvider'
import { OrbitControls, PerspectiveCamera, useFBO, shaderMaterial } from '@react-three/drei'
import renderShaderVert from './RenderShader/renderShader.vert?raw'
import renderShaderFrag from './RenderShader/renderShader.frag?raw'
import { extend, useFrame, useThree } from '@react-three/fiber'
import Scene from './Scene/Scene'
import { useLocation, useNavigate } from 'react-router-dom'
import Test2 from './Test2'
import Test from './Test'
import { useTransition } from '../HooksProvider/HooksProvider'
import gsap from 'gsap'

const RenderMaterial = shaderMaterial(
  {
    uTexture: null,
    uTransiTexture: null,
    uProgress: 0
  },
  renderShaderVert,
  renderShaderFrag
)

extend({ RenderMaterial })



const World = () => {

  const { viewport } = useThree()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { transition, setTransition } = useTransition()




  const [currentScene, setCurrentScene] = useState(null)
  const [currentTransiTarget, setCurrentTransiTarget] = useState(null)

  const scenes = useRef([])


  const renderCamera = useRef()
  const renderMeshRef = useRef()
  const renderMaterialRef = useRef()

  const renderTarget = useFBO()
  const transiRenderTarget = useFBO()

  useEffect(() => {
    if (!transition) return
    gsap.to(renderMaterialRef.current.uniforms.uProgress, {
      value: 1,
      duration: transition.duration * 0.001,
      ease:'none',
      onComplete: () => {
        navigate(transition.url)
      }
    }).play()
  }, [transition])

  useEffect(() => {
    renderMaterialRef.current.uniforms.uProgress.value = 0
    setCurrentTransiTarget(null)
    setTransition(null)
  }, [pathname])


  useFrame(({ gl, scene }) => {

    if (!currentScene || !renderMeshRef.current) return

    renderMeshRef.current.visible = false

    for (const s of scenes.current) {
      if (s !== currentScene) {
        s.visible = false
      } else {
        currentScene.visible = true
      }
    }

    gl.setRenderTarget(renderTarget)

    gl.render(scene, renderCamera.current)


    currentScene.visible = false

    if (currentTransiTarget) {

      currentTransiTarget.visible = true

      gl.setRenderTarget(transiRenderTarget)
      gl.render(scene, renderCamera.current)

      currentTransiTarget.visible = false
      renderMaterialRef.current.uniforms.uTransiTexture.value = transiRenderTarget.texture

    }

    renderMaterialRef.current.uniforms.uTexture.value = renderTarget.texture
    gl.setRenderTarget(null)

    renderMeshRef.current.visible = true


  })

  return (
    <>
      <color attach='background' args={[0xFFD500]} />
      <PerspectiveCamera ref={renderCamera} fov={75} position-z={5}  />
      <mesh
        ref={renderMeshRef}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <renderMaterial
          ref={renderMaterialRef}
          uTexture={null}
          uTransiTexture={null}
          uProgress={0}
        />
      </mesh>

      {
        //AVOID CLICK WHILE TRANSITIONNING
      }
      <mesh
        position-z={4.9}
        onClick={(e)=>{
          if(!transition)return
          e.stopPropagation()
        }}
        visible={false}
      >
        <planeGeometry args={[viewport.width,viewport.height]}/>
      </mesh>

      <Scene
        url={"/"}
        currentScene={currentScene}
        setCurrentScene={(e) => setCurrentScene(e)}
        currentTransiTarget={currentTransiTarget}
        setCurrentTransiTarget={(e) => setCurrentTransiTarget(e)}
        scenes={scenes}
      >
        <Test2 />
      </Scene>
      <Scene
        url={"/t"}
        currentScene={currentScene}
        setCurrentScene={(e) => setCurrentScene(e)}
        currentTransiTarget={currentTransiTarget}
        setCurrentTransiTarget={(e) => setCurrentTransiTarget(e)}
        scenes={scenes}
      >
        <Test />
      </Scene>

    </>
  )
}

export default World