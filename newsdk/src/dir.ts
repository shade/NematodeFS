import RAM from './ram'
import { INode, DirINode, BSVKeyPair } from "./types";

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
        addr = this.key.getAddress()
        RAM.getLastTxData(addr)
    }
}