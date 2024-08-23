
import { Canvas } from '@react-three/fiber'
import './App.scss'
import LoadingManager from './LoadingManager/LoadingManager'
import { Suspense, useEffect, useRef, useState } from 'react'
import Loader from './Loader/Loader'
import World from './Components/World'
import { BrowserRouter } from 'react-router-dom'
import { ReactLenis } from '@studio-freight/react-lenis'
import { AssetsProvider } from './AssetsProvider/AssetsProvider'
import { HooksProvider } from './HooksProvider/HooksProvider'
import { useLenis } from "@studio-freight/react-lenis"







function App() {


  
  const [areAssetsLoaded, setAreAssetsLoaded] = useState(false)
  const [lenisSize, setLenisSize] = useState(1)



  return (
    <ReactLenis root options={{
      autoResize:true
    }}>
      <AssetsProvider>
        <HooksProvider sLenisSize={setLenisSize} lenisSize={lenisSize}>
          <BrowserRouter>
            <div style={{width:'100vw',height:`${lenisSize*100}vh`,pointerEvents:'none'}}/>
            <div className="canvasContainer">
              <Canvas 
                gl={{
                  alpha:true,
                  
                }}
              >
                {
                  !areAssetsLoaded &&
                  <Loader
                    setAreAssetsLoaded={setAreAssetsLoaded}
                  />
                }
                <Suspense>
                  <LoadingManager />
                </Suspense>
                {
                  areAssetsLoaded &&
                  <World />
                }
                
              </Canvas>
            </div>
          </BrowserRouter>
        </HooksProvider>
      </AssetsProvider>
    </ReactLenis>
  )
}

export default App
