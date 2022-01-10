import IResource from './IResource';
import GLUtils, { gl } from "../gl/GLUtils";

class Shader implements IResource{


    private _vertexShaderPathname: string;
    private _fragmentShaderPathname: string;

    public constructor(vertexShaderpathname: string, fragmentShaderpathname: string) {
        this._vertexShaderPathname = vertexShaderpathname;
        this._fragmentShaderPathname = fragmentShaderpathname;
    }

    public create() : void {
        let vertexShader : WebGLShader = gl.createShader(gl.VERTEX_SHADER);
        let fragmentShader : WebGLShader = gl.createShader(gl.FRAGMENT_SHADER);
        
        //gl.shaderSource()
    }

    public use() : void {
        
    }

    public destroy() : void {
        
    }
}