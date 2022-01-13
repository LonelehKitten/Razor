import Entity from "./Entity";

class EntityManager {

    /* All entities */
    private _entities: Map<string, Entity>;
    /* Only visible entities */
    private _visible: Map<string, Entity>;
    /* Only hidden entities */
    private _hidden: Map<string, Entity>;

    public constructor() {
        this._entities = new Map<string, Entity>();
    }

    /**
     * Adds a new entity, visible by default
     * @param entity entity or the name of the entity to be added
     * @param visible default visibility
     */
    public add(entity: Entity, visible: boolean = true): void {
        const key: string = this._validate(entity, this._entities);
        this._entities.set(entity.getName(), entity);
        this[visible ? '_visible' : '_nonVisible']
            .set(entity.getName(), entity);
    }

    /**
     * Remove an existent entity
     * @param entity entity or the name of the entity to be removed
     */
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

    /**
     * Sets the visibility of an existent entity
     * @param entity entity or the name of the entity to have the visibility changed
     * @param visible the visibility value
     */
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

    /**
     * Returns an existent entity
     * @param entity the name of the entity to be returned
     */
    public get(name: string): Entity {
        this._validate(name, this._entities, false);
        return this._entities.get(name);
    }

    /**
     * Returns the keys of all entities
     */
    public getKeys(): string[] {
        return this._keys(this._entities);
    }

    /**
     * Returns the keys of only the visible entities
     */
    public getKeysFromVisible(): string[] {
        return this._keys(this._visible);
    }

    /**
     * Returns the keys of only the hidden entities
     */
    public getKeysFromHidden(): string[] {
        return this._keys(this._hidden);
    }

    /**
     * Common behavior pattern for 'getKeys' methods
     */
    private _keys = (map: Map<string, Entity>): string[] => [...map.keys()];

    /**
     * Iterates all entities
     * @param fn do something with each entity
     */
    public forEach(fn: (entity: Entity, key?: string) => void): void {
        this._forEach(fn, this._entities);
    }

    /**
     * Iterates visible entities
     * @param fn do something with each entity
     */
    public forEachVisible(fn: (entity: Entity, key?: string) => void): void {
        this._forEach(fn, this._visible);
    }
    /**
     * Iterates hidden entities
     * @param fn do something with each entity
     */
    public forEachHidden(fn: (entity: Entity, key?: string) => void): void {
        this._forEach(fn, this._hidden);
    }

    /**
     * Common behavior pattern for 'forEach' methods
     * @param fn do something with each entity
     * @param map map to be iterated
     */
    private _forEach(fn: (entity: Entity, key?: string) => void, map: Map<string, Entity>): void {
        for(let key in map) {
            fn(map.get(key), key);
        }
    }

    /**
     * Checks if there is a given entity
     * @param entity entity or the name of the entity to be checked
     */
    public has(entity: Entity|string): boolean {
        return this._has(entity, this._entities);
    }

    /**
     * Checks if there is a given entity among the visibles
     * @param entity entity or the name of the entity to be checked
     */
    public hasInVisible(entity: Entity|string): boolean {
        return this._has(entity, this._visible);
    }

    /**
     * Checks if there is a given entity among the hiddens
     * @param entity entity or the name of the entity to be checked
     */
    public hasInHidden(entity: Entity|string): boolean {
        return this._has(entity, this._hidden);
    }

    /**
     * Common behavior pattern for 'has' methods
     * @param entity entity or the name of the entity to be checked
     * @param map map to be iterated
     */
    private _has(entity: Entity|string, map: Map<string, Entity>): boolean {
        const name = this._getName(entity);
        return map.has(name);
    }

    /**
     * Validates the existence or not of a given entity in a given map and
     * returns the entity key in case of success.
     * Fail case is defined by 'exists' param.
     * @param entity entity or the name of the entity to be validated
     * @param map map where entity should exists or not
     * @param exists fail case of the validation
     * @returns the entity name
     */
    private _validate(entity: Entity|string, map: Map<string, Entity>, exists: boolean = true): string|never {
        const name = this._getName(entity);
        if(exists && map.has(name)) {
            throw new Error('Entity ' + name + 'already exists!');
        }
        if(!exists && !map.has(name)) {
            throw new Error('Entity ' + name + 'does not exists!');
        }
        return name;
    }

    /**
     * Resolves the entity name
     * @param entity entity or the name of the entity to be resolved
     */
    private _getName(entity: Entity|string): string {
        return entity instanceof Entity ? entity.getName() : entity;
    }

}

export default EntityManager;