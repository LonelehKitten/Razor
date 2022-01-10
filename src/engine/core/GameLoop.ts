import { gl } from "../gl/GLUtils";


class GameLoop {

    private static instance: GameLoop;

    public static getInstance(): GameLoop {
        if(GameLoop.instance === null || GameLoop.instance === undefined) {
            GameLoop.instance = new GameLoop();
        }
        return GameLoop.instance;
    }

    public loop = () : void => {
        this.run();
        requestAnimationFrame(this.loop);
    }

    private run() : void {
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

}

export default GameLoop;