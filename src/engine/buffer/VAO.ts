
import { gl } from '../gl/GLUtils';
import IResource from '../tools/IResource';
import VBO from './VBO';

class VAO implements IResource {

    private _vboList: VBO[];
    
    public constructor(vboList: VBO[]) {
        this._vboList = [];
        for(const vbo of vboList) {
            if(vbo !== null && vbo !== undefined) {
                this._vboList.push(vbo);
            }
        }
    }

    public create() : void {
        for(let i = 0; i < this._vboList.length; i++) {
            this._createVBO(i, this._vboList[i]);
        }
    }

    private _createVBO(target: number, vbo: VBO) : void {
        vbo.setId(gl.createBuffer());
        gl.bindBuffer(vbo.getType(), vbo.getId());
        gl.bufferData(vbo.getType(), vbo.getBuffer(), gl.STATIC_DRAW);

        if(vbo.getType() === gl.ARRAY_BUFFER) {
            this._setAttributePointer(target, vbo);
        }

        gl.bindBuffer(vbo.getType(), undefined);
    }

    public bind() : void {
        for(let i = 0; i < this._vboList.length; i++) {
            gl.bindBuffer(this._vboList[i].getType(), this._vboList[i].getId());
            if(this._vboList[i].getType() !== gl.ELEMENT_ARRAY_BUFFER) {
                this._setAttributePointer(i, this._vboList[i])
                gl.enableVertexAttribArray(i);
            }
        }
    }

    public unbind() : void {
        for(let i = this._vboList.length-1; i >= 0; i--) {
            gl.bindBuffer(this._vboList[i].getType(), this._vboList[i].getId());
            if(this._vboList[i].getType() !== gl.ELEMENT_ARRAY_BUFFER) {
                gl.disableVertexAttribArray(i);
            }
        }
    }

    public destroy() : void {
        for(let i = this._vboList.length-1; i >= 0; i--) {
            gl.deleteBuffer(this._vboList[i].getId());
        }
    }

    private _setAttributePointer(target: number, vbo: VBO) : void {

        const setAttributePointer = (dataType) => {
            gl.vertexAttribPointer(target, vbo.getOffset(), dataType, false, 0, 0);
        }

        if(vbo.getBuffer() instanceof Int32Array) { 
            setAttributePointer(gl.INT);
        }
        if(vbo.getBuffer() instanceof Float32Array) {
            setAttributePointer(gl.FLOAT);
        }

    }

}

export default VAO;