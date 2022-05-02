
/* eslint-disable */
export var gl : WebGLRenderingContext = null;

class GLUtils {

    public static init(canvas?: HTMLCanvasElement): HTMLCanvasElement {
        if(!canvas) {
            canvas = document.createElement('canvas') as HTMLCanvasElement;
            document.body.appendChild(canvas);
        }
        gl = canvas.getContext('webgl');
        if(gl === undefined) {
            throw new Error('Unable to initialize WebGL!');
        }

        return canvas;
    }

    public static draw(vaoLength: number) {
        gl.drawElements(gl.TRIANGLES, vaoLength, gl.UNSIGNED_SHORT, 0);
    }

}

export default GLUtils;
