import RAM from '../ram'
import { INode, IDirINode, IDirEntry, BSVKeyPair, NETWORK } from "../types";
import bsv from 'bsv'
import Reader from '../reader'

export default class DirINode extends Reader implements IDirINode {
    key: BSVKeyPair

    mode: number
    bitcom_id: Uint8Array
    size: number
    child_count: number
    record_count: number
    dirs: IDirEntry[]

    constructor (key: BSVKeyPair) {
        super()
        if (!key) {
            throw new Error("Cannot createDirEntry without associated key!")
        }

        this.key = key
        this.refresh()
    }

    /**
     * Re-Fetches and parses the inode and data associated with thisDirEntry 
     */
    async refresh () {
        let pubkey = this.key.hdPublicKey.publicKey
        let addr = new bsv.Address(pubkey, NETWORK, 'pubkey')
        
        let data = await RAM.getLastTxData(addr)


        this.mode = this.readInt(data, 2)
        this.bitcom_id = data.slice(2, 22)
        this.size = this.readInt(data.slice(23), 8)
        this.child_count = this.readInt(data.slice(31), 4)
        this.record_count = this.readInt(data.slice(35), 4)
        
        this.parseEntries(data.slice(39))
    }

    async getSubDir(name: string): Promise<IDirINode> {
        await this.refresh()

        return new Promise<IDirINode>((resolve, reject) => {
            this.dirs.forEach((dir: IDirEntry) => {
                if (dir.name == name) {
                    if (dir.isDir()) {
                        resolve(dir.inode as IDirINode)
                    } else {
                        reject("Directory Not found!")
                    }
                }
            })

            reject("Not found!")
        })
    }

    createDir () {
        this.refresh()
        this.child_count++

        this.serialize()
    }

    addDynEntry (ptr: string ) {

    }

    addStatEntry (ptr) {

    }
    
    removeEntry (name) {
        // Just refresh in case we missed something in that period of time
        this.refresh()
    }

    private parseEntries(data: Uint8Array) {
        for (var i = 0; i < this.record_count; i++) {
            // TODO: parse Folder entry,
            // Push folder entry
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
}