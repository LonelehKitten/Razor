import GLUtils, { gl } from '../gl/GLUtils';
import GameLoop from './GameLoop';

/**
 * Canvas management class
 */
class Razor {
  private _gameLoop: GameLoop;
  private _canvas: HTMLCanvasElement;

  public constructor() {
    this._gameLoop = GameLoop.getInstance();
  }

  public start() : void {
    this._canvas = GLUtils.init();
    this.resize();
    gl.clearColor(0, 0, 0, 1);
    this._gameLoop.loop();
  }

  public resize() : void {
    if(this._canvas === undefined) {
        throw new Error('Canvas was not initialized!');
    }

    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
  }
}

export default Razor;
