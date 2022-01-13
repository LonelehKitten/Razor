import Entity from "./Entity";

class EntityManager {

    private _entities: Map<string, Entity>;
    private _visible: Map<string, Entity>;
    private _hidden: Map<string, Entity>;

    public constructor() {
        this._entities = new Map<string, Entity>();
    }

    public add(entity: Entity, visible: boolean = true): void {
        const key: string = this._validate(entity, this._entities);
        this._entities.set(entity.getName(), entity);
        this[visible ? '_visible' : '_nonVisible']
            .set(entity.getName(), entity);
    }

    public remove(entity: Entity|string): void {
        const key: string = this._validate(entity, this._entities, false);
        this._entities.delete(entity as string);
        if(this._visible.has(key)) {
            this._entities.delete(key);
        }
        if(this._hidden.has(key)) {
            this._entities.delete(key);
        }
    }

    public setVisibility(entity: Entity|string, visible: boolean): void|never {
        const key: string = this._validate(entity, this._entities, false);
        if(visible) {
            this._visible.set(key, this._hidden.get(key));
            this._hidden.delete(key);
        } else {
            this._hidden.set(key, this._visible.get(key));
            this._visible.delete(key);
        }
    }

    public get(name: string): Entity {
        return this._get(name, this._entities);
    }

    public getFromVisible(name: string): Entity {
        return this._get(name, this._visible);
    }

    public getFromHidden(name: string): Entity {
        return this._get(name, this._hidden);
    }

    private _get(name: string, map: Map<string, Entity>): Entity {
        this._validate(name, map, false);
        return map.get(name);
    }

    public getKeys(): string[] {
        return this._keys(this._entities);
    }

    public getKeysFromVisible(): string[] {
        return this._keys(this._visible);
    }

    public getKeysFromHidden(): string[] {
        return this._keys(this._hidden);
    }

    private _keys = (map: Map<string, Entity>): string[] => [...map.keys()];

    public forEach(fn: (entity: Entity, key?: string) => void): void {
        this._forEach(fn, this._entities);
    }

    public forEachVisible(fn: (entity: Entity, key?: string) => void): void {
        this._forEach(fn, this._visible);
    }

    public forEachHidden(fn: (entity: Entity, key?: string) => void): void {
        this._forEach(fn, this._hidden);
    }

    private _forEach(fn: (entity: Entity, key?: string) => void, map: Map<string, Entity>): void {
        for(let key in map) {
            fn(map.get(key), key);
        }
    }

    private _validate(entity: Entity|string, map: Map<string, Entity>, exists: boolean = true): string|never {
        const name = entity instanceof Entity ? entity.getName() : entity;
        if(exists && map.has(name)) {
            throw new Error('Entity ' + name + 'already exists!');
        }
        if(!exists && !map.has(name)) {
            throw new Error('Entity ' + name + 'does not exists!');
        }
        return name;
    }

}

export default EntityManager;