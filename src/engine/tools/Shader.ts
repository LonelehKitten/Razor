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
}

export default Shader;