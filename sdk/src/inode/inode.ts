import { IDirINode, Serializable, BSVKeyPair, INode, NEMATODE_LOCAL_DIR, NETWORK, ACTION_SATOSHI_AMOUNT } from "../types";
import { makeDirEntry, makeNewEntry, DirEntry } from './direntry'
import { Address } from 'bsv'

import Reader from '../reader'
import DAL from "../tx/dal";

const AUTO_PUBLISH = true

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

        this.child_count = 0
        this.record_count = 0
        this.dirs = []
    }
    
    private string2array (data: string): Uint8Array {
        let nums = []
        for (var i = 0; i < data.length; i++) {
            nums.push(data.charCodeAt(i))
        }

        return new Uint8Array(nums)
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

            this.dirs.push(makeNewEntry(this, arr))
            data = data.slice(len)
        }
    }

    serialize (): Uint8Array {
        if (!this.tx) {
            this.mode = 0
            this.size = 0
            this.bitcom_id = new Uint8Array(20)
        }

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

    refresh (): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let tx = await DAL.getLastTxData(new Address(this.key.hdPublicKey.publicKey, NETWORK).toString())
                this.tx = tx[0]
                let data = this.string2array(tx[0].out[1].ls2)
                this.deserialize(data)
                resolve()
            } catch (e) {
                reject("Refreshing inode did not work")
            }
            
        })
    }

    getAllSubDir (): Promise<string[]> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.refresh()
            } catch (e) {
                reject("Couldn't get it")
                return
            }

            // Map out all the subdirectory stuff
            resolve(this.dirs.map(dir => dir.getName()))
        })
    }

    getSubDir (name: string): Promise<IDirINode> {
        return new Promise (async (resolve, reject) => {
            try {
                await this.refresh()
            } catch (e) {
                reject("Couldn't get it")
            }

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

    getPublishingCost ():number {
        return this.serialize().length / ACTION_SATOSHI_AMOUNT
    }

    // Very expensive operation, should only be called after one, or many operations
    publish () {
        let data = this.serialize().toString()

        // Update or create
        if (this.tx == null) {
            DAL.create(this.key, this.root, data)
        } else {
            DAL.update(this.key, this.root, data)
        }
    }


    addDir (name: string) {
        this.dirs.push(makeDirEntry(this, this.toArr(this.child_count, 4), name))
        this.child_count++
        this.publish()
    }

    addFile () {
        // TODO: Fill this in
    }

    renameEntry (oldname: string, newname:string) {
        // Find the entry by name
        for (var i = 0; i < this.dirs.length; i++) {
            let dir = this.dirs[i]

            // update the name
            if (dir.getName() === oldname) {
                dir.updateName(newname)
            }
        }

        if (AUTO_PUBLISH) {
            this.publish()
        }
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