import Property from '@components/property/Property';
import Camera from '@engine/core/Camera';
import Entity from '@engine/core/Entity';
import Razor from '@engine/core/Razor';
import Vec3 from '@engine/math/Vec3';
import useGameCore from '@hooks/useGameCore';
import { RazorContext, RazorObserverActions } from '@root/src/RazorEngineInterface';
import React, { useContext, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';

import {BsPlus} from 'react-icons/bs'
import {BiTargetLock} from 'react-icons/bi'
import UIButton from '@ui/buttons/UIButton';

interface CameraPropertiesProps {
  show: boolean
}

const CameraProperties: React.FC<CameraPropertiesProps> = (props) => {
  
  const core = useGameCore()
  const razorContext = useContext(RazorContext);

  const camera = core?.getCameraManager().getActive()

  const translation = new Vec3(
    razorContext.observers.cameraTransform.translation[0],
    razorContext.observers.cameraTransform.translation[1],
    razorContext.observers.cameraTransform.translation[2],
  )

  const rotation = new Vec3(
    razorContext.observers.cameraTransform.rotation[0],
    razorContext.observers.cameraTransform.rotation[1],
    razorContext.observers.cameraTransform.rotation[2],
  )

  function setTranslation(x: number, y: number, z: number) {
    if(
      razorContext.observers.selected.camera &&
      !Razor.IS_MOUSE_INSIDE
    ) {

      camera
        .getTransform()
        .getTranslation()
        .assign(new Vec3(x, y, z))
      
    }
  }

  function setRotation(x: number, y: number, z: number) {
    if(
      razorContext.observers.selected.camera &&
      !Razor.IS_MOUSE_INSIDE
    ) {

      camera
        .getTransform()
        .getRotation()
        .assign(new Vec3(x, y, z))

    }
  }

  useEffect(() => {
    if(core) {
      razorContext.observerDispatch({
        type: RazorObserverActions.addCamera,
        payload: core.getCameraManager().getKeys()
      })
    }
  }, [])

  return (
    <SimpleBar 
      className={`camera-properties ${!props.show && 'hidden'}`}
      style={{ maxHeight: '100%' }}
    >
      <h3> {`Properties: ${razorContext.observers.selected.camera ?? ''}`} </h3>
      <div>
        <select 
          name="cameras" 
          id="cameras"
          value={razorContext.observers.selected.camera}
        >
          {razorContext.observers.scenes[0].cameras.map((camera) => {
            return (
              <option key={camera} value={camera}> {camera} </option>
            )
          })}
        </select>
        <UIButton template="simple" icon={BiTargetLock}></UIButton>
        <UIButton template="simple" icon={BsPlus}></UIButton>
      </div>
      <Property 
        title="Translation" 
        defaultValue={translation} 
        setProperty={setTranslation}  
      />
      <Property 
        title="Rotation" 
        defaultValue={rotation} 
        setProperty={setRotation}  
      />
    </SimpleBar>
  );
};

export default CameraProperties;