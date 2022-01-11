
class Float32Buffer extends ArrayBuffer {

    public constructor (length: number) {
        super(length);
    }

    /**
     * Put an array of Float32 values within the buffer
     */
    public put(data: Float32Array): void {
        let dataView = new DataView(this);
        for(let i = 0; i  < data.length; i++) {
            if(i == this.byteLength) break;
            dataView.setInt32(i, data[i]);
        }
    }
}

export default Float32Buffer;