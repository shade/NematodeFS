
import { 
    IDirEntry,
    Serializable,
    NEMATODE_LOCAL_DIR,
    NEMATODE_PUBLIC_DIR,
    NEMATODE_STATIC_FILE
} from "../types";

import Reader from '../reader'

export class DirEntry extends Reader implements IDirEntry, Serializable {
    record_size: number
    record_type: number
    static_pointer: Uint8Array
    dynamic_pointer: Uint8Array
    child_pointer: number
    name_len: number
    name: string
    inode: INode

    constructor (inode: INode) {
        super()
        this.inode = inode
    }

    serialize (): Uint8Array {
        // We push in the length at the end
        let record = this.toArr(this.record_type, 2)
    
        switch (this.record_type) {
            case NEMATODE_LOCAL_DIR:
                record = record.concat(this.toArr(this.child_pointer, 4))
            break
            case NEMATODE_PUBLIC_DIR:
                record = record.concat(Array.from(this.dynamic_pointer))
            break
            case NEMATODE_STATIC_FILE:
                record = record.concat(Array.from(this.static_pointer))
            break
        }


        for (var i = 0; i < this.name_len; i ++) {
            record.push(this.name[0].charCodeAt(0))
        }
            
        this.record_size = record.length + 2
        record = this.toArr(this.record_size, 2).concat(record)
        
        return new Uint8Array(record)
    }

    deserialize (data: Uint8Array) {
        // Chop off the record size
        data = data.slice(2)

        // Read in record type
        this.record_type = this.readInt(data, 2)
        data = data.slice(2)

        // Read in record info
        switch (this.record_type) {
            case NEMATODE_LOCAL_DIR:
                this.child_pointer = this.readInt(data, 4)
                data = data.slice(4)
            break
            case NEMATODE_PUBLIC_DIR:
                this.dynamic_pointer = data.slice(0, 20)
                data = data.slice(20)
            break
            case NEMATODE_STATIC_FILE:
                this.static_pointer = data.slice(0, 32)
                data = data.slice(32)
            break
        }

        // Finally name
        this.name_len = data[0]
        data = data.slice(0)

        this.name = String.fromCharCode(...data.slice(0, this.name_len))
    }

    set(attribute: string, value: any) {
        this[attribute] = value
    }
}




export function makeBEntry (name, hash, inode) {
    let entry = new DirEntry(inode)
    entry.set('record_type', B_BITCOM_ID)
    entry.set('')
}

export function makeDirEntry () {
    
}

export function makeNewEntry (inode, data) {
    let entry = new DirEntry(inode)
    entry.deserialize(data)
}
