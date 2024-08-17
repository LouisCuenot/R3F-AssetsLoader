import React, { useContext, useEffect, useRef } from 'react';
import { getSceneUrlContext } from '../Scene/Scene';
import { getScenesRefContext, useScenes } from '../World';
import { useFrame } from '@react-three/fiber';
import { useLenis } from '@studio-freight/react-lenis';
import { useCustomHooks } from '../../HooksProvider/HooksProvider';
import { useLocation } from 'react-router-dom';


const SubScene = ({ id, children}) => {

    

   

    const {url,steps} = useContext(getSceneUrlContext)

    const { scenesRef, currentScene,setCurrentScene, targetScene } = useScenes()

    const subSceneRef = useRef()

    useEffect(() => {
        scenesRef.current = [...scenesRef.current, subSceneRef.current]
    }, [])



    

    








    return (
        <group
            userData={{
                url,
                subSceneId: id | 0
            }}
            ref={subSceneRef}
        >
            {
                (currentScene.url === url && ((currentScene.id | 0) === (id | 0))) || (targetScene.url === url)
                ?
                children
                :
                null
            }
        </group>
    );
};

export default SubScene;

