import VAO from "../../engine/buffer/VAO";
import Entity from "../../engine/core/Entity";
import Renderer from "../../engine/renderer/Renderer";
import Shader from "../../engine/tools/Shader";

class SimpleEntity extends Entity {
    public constructor(name: string, vao: VAO, shader: Shader, renderer: Renderer) {
        super(name, vao, shader, renderer);
    }

    private _ticks: number = 0;

    public update(): void {
        
        this._ticks++

        if(this._ticks === 5) {
            //console.log('updated simple entity');
            
            this.getTransform().getRotation().y += 15
            this.getTransform().getRotation().x += 20
            if(this.getTransform().getRotation().y >= 360) {
                this.getTransform().getRotation().y %= 360
            }
            if(this.getTransform().getRotation().x >= 360) {
                this.getTransform().getRotation().x %= 360
            }
            this._ticks = 0;
        }


    }
}

export default SimpleEntity