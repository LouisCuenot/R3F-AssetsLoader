
import { Canvas } from '@react-three/fiber'
import './App.css'
import LoadingManager from './LoadingManager/LoadingManager'
import { Suspense, useState } from 'react'
import Loader from './Loader/Loader'
import Scene from './Components/Scene'




function App() {

  const [areAssetsLoaded, setAreAssetsLoaded] = useState(false)

  return (
    <Canvas>
      {
        !areAssetsLoaded &&
        <Loader
          setAreAssetsLoaded={setAreAssetsLoaded}
        />
      }
      <Suspense>
        <LoadingManager/>
      </Suspense>
      {
        areAssetsLoaded &&
        <Scene/>
      }
    </Canvas>
  )
}

export default App
