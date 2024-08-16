import React, { createContext } from 'react';


export const getSceneUrlContext = createContext();

const Scene = ({ url, children }) => {

  
  return (
    <getSceneUrlContext.Provider value={url}>
      <group>
        {children}
      </group>
    </getSceneUrlContext.Provider>
  );
};

export default Scene;
