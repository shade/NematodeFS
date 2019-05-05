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
    }
}