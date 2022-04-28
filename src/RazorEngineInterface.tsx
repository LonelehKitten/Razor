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


export const RazorObserverActions = {
  createObserver: 'RIActions/CREATE_OBSERVER',
  updateObserver: 'RIActions/UPDATE_OBSERVER',
}

export enum ERazorResources {
  VAO = 0,
  SHADER = 1
}

interface IResourcesObserver {
  keys: string[];
  observing: boolean
}

interface RazorObserverState {
  resources: IResourcesObserver[]
}

const initialState: RazorObserverState = {
  resources: [
    {
      keys: [],
      observing: false,
    }
  ]
} 

function razorObserverReducer(draft: RazorObserverState, action: {type: string, payload: unknown}) {
  switch (action.type) {
    case RazorObserverActions.createObserver:
      draft.resources[action.payload as ERazorResources].observing = true
      break;
    case RazorObserverActions.updateObserver:
      draft.resources[action.payload[0]].keys = [...action.payload[1]]
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
  observerDispatch: React.Dispatch<{ type: string, payload: unknown}>
) {
  dispatch(RazorActions.init({
    gameCore: new RazorInterfaceCore(),
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
}


function RazorEngineInterface() {

  const dispatch = useDispatch();
  const ref = useRef<HTMLCanvasElement>();

  const [observers, observerDispatch] = useReducer(produce(razorObserverReducer), initialState);

  useEffect(() => {
    initializeEngine(dispatch, ref, observerDispatch)
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
        </div>
        <div className="container bottom-container">
          <ResourceManager  />
        </div>
        <div className="container side-menu">
          <button type="button" onClick={() => {}}> start </button>
        </div>
        <div className="container footer">
          0
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
