import { IDirINode, Serializable, BSVKeyPair, INode, NEMATODE_LOCAL_DIR } from "../types";
import DirEntry from './direntry'
import Reader from '../reader'

export class DirINode extends Reader implements IDirINode, Serializable {
    root: BSVKeyPair
    key: BSVKeyPair
    
    tx: object

    bitcom_id: Uint8Array
    mode: number
    size: number
    child_count: number
    record_count: number

    dirs: DirEntry[]

    constructor (key: BSVKeyPair, root: BSVKeyPair) {
        super()

        this.root = root
        this.key = key
        // Fetch the null data associated with this pubkey
        this.tx = []
        this.deserialize(this.tx)
        // If there is nothing here, that's alright too.
    }
    
    deserialize (data: Uint8Array) {
        this.mode = this.readInt(data, 2)
        this.bitcom_id = data.slice(2, 22)
        this.size = this.readInt(data.slice(23), 8)
        this.child_count = this.readInt(data.slice(31), 4)
        this.record_count = this.readInt(data.slice(35), 4)
        
        
        for (var i = 0; i < this.record_count; i++) {
            let len = this.readInt(data, 2)
            let arr = data.slice(0, len)

            this.dirs.push(new DirEntry(arr))
            data = data.slice(len)
        }
    }

    serialize (): Uint8Array {

        // Convert the header to a byte string 
        let arr = this.toArr(this.mode, 2)
            .concat(Array.from(this.bitcom_id))
            .concat(this.toArr(this.size, 8))
            .concat(this.toArr(this.child_count, 4))
            .concat(this.toArr(this.record_count, 4))
        
        this.dirs.forEach(dir => {
            arr = arr.concat(Array.from(dir.serialize()))
        })

        return new Uint8Array(arr)
    }

    refresh () {
        
    }

    getSubDir (name: string): Promise<IDirINode> {
        return new Promise (async (resolve, reject) => {
            await this.refresh()
            
            for (var i = 0; i < this.dirs.length; i++) {
                let dir = this.dirs[i]
                
                if (dir.getName() === name) {
                    // Create new INode with this pubkey
                    if (dir.record_type === NEMATODE_LOCAL_DIR) {
                        let subkey = this.key.deriveChild(dir.child_pointer)
                        resolve(createINode(subkey, this.root, "DIR") as DirINode)
                        return
                    } else {
                        reject("Invalid entry type, may be unmodifiable")
                        // TODO: Add public allowable editable entries
                    }
                }
            }

            reject("Could not find entry :(")
        })
    }
}


export function createINode (pubkey, root, type): INode {
    switch (type) {
        case 'DIR':
            return new DirINode(pubkey, root)
        break
        case 'FILE':
            throw "File Inode creation unsupported for now!"
        break
    }
}