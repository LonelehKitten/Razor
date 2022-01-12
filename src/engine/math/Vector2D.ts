
class Vector2D {

    private _x: number;
    private _y: number;

    public constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }
    
    public getX() : number {
        return this._x;
    }

    public getY() : number{
        return this._y;
    }

    public setX(x: number) : void{
        this._x = x;
    }

    public setY(y: number) : void{
        this._y = y;
    }
    

}

export default Vector2D;