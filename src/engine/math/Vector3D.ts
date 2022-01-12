import Vector2D from "./Vector2D";

class Vector3D extends Vector2D {

    private _z: number;

    public constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(x, y);
        this._z = z;
    }

    public getZ() : number {
        return this._z;
    }

    public setZ(z: number) : void{
        this._z = z;
    }
    
}

export default Vector3D;