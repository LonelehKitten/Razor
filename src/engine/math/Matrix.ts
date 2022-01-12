import {Tuple} from './MathTypes'

abstract class Matrix {

    private _matrix: number[][];

    protected constructor(matrix: number[][]) {
        this._matrix = matrix;
    }

    public set(index: Tuple<[number, number]>, value: number): void {
        this.$validate(index);
        this._matrix[index[0]][index[1]] = value;
    }

    public get(index: Tuple<[number, number]>): number {
        this.$validate(index);
        return this._matrix[index[0]][index[1]];
    }

    protected abstract $validate(index: Tuple<[number, number]>) : void | never;

    public getMatrix(): number[][] {
        return this._matrix;
    }

    public toArray(): Float32Array {
        let array: number[] = [];
        for(const row of this._matrix) {
            for(const value of row) {
                array.push(value);
            }
        }
        console.log(this._matrix)
        console.log(array);
        //throw new Error('debug')
        
        return new Float32Array(array);
    }

}

export default Matrix;