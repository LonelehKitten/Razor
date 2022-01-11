
import { gl } from '../gl/GLUtils';
import IResource from '../tools/IResource';
import Float32Buffer from '../utils/Float32Buffer';
import Int32Buffer from '../utils/Int32Buffer';
import VBO from './VBO';

class VAO implements IResource {

    private _vboList: VBO[];
    
    public constructor(vboList: VBO[]) {
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

            const setAttributePointer = (dataType) => {
                gl.vertexAttribPointer(target, vbo.getOffset(), dataType, false, 0, 0);
            }

            if(vbo.getBuffer() instanceof Int32Buffer) { 
                setAttributePointer(gl.INT);
            }
            if(vbo.getBuffer() instanceof Float32Buffer) {
                setAttributePointer(gl.FLOAT);
            }

        }

        gl.bindBuffer(vbo.getType(), 0);
    }

    public bind() : void {
        for(let i = 0; i < this._vboList.length; i++) {
            if(this._vboList[i].getType() === gl.ELEMENT_ARRAY_BUFFER) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._vboList[i].getId());
                continue;
            }
            gl.enableVertexAttribArray(i);
        }
    }

    public unbind() : void {
        for(let i = this._vboList.length-1; i >= 0; i--) {
            if(this._vboList[i].getType() === gl.ELEMENT_ARRAY_BUFFER) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, 0);
                continue;
            }
            gl.disableVertexAttribArray(i);
        }
    }

    public destroy() : void {
        for(let i = this._vboList.length-1; i >= 0; i--) {
            gl.deleteBuffer(this._vboList[i].getId());
        }
    }

}

export default VAO;