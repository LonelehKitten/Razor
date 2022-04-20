import { gl } from "../gl/GLUtils";
import VAO from '../buffer/VAO'
import VBO from "../buffer/VBO";
import Shader from "../tools/Shader";
import Matrix4x4 from "../math/Matrix4x4"
import GameCore from "./GameCore";
import Renderer from '../renderer/Renderer'

class GameLoop {

    private _gameCore: GameCore;

    public constructor(gameCore: GameCore) {
        this._gameCore = gameCore;
    }

    private loop = () : void => {
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