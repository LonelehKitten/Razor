import Property from '@components/property/Property';
import Entity from '@engine/core/Entity';
import Vec3 from '@engine/math/Vec3';
import useGameCore from '@hooks/useGameCore';
import { RazorContext } from '@root/src/RazorEngineInterface';
import React, { useContext, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';

interface EntityPropertiesProps {
  show: boolean
}

const EntityProperties: React.FC<EntityPropertiesProps> = (props) => {

  const [selectedEntity, setSelectedEntity] = useState<Entity>();

  const core = useGameCore()
  const razorContext = useContext(RazorContext);

  function setTranslation(x: number, y: number, z: number) {
    if(razorContext.observers.selected.entity) {
      core.getSceneManager().getActive().get(razorContext.observers.selected.entity)
        .getTransform()
        .getTranslation()
        .assign(new Vec3(x, y, z))
    }
  }

  function setRotation(x: number, y: number, z: number) {
    if(razorContext.observers.selected.entity) {
      core.getSceneManager().getActive().get(razorContext.observers.selected.entity)
        .getTransform()
        .getRotation()
        .assign(new Vec3(x, y, z))
    }
  }

  function setScale(x: number, y: number, z: number) {
    if(razorContext.observers.selected.entity) {
      core.getSceneManager().getActive().get(razorContext.observers.selected.entity)
        .getTransform()
        .getScale()
        .assign(new Vec3(x, y, z))
    }
  }

  useEffect(() => {
    if(razorContext.observers.selected.entity) {
      setSelectedEntity(core.getSceneManager().getActive().get(razorContext.observers.selected.entity))
    }
  }, [razorContext.observers.selected.entity])

  return (
    <SimpleBar 
      className={`entity-properties ${!props.show && 'hidden'}`}
      style={{ maxHeight: '100%' }}
    >
      <h3> {`Properties: ${razorContext.observers.selected.entity ?? ''}`} </h3>
      {razorContext.observers.selected.entity &&
        (<>
          <Property 
            title="Translation" 
            defaultValue={selectedEntity?.getTransform().getTranslation()} 
            setProperty={setTranslation}  
          />
          <Property 
            title="Rotation" 
            defaultValue={selectedEntity?.getTransform().getRotation()} 
            setProperty={setRotation}  
          />
          <Property 
            title="Scale" 
            defaultValue={selectedEntity?.getTransform().getScale()} 
            setProperty={setScale}  
          />
        </>)
      }
    </SimpleBar>
  );
};

export default EntityProperties;