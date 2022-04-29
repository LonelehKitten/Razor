import useGameCore from '@hooks/useGameCore';
import { RazorContext } from '@root/src/RazorEngineInterface';
import React, { useContext, useState } from 'react';

import {FaTrashAlt} from 'react-icons/fa'

interface SceneManagerProps {
  
}

const SceneManager: React.FC<SceneManagerProps> = () => {
  const [selected, setSelected] = useState<string>(null);
  const core = useGameCore()
  const razorContext = useContext(RazorContext);

  return (
    <div className='container-content scene-manager'>
      <ul>
        {razorContext.observers.scenes[0].entities.map((i) => {
          return (
            <li 
              key={i} 
              onClick={() => setSelected(i)}
              className={`${selected === i ? 'selected' : ''}`}
            >
              <div> {i} </div>
              <button type="button" onClick={() => core.removeEntity(i)}>
                <FaTrashAlt  />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default SceneManager;