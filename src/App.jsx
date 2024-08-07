
import { Canvas } from '@react-three/fiber'
import './App.css'
import LoadingManager from './LoadingManager/LoadingManager'
import { Suspense, useState } from 'react'
import Loader from './Loader/Loader'
import World from './Components/World'
import { BrowserRouter } from 'react-router-dom'





function App() {

  const [areAssetsLoaded, setAreAssetsLoaded] = useState(false)

  return (
    <BrowserRouter>
      <Canvas>
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
    </BrowserRouter>
  )
}

export default App
