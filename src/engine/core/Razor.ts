import GLUtils, { gl } from '../gl/GLUtils';
import GameCore from './GameCore';
import GameLoop from './GameLoop';
import InputManager from './InputManager';

/**
 * Canvas management class
 */
class Razor {

    public static CANVAS: HTMLCanvasElement;
    public static FOCUSED: boolean

    private _gameLoop: GameLoop;
    private _gameCore: GameCore;
    private _started: boolean

    public constructor(gameCore: GameCore, canvas?: HTMLCanvasElement) {
        Razor.CANVAS = GLUtils.init(canvas);
        Object.defineProperty(this, "CANVAS", {
            writable: false
        })
        gl.clearColor(0, 0, 0, 1);
        this._gameLoop = new GameLoop(gameCore);  
        this._started = false
        this._gameCore = gameCore;
    }

    public start() : void {
        this.configs()
        this.resize();
        InputManager.init()
        this._gameLoop.start();
        this._started = true
    }

    public resize() : void {
        if(Razor.CANVAS === undefined) {
            throw new Error('Canvas was not initialized!');
        }

        Razor.CANVAS.width = Razor.CANVAS.offsetWidth
        Razor.CANVAS.height = Razor.CANVAS.offsetHeight
        gl.viewport(0, 0,Razor.CANVAS.width, Razor.CANVAS.height);
        
    }

    private configs() {
        window.addEventListener('click', (e) => {
            Razor.FOCUSED = (
                e.clientX > Razor.CANVAS.offsetLeft &&
                e.clientX < Razor.CANVAS.offsetLeft+Razor.CANVAS.offsetWidth &&
                e.clientY > Razor.CANVAS.offsetTop &&
                e.clientY < Razor.CANVAS.offsetTop+Razor.CANVAS.offsetHeight
            )
        })
    }

    public isStarted(): boolean {
        return this._started
    }

    public getGameCore(): GameCore {
        return this._gameCore
    }
}

export default Razor;
