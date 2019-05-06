import { IDirEntry, Serializable } from "../types";

export class DirEntry implements IDirEntry, Serializable {
    record_size: number
    record_type: number
    static_pointer: Uint8Array
    dynamic_pointer: Uint8Array
    child_pointer: number
    name_len: number
    name: string
    inode: INode

    constructor (inode: INode, data: data) {
        this.inode = inode
        this.deserialize(data)
    }

    serialize (): Uint8Array {

    }

    deserialize (data: Uint8Array) {
        this.record_size = this.
    }
}