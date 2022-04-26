import GameCore from '@engine/core/GameCore';
import Razor from '@engine/core/Razor';
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface IRazorPayload {
  gameCore: GameCore;
  canvas: HTMLCanvasElement;
}

interface RazorStoreState {
  razor: Razor
}

const initialState: RazorStoreState = {
  razor: null
}

const RazorStore = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    init: (state: RazorStoreState, action: PayloadAction<IRazorPayload>) => {
      if(!state.razor) {
        state.razor = new Razor(action.payload.gameCore, action.payload.canvas)
      }
    },
    start: (state: RazorStoreState) => {
      if(state.razor && !state.razor.isStarted()) {
        state.razor.start()
      }
    }
  }
})

export type RazorState = typeof initialState
export const RazorActions = {...RazorStore.actions}
export default RazorStore.reducer