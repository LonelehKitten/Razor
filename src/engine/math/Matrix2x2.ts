import Matrix from './Matrix';
import {Tuple} from './MathTypes'

class Matrix2x2 extends Matrix {

    public constructor(
        matrix: 
        [
            number, number, 
            number, number
        ] 
        = [
            1, 0,
            0, 1
        ]
        ) {
        super(matrix);
    }

    protected $validate(index: Tuple<[number, number]>) : void | never {
        if(!(index[0] >= 0 && index[0] <= 1 && index[1] >= 0 && index[1] <= 1)) {
            throw new Error("Matrix2x2 index out of bounds! (Min: 0, Max: 1)");
        }
    }


}

export default Matrix2x2;