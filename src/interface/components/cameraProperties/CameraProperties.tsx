import Property from '@components/property/Property';
import Camera from '@engine/core/Camera';
import Entity from '@engine/core/Entity';
import Razor from '@engine/core/Razor';
import Vec3 from '@engine/math/Vec3';
import useGameCore from '@hooks/useGameCore';
import { RazorContext, RazorObserverActions } from '@root/src/RazorEngineInterface';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
  const selectRef = useRef<HTMLSelectElement>();

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

      core.getCameraManager().get(razorContext.observers.selected.camera)
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

      core.getCameraManager().get(razorContext.observers.selected.camera)
        .getTransform()
        .getRotation()
        .assign(new Vec3(x, y, z))

    }
  }

  useEffect(() => {
    razorContext.observerDispatch({
      type: RazorObserverActions.selectCamera,
      payload: 'camera0'
    })
    razorContext.observerDispatch({
      type: RazorObserverActions.targetCamera,
      payload: 'camera0'
    })
  }, [])

  function targetCamera(camera = selectRef.current.value) {
    core.getCameraManager().setActive(camera)
    razorContext.observerDispatch({
      type: RazorObserverActions.targetCamera,
      payload: camera
    })
  }

  function selectCamera(camera = selectRef.current.value) {
    core.setSelectedCamera(camera)
    const transform = core.getCameraManager().get(camera).getTransform()
    razorContext.observerDispatch({
      type: RazorObserverActions.selectCamera,
      payload: camera
    })
    razorContext.observerDispatch({
      type: RazorObserverActions.updateCamera,
      payload: {
        translation: [
          transform.getTranslation().x,
          transform.getTranslation().y,
          transform.getTranslation().z,
        ],
        rotation: [
          transform.getRotation().x,
          transform.getRotation().y,
          transform.getRotation().z,
        ],
      }
    })
  }

  function addCamera() {
    const newCamera = core.createNewCamera()
    selectCamera(newCamera)
    targetCamera(newCamera)
  }

  return (
    <SimpleBar 
      className={`camera-properties ${!props.show && 'hidden'}`}
      style={{ maxHeight: '100%' }}
    >
      <h3> {`Camera Properties - ${razorContext.observers.targetCamera ?? ''}`} </h3>
      <div>
        <select 
          ref={selectRef}
          name="cameras" 
          id="cameras"
          value={razorContext.observers.selected.camera ?? undefined}
          onChange={() => selectCamera()}
        >
          {razorContext.observers.scenes[0].cameras.map((camera) => {
            return (
              <option key={camera} value={camera}> {camera} </option>
            )
          })}
        </select>
        <UIButton 
          template="simple" 
          icon={BiTargetLock}
          tooltip='Ativar camera'
          onActionPerformed={() => targetCamera()}
        ></UIButton>
        <UIButton 
          template="simple" 
          icon={BsPlus}
          tooltip='Adicionar camera'
          onActionPerformed={addCamera}
        ></UIButton>
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

/*



*/

export default CameraProperties;