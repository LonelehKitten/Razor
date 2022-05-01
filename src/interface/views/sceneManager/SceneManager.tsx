import useGameCore from '@hooks/useGameCore';
import { RazorContext, RazorObserverActions } from '@root/src/RazorEngineInterface';
import React, { useContext, useState } from 'react';

import {FaTrashAlt} from 'react-icons/fa'
import SimpleBar from 'simplebar-react';

interface SceneManagerProps {
  
}

const SceneManager: React.FC<SceneManagerProps> = () => {
  const core = useGameCore()
  const razorContext = useContext(RazorContext);

  function selectEntity(entityName: string) {
    razorContext.observerDispatch({
      type: RazorObserverActions.selectEntity,
      payload: entityName
    })
  }

  return (
    <div className='container-content scene-manager'>
      <SimpleBar style={{ maxHeight: '100%' }}>
        <ul>
          {razorContext.observers.scenes[0].entities.map((i) => {
            return (
              <li 
                key={i} 
                onClick={() => selectEntity(i)}
                className={`${razorContext.observers.selected === i ? 'selected' : ''}`}
              >
                <div> {i} </div>
                <button type="button" onClick={() => core.removeEntity(i)}>
                  <FaTrashAlt  />
                </button>
              </li>
            )
          })}
        </ul>
      </SimpleBar>
    </div>
  );
};

export default SceneManager;