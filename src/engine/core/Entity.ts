import VAO from "../buffer/VAO";
import Renderer from "../renderer/Renderer";
import Shader from "../tools/Shader";

abstract class Entity {

    private _name: string;

    private _vao: VAO;
    private _shader: Shader;
    private _renderer: Renderer;

    public constructor(name: string, vao: VAO, shader: Shader, renderer: Renderer) {
        this._name = name;
        this._vao = vao;
        this._shader = shader;
        this._renderer = renderer;
    }

    public abstract update(): void;


    public setVAO(vao: VAO) {
        this._vao = vao
    }
    
    public setShader(shader: Shader) {
        this._shader = shader
    }

    public setRenderer(renderer: Renderer) {
        this._renderer = renderer;
    }
    
    public getVAO() : VAO {
        return this._vao
    }
    
    public getShader() : Shader {
        return this._shader
    }

    public getRenderer(): Renderer {
        return this._renderer;
    }

    public getName(): string {
        return this._name;
    }

}

export default Entity;