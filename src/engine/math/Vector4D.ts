import Vector3D from "./Vector3D";

class Vector4D extends Vector3D {

    private _w: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        super(x, y, z);
        this._w = w;
    }

    public getW() : number {
        return this._w;
    }

    public setW(w: number) : void{
        this._w = w;
    }
    
}

export default Vector4D;