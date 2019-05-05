
import {IDirEntry } from './types'
import Reader from './reader';

export default class DirEntry extends Reader implements IDirEntry {
    record_size: number
    record_type: number
    static_pointer: Uint8Array
    dynamic_pointer: Uint8Array
    child_pointer: number
    name_len: number
    name: string

    constructor (data: Uint8Array) {
        super()
    }

    serialize (): Uint8Array {
        let arr = [].concat(
            this.toArr(this.record_size, 2),
            this.toArr(this.record_type, 2)
        )

        // TODO: finish serialization function
        return new Uint8Array(arr)
    }
}