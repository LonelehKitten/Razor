import Matrix from './Matrix';
import {Tuple} from './MathTypes'

class Matrix3x3 extends Matrix {

    public constructor(
        matrix: 
        [
            number, number, number, 
            number, number, number, 
            number, number, number
        ] 
        = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ]
        ) {
        super(matrix);
    }


    protected $validate(index: Tuple<[number, number]>) : void | never {
        if(!(index[0] >= 0 && index[0] <= 2 && index[1] >= 0 && index[1] <= 2)) {
            throw new Error("Matrix3x3 index out of bounds! (Min: 0, Max: 2)");
        }
    }

}

export default Matrix3x3;