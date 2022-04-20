import VAO from "../../engine/buffer/VAO";
import Entity from "../../engine/core/Entity";
import Renderer from "../../engine/renderer/Renderer";
import Shader from "../../engine/tools/Shader";

class SimpleEntity extends Entity {
    public constructor(name: string, vao: VAO, shader: Shader, renderer: Renderer) {
        super(name, vao, shader, renderer);
    }

    public update(): void {

    }
}

export default SimpleEntity