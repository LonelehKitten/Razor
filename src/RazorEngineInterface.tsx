// import UIButton from "@ui/buttons/UIButton";
import ResourceManager from "@views/resourceManager/ResourceManager";
import SceneManager from "@views/sceneManager/SceneManager";
import Viewport from "@views/viewport/Viewport";
import React, { useEffect, useLayoutEffect, useMemo, useReducer, useRef } from "react";

import { useDispatch } from '@store/Root.store'
import { RazorActions } from "@store/Razor.store";
import RazorInterfaceCore from "@interface-core/RazorInterfaceCore";
import ResourceLoader from "@engine/core/ResourceLoader";
import produce from "immer";
import PropertiesContainer from "@views/propertiesContainer/PropertiesContainer";
import Transform from "@engine/math/Transform";
import { numberToString } from "bigfloat";


export const RazorObserverActions = {
  createObserver: 'RIActions/CREATE_OBSERVER',
  updateObserver: 'RIActions/UPDATE_OBSERVER',

  addEntity: 'RIActions/ADD_ENTITY',
  selectEntity: 'RIActions/SELECT_ENTITY',

  addCamera: 'RIActions/ADD_CAMERA',
  selectCamera: 'RIActions/SELECT_CAMERA',
  updateCamera: 'RIActions/UPDATE_CAMERA',
  targetCamera: 'RIActions/TARGET_CAMERA',
  lockCamera: 'RIActions/LOCK_CAMERA',
}

export enum ERazorResources {
  VAO = 0,
  SHADER = 1
}

interface IResourcesObserver {
  keys: string[];
  observing: boolean
}

type CameraTransformType = {
  translation: [number, number, number],
  rotation: [number, number, number],
}

interface RazorObserverState {
  resources: IResourcesObserver[],
  scenes: {
    name: string, 
    entities: string[],
    cameras: string[]
  }[],
  selected: {
    entity: string, 
    camera: string
  },
  camera: {
    target: string,
    transform: CameraTransformType,
    lockedIn: string
  }
}

const initialState: RazorObserverState = {
  resources: [
    {
      keys: [],
      observing: false,
    }
  ],
  scenes: [{
    name: 'unique scene',
    entities: [],
    cameras: []
  }],
  selected: {
    entity: null,
    camera: null
  },
  camera: {
    target: null,
    transform: {
      translation: [0, 0, 0],
      rotation: [0, 0, 0],
    },
    lockedIn: null
  }
} 

function razorObserverReducer(draft: RazorObserverState, action: {type: string, payload: unknown}) {
  switch (action.type) {
    case RazorObserverActions.createObserver:
      draft.resources[action.payload as ERazorResources].observing = true
      break;
    case RazorObserverActions.updateObserver:
      draft.resources[action.payload[0]].keys = [...action.payload[1]]
      break;

    case RazorObserverActions.addEntity:
      draft.scenes[0].entities = [...action.payload as string[]]
      break;
    case RazorObserverActions.selectEntity:
      draft.selected.entity = action.payload as string
      break;

    case RazorObserverActions.addCamera:
      draft.scenes[0].cameras = [...action.payload as string[]]
      break;
    case RazorObserverActions.selectCamera:
      draft.selected.camera = action.payload as string
      break;
    case RazorObserverActions.updateCamera:
      draft.camera.transform.translation = 
        [...(action.payload as CameraTransformType).translation as [number, number, number]]
      draft.camera.transform.rotation = 
        [...(action.payload as CameraTransformType).rotation as [number, number, number]]
      break;
    case RazorObserverActions.targetCamera:
      draft.camera.target = action.payload as string
      break;
    case RazorObserverActions.lockCamera:
      draft.camera.lockedIn = action.payload as string
      break;
    default:
  }

}

interface IRazorContext {
  observers: RazorObserverState,
  observerDispatch: React.Dispatch<{ type: string, payload: unknown}>
}

export const RazorContext = React.createContext<IRazorContext>({
  observers: initialState,
  observerDispatch: null,
})


function initializeEngine(
  dispatch: (action: {payload: unknown, type: string}) => void,
  ref: React.MutableRefObject<HTMLCanvasElement>,
  getObservers: () => RazorObserverState,
  observerDispatch: React.Dispatch<{ type: string, payload: unknown}>
) {


  function entityManagerObserver(keys: string[]) {
    observerDispatch({
      type: RazorObserverActions.addEntity,
      payload: keys
    })
  }

  function cameraManagerObserver(keys: string[]) {
    observerDispatch({
      type: RazorObserverActions.addCamera,
      payload: keys
    })
  } 

  function cameraObserver(transform: Transform) {
    const translation = transform.getTranslation()
    const rotation = transform.getRotation()
    observerDispatch({
      type: RazorObserverActions.updateCamera,
      payload: {
        translation: [
          translation.x,
          translation.y,
          translation.z
        ],
        rotation: [
          rotation.x,
          rotation.y,
          rotation.z
        ],
      }
    })
    
  }


  dispatch(RazorActions.init({
    gameCore: new RazorInterfaceCore(
      entityManagerObserver,
      cameraObserver,
      cameraManagerObserver, 
    ),
    canvas: ref.current
  }))
  ResourceLoader.setVAOObserver((keys) => {
    observerDispatch({
      type: RazorObserverActions.updateObserver,
      payload: [ERazorResources.VAO, keys]
    })
  })
  observerDispatch({
    type: RazorObserverActions.createObserver,
    payload: ERazorResources.VAO
  })
  dispatch(RazorActions.start())

  cameraManagerObserver(['camera0'])
  
}


function RazorEngineInterface() {

  const dispatch = useDispatch();
  const ref = useRef<HTMLCanvasElement>();

  const [observers, observerDispatch] = useReducer(produce(razorObserverReducer), initialState);

  function getObservers() {
    return observers;
  }

  useEffect(() => {
    initializeEngine(dispatch, ref, getObservers, observerDispatch)
  }, []);

  const contextValue = useMemo<IRazorContext>(() => ({observers, observerDispatch}), [observers])

  return (
    <RazorContext.Provider value={contextValue}>
      <div className="main">
        <div className="container viewport">
          <Viewport ref={ref}  />
        </div>
        <div className="container side-container">
          <SceneManager  />
          <PropertiesContainer  />
        </div>
        <div className="container bottom-container">
          <ResourceManager  />
        </div>
      </div>
    </RazorContext.Provider>
  );
}

/* 
<UIButton 
        template="primary"
        onActionPerformed={() => {console.log('hi!');}}
      >
        Click here
      </UIButton>

*/

export default RazorEngineInterface;
