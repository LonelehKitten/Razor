import useGameCore from '@hooks/useGameCore';
import { RazorContext, ERazorResources } from '@root/src/RazorEngineInterface';

import React, { useContext } from 'react';

interface ResourceManagerProps {
  
}

/* 

  TODO:
    - adicionar uma lista de observer e nomes para cada recurso no RazorStore
    - adicionar uma hook para cada recurso q deverá criar o observer
    - no observer, deve-se atualizar a lista de nomes
    - na hook, deve-se retornar a lista de nomes

*/

const ResourceManager: React.FC<ResourceManagerProps> = () => {

  const core = useGameCore()
  const razorContext = useContext(RazorContext);

  const createNewEntity = (vaoName: string) => {
    core.createNewEntity(vaoName)
  }

  debugger
  return (
    <div className='container-content resource-manager'>
      <ul>
        {razorContext.observers.resources[ERazorResources.VAO].keys.map(vao => {
          return (
            <li key={vao} onDoubleClick={() => createNewEntity(vao)}>
              <img src="/interface-assets/icons/obj-file-icon.svg" alt={vao} />
              <span>{vao}</span>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default ResourceManager;