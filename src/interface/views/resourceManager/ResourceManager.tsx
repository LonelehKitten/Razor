import ResourceLoader from '@engine/core/ResourceLoader';
import useGameCore from '@hooks/useGameCore';
import React, { useState } from 'react';

interface ResourceManagerProps {
  
}

const ResourceManager: React.FC<ResourceManagerProps> = () => {

  const [models, setModels] = useState<string[]>([]);

  const gameCore = useGameCore()

  return (
    <div className='container-content resource-manager'>
      <ul>
        {/*ResourceLoader.forEachVAO*/}
        <li>
          <img src="/interface-assets/icons/obj-file-icon.svg" alt="model name" />
          <span>model name</span>
        </li>
        
      </ul>
    </div>
  );
};

export default ResourceManager;