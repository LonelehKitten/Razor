import Entity from "../core/Entity";
import ResourceLoader from "../core/ResourceLoader";
import Scene from "../core/Scene";
import { gl } from "../gl/GLUtils";
import Matrix4x4 from "../math/Matrix4x4";
import Shader from "../tools/Shader";

abstract class Renderer {

    private _name: string;

    private _scene: Scene;

    protected constructor(name: string) {
        this._name = name;
    }

    protected getEntitiesByShader(shader: Shader): Entity[] {
        return this._scene.filterVisible(
            (entity: Entity) => 
                entity.getRenderer().getName() === this._name &&
                entity.getShader().getName() === shader.getName()
        )
    }

    public abstract render(): void;

    public getName(): string { 
        return this._name
    }

    public setScene(scene: Scene) {
        this._scene = scene;
    }
}

export default Renderer