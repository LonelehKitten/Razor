import { gl } from "../gl/GLUtils";
import VAO from '../buffer/VAO'
import VBO from "../buffer/VBO";
import Shader from "../tools/Shader";

class GameLoop {

    private static _instance: GameLoop;
    private _mesh: VAO;
    private _shader: Shader;

    private constructor() {

        // ========= SHADER ==========
        this._shader = new Shader(
            'test', 
            '/resources/shader/vert.glsl', 
            '/resources/shader/frag.glsl'
        );

        this._shader.create();

        // ========= OBJECT DATA ==========
        let vertices = [
             0,  0, 0,
             0, .5, 0,
            .5, .5, 0,
            .5,  0, 0
        ];

        let colors = [
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0
        ]

        let indices = [0, 1, 2, 0, 2, 3]

        this._mesh = new VAO([
            new VBO(new Float32Array(vertices), 3, true),
            new VBO(new Float32Array(colors), 4, true),
            new VBO(new Uint16Array(indices), 1, false),
        ]);

        this._mesh.create();
    }

    public static getInstance(): GameLoop {
        if(GameLoop._instance === null || GameLoop._instance === undefined) {
            GameLoop._instance = new GameLoop();
        }
        return GameLoop._instance;
    }

    public loop = () : void => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        this.run();
        requestAnimationFrame(this.loop);
    }

    private run() : void {
        this._shader.bind();
        this._mesh.bind();
        //gl.drawArrays(gl.TRIANGLES, 0, 3)/
        gl.drawElements(gl.TRIANGLES, this._mesh.getIbo().getLength(), gl.UNSIGNED_SHORT, 0);
        this._mesh.unbind();
    }

}

export default GameLoop;