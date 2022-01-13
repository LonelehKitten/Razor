
class Entity {

    private _name: string;

    public constructor(name: string) {
        this._name = name;
    }

    
    public getName() : string {
        return this._name;
    }

    

}

export default Entity;