import RAM from './ram'
import { INode, DirINode, BSVKeyPair, NETWORK } from "./types";
import bsv from 'bsv'

export class Dir {
    key: BSVKeyPair
    iNode: DirINode

    constructor (key: BSVKeyPair) {
        if (!key) {
            throw new Error("Cannot create dir without associated key!")
        }

        this.key = key
        this.refresh()
    }

    /**
     * Re-Fetches and parses the inode and data associated with this dir 
     */
    refresh () {
        let pubkey = this.key.hdPublicKey.publicKey
        let addr = new bsv.Address(pubkey, NETWORK, 'pubkey')
        
        let data = RAM.getLastTxData(addr)


        this.iNode.mode = data[0] + (data[1] << 8)
        this.iNode.bitcom_id = data.slice(2, 22)
        this.iNode.size = 0

        // Get the inode size
        for (var i = 0; i < 8; i++) {
            this.iNode.size += data[23 + i] << (8 * i)
        }

        // Update the child_count
        for (var i = 0; i < 4; i++) {
            this.iNode.child_count += data[23 + 8] << (8 * i)
        }

        // Update the record count
        for (var i = 0; i < 4; i++) {
            this.iNode.record_count += data[23 + 8 + 4] << (8 * i)
        }
    }


    private parseEntries() {
        // this.iNode.dirs.push()   
    }
}