import React, { useContext, useEffect, useRef } from 'react';
import { getSceneUrlContext } from '../Scene/Scene';
import { getScenesRefContext, useScenes } from '../World';
import { useFrame } from '@react-three/fiber';


const SubScene = ({ id, children }) => {
    const url = useContext(getSceneUrlContext)
    const { scenesRef, currentScene, targetScene } = useScenes()

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

