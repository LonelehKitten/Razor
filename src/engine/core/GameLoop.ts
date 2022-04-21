import { gl } from "../gl/GLUtils";
import GameCore from "./GameCore";

class GameLoop {

    private _gameCore: GameCore;

    public constructor(gameCore: GameCore) {
        this._gameCore = gameCore;
    }

    private loop = () : void => {
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LESS)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        this._gameCore.update();
        this._gameCore.render();
        requestAnimationFrame(this.loop);
    }

    public start() : void {
        this._gameCore.start();
        this.loop();
    }

}

export default GameLoop;