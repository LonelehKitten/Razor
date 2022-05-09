import Property from '@components/property/Property';
import Entity from '@engine/core/Entity';
import Vec3 from '@engine/math/Vec3';
import useGameCore from '@hooks/useGameCore';
import SimpleEntity from '@interface-core/entities/SimpleEntity';
import { RazorContext } from '@root/src/RazorEngineInterface';
import UICheckBox from '@ui/checkbox/UICheckBox';
import React, { useContext, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';

interface EntityPropertiesProps {
  show: boolean
}

const EntityProperties: React.FC<EntityPropertiesProps> = (props) => {

  const [animate, setAnimate] = useState<boolean>(false);
  const [selectedEntity, setSelectedEntity] = useState<Entity>();

  const core = useGameCore()
  const razorContext = useContext(RazorContext);

  function setTranslation(x: number, y: number, z: number) {
    if(razorContext.observers.selected.entity) {
      core.getSceneManager().getActive().get(razorContext.observers.selected.entity)
        .getTransform()
        .setTranslation(new Vec3(x, y, z))
    }
  }

  function setRotation(x: number, y: number, z: number) {
    if(razorContext.observers.selected.entity) {
      core.getSceneManager().getActive().get(razorContext.observers.selected.entity)
        .getTransform()
        .setRotation(new Vec3(x, y, z))
    }
  }

  function setScale(x: number, y: number, z: number) {
    if(razorContext.observers.selected.entity) {
      core.getSceneManager().getActive().get(razorContext.observers.selected.entity)
        .getTransform()
        .setScale(new Vec3(x, y, z))
    }
  }

  useEffect(() => {
    if(razorContext.observers.selected.entity) {
      const entity = core?.getSceneManager().getActive().get(razorContext.observers.selected.entity);
      (entity as SimpleEntity).setAnimate(animate)
    }
  }, [animate])

  useEffect(() => {
    if(razorContext.observers.selected.entity) {
      const entity = core.getSceneManager().getActive().get(razorContext.observers.selected.entity)
      setSelectedEntity(entity)
      setAnimate((entity as SimpleEntity).shouldAnimate())
    }
  }, [razorContext.observers.selected.entity])

  return (
    <SimpleBar 
      className={`entity-properties ${!props.show && 'hidden'}`}
      style={{ maxHeight: '100%' }}
    >
      <h3> {`Properties: ${razorContext.observers.selected.entity ?? ''}`} </h3>
      <div className="options">
        <UICheckBox  
          id="animate"
          label="Animate"
          checked={animate}
          onActionPerformed={setAnimate}
        />
      </div>
      {razorContext.observers.selected.entity &&
        (<>
          <Property 
            title="Translation" 
            vector={selectedEntity?.getTransform().getTranslation()} 
            setProperty={setTranslation}  
          />
          <Property 
            title="Rotation" 
            vector={selectedEntity?.getTransform().getRotation()} 
            setProperty={setRotation}  
          />
          <Property 
            title="Scale" 
            vector={selectedEntity?.getTransform().getScale()} 
            defaultValue={new Vec3(1, 1, 1)}
            setProperty={setScale}  
          />
        </>)
      }
    </SimpleBar>
  );
};

export default EntityProperties;