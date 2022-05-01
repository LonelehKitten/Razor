import React, { useContext, useEffect, useState } from 'react';
import Property from '@components/property/Property'
import { BigFloat32 } from 'bigfloat';
import { RazorContext } from '@root/src/RazorEngineInterface';
import useGameCore from '@hooks/useGameCore';
import Vec3 from '@engine/math/Vec3';
import Entity from '@engine/core/Entity';
import SimpleBar from 'simplebar-react';

interface EntityPropertiesProps {
  
}

const EntityProperties: React.FC<EntityPropertiesProps> = () => {
  const [selectedEntity, setSelectedEntity] = useState<Entity>();

  const core = useGameCore()
  const razorContext = useContext(RazorContext);

  function setTranslation(x: BigFloat32, y: BigFloat32, z: BigFloat32) {
    if(razorContext.observers.selected) {
      core.getSceneManager().getActive().get(razorContext.observers.selected)
        .getTransform()
        .getTranslation()
        .assign(new Vec3(x.valueOf(), y.valueOf(), z.valueOf()))
    }
  }

  function setRotation(x: BigFloat32, y: BigFloat32, z: BigFloat32) {
    if(razorContext.observers.selected) {
      core.getSceneManager().getActive().get(razorContext.observers.selected)
        .getTransform()
        .getRotation()
        .assign(new Vec3(x.valueOf(), y.valueOf(), z.valueOf()))
    }
  }

  function setScale(x: BigFloat32, y: BigFloat32, z: BigFloat32) {
    if(razorContext.observers.selected) {
      core.getSceneManager().getActive().get(razorContext.observers.selected)
        .getTransform()
        .getScale()
        .assign(new Vec3(x.valueOf(), y.valueOf(), z.valueOf()))
    }
  }

  useEffect(() => {
    if(razorContext.observers.selected) {
      setSelectedEntity(core.getSceneManager().getActive().get(razorContext.observers.selected))
    }
  }, [razorContext.observers.selected]);

  return (
    <div className="container-content entity-properties">
      <SimpleBar style={{ maxHeight: '100%' }}>
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
      </SimpleBar>
    </div>
  );
};

export default EntityProperties;