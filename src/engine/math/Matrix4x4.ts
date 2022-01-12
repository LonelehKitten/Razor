import Matrix from './Matrix';
import {Tuple} from './MathTypes'

class Matrix4x4 extends Matrix {

    public constructor (
        matrix: 
        [
            [number, number, number, number], 
            [number, number, number, number], 
            [number, number, number, number], 
            [number, number, number, number]
        ] =
        [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ] 
        ) {
        super(matrix);
    }


    protected $validate(index: Tuple<[number, number]>) : void | never {
        if(!(index[0] >= 0 && index[0] <= 3 && index[1] >= 0 && index[1] <= 3)) {
            throw new Error("Matrix4x4 index out of bounds! (Min: 0, Max: 3)");
        }
    }

    public static orthographic(
        left: number,
        right: number,
        top: number,
        bottom: number,
        near: number,
        far: number
    ): Matrix4x4 {
        let matrix: Matrix4x4 = new Matrix4x4();
    
        let rl: number = 1 / (right - left);
        let tb: number = 1 / (top - bottom);
        let fn: number = 1 / (far - near);
    
        matrix.set([0, 0], 2 * rl);
        matrix.set([1, 1], 2 * tb);
        matrix.set([2, 2], -2 * fn)
        matrix.set([3, 0], -(right + left) * rl);
        matrix.set([3, 1], -(top + bottom) * tb);
        matrix.set([3, 2], -(far + near) * fn);
    
        return matrix;
    }

}

export default Matrix4x4;