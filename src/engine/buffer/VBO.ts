import { gl } from "../gl/GLUtils";
import Float32Buffer from "../utils/Float32Buffer";
import Int32Buffer from "../utils/Int32Buffer";

class VBO {

    _id : WebGLBuffer;
    _buffer : BufferSource;
    _offset : number;
    _created : boolean;
    _isAttribute : boolean;
    
    public constructor(buffer: BufferSource, offset: number, isAttribute: boolean) {
        this._buffer = buffer;
        this._offset = offset;
        this._created = false;
        this._isAttribute = isAttribute;
    }

    public getId(): WebGLBuffer {
        return this._id;
    }

    public setId(id : WebGLBuffer): void {
        this._id = id;
    }

    public getBuffer() : BufferSource {
        return this._buffer;
    }

    public getOffset(): number {
        return this._offset;
    }

    public setCreated(isCreated: boolean) : void{
        this._created = isCreated;
    }

    public isCreated() : boolean {
        return this._created;
    }

    public getType(): number {
        return this._isAttribute ? gl.ARRAY_BUFFER : gl.ELEMENT_ARRAY_BUFFER;
    }
    
    public static storeInt32(data : Int32Array, offset : number, isAttribute : boolean) : VBO {
        let buffer = new Int32Buffer(data.length);
        buffer.put(data);
        return new VBO(buffer, offset, isAttribute);
    }

    public static storeFloat32(data : Float32Array, offset : number, isAttribute : boolean) : VBO {
        let buffer = new Float32Buffer(data.length);
        buffer.put(data);
        return new VBO(buffer, offset, isAttribute);
    }

}

export default VBO;