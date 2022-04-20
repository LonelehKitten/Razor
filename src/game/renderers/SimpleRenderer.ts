import Renderer from "../../engine/renderer/Renderer";
import ResourceLoader from "../../engine/core/ResourceLoader";
import { gl } from "../../engine/gl/GLUtils";
import Matrix4x4 from "../../engine/math/Matrix4x4";
import Entity from "../../engine/core/Entity";

class SimpleRenderer extends Renderer {

    private _ortho: Matrix4x4;

    constructor() {
        super('renderer1')
        this._ortho = Matrix4x4.orthographic(
            0, 
            window.innerWidth,
            0,
            window.innerHeight,
            -1,
            100
        );
    }

    public render() {

        ResourceLoader.forEachShader((shader) => {
            shader.bind();
            shader.setMatrix4x4('u_orthographic', this._ortho);

            this.getEntitiesByShader(shader). forEach((entity: Entity) => {
                entity.getVAO().bind()
                gl.drawElements(gl.TRIANGLES, entity.getVAO().getIbo().getLength(), gl.UNSIGNED_SHORT, 0);
                entity.getVAO().unbind();
            })
        })

    }
}

export default SimpleRenderer