import IResource from './IResource';
import { gl } from "../gl/GLUtils";
import FileUtils from '../utils/FileUtils';

class Shader implements IResource{

    private _name: string;
    private _vertexShaderPathname: string;
    private _fragmentShaderPathname: string;
    private _program: WebGLProgram;

    public constructor(
        name: string,
        vertexShaderpathname: string, 
        fragmentShaderpathname: string
        ) {
        this._name = name;
        this._vertexShaderPathname = vertexShaderpathname;
        this._fragmentShaderPathname = fragmentShaderpathname;
    }

    public create() : void {
        this._program = gl.createProgram();

        let vertexShader : WebGLShader = this.load(this._vertexShaderPathname, gl.VERTEX_SHADER);
        let fragmentShader : WebGLShader = this.load(this._fragmentShaderPathname, gl.FRAGMENT_SHADER);

        gl.attachShader(this._program, vertexShader);
        gl.attachShader(this._program, fragmentShader);

        gl.linkProgram(this._program);

        let error : string = gl.getProgramInfoLog(this._program).trim();
        if(error !== '') {
            throw new Error('Error trying to link shader: ' + this._name + '.\n' + error);
        }
    }

    private load(pathname: string, type: number) : WebGLShader {
        let shader : WebGLShader = gl.createShader(type);

        FileUtils.load(
            pathname, 
            function onSuccess(file) {
                console.log(file);
                gl.shaderSource(shader, file);
            },
            function onError(err) {
                throw new Error('Error trying to load shader: ' + pathname + '.\n' + err);
            },
        );

        gl.compileShader(shader);
        let error : string = gl.getShaderInfoLog(shader).trim();
        if( error !== '') {
            throw new Error('Error trying to compile shader: ' + pathname + '.\n' + error);
        }

        return shader;
    }

    public bind() : void {
        gl.useProgram(this._program);
    }

    public unbind() : void {
        
    }

    public destroy() : void {
        
    }

    public getUniformLocation(name : string) : WebGLUniformLocation {
        return gl.getUniformLocation(this._program, name);
    }

    /**
     * Sets the value of a 32 bits integer uniform
     * @param name uniform name on shader
     * @param value value to set
     */
    public setInt(name : string, value : number) : void {
        gl.uniform1f(this.getUniformLocation(name), value);
    }

    /**
     * Sets the value of a 32 bits precision float uniform
     * @param name uniform name on shader
     * @param value value to set
     */
    public setFloat(name : string, value : number) : void {
        gl.uniform1f(this.getUniformLocation(name), value);
    }

    /**
     * Sets the value of a 32 bits precision float array uniform
     * @param name uniform name on shader
     * @param value value to set
     */
    public setFloatArray(name : string, arrayValue: number[]) : void {
        gl.uniform1fv(this.getUniformLocation(name), new Float32Array(arrayValue));
    }
    
}

export default Shader;