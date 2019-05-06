
import { BSVKeyPair, IDirINode, ACTION_SATOSHI_AMOUNT, INematode, NETWORK } from './types'
import { createINode } from './inode/inode'
import { Address, HDPrivateKey } from 'bsv'

export class Nematode implements INematode {
    root: BSVKeyPair
    
    constructor (key: BSVKeyPair) {
        if (!key) {
            this.root = this.genKey()
            console.log(this.root)
            return 
        }

        this.root = key
    }

    async getActions(): Promise<number> {
        return new Promise<number>( async (resolve, reject) => {
            let balance = await this.getBalance()
            resolve(balance / ACTION_SATOSHI_AMOUNT)
        })
    }

    getRootAddress(): string {
        return new Address(this.root.hdPublicKey.publicKey, NETWORK, 'pubkeyhash').toString()
    }

    getKey(): BSVKeyPair {
        return this.root
    }

    getRoot(): IDirINode {
        return createINode(this.root.deriveChild(2), this.root, "DIR") as IDirINode
    }

    async getDirFromPath(path: string): Promise<IDirINode> {

        return new Promise<IDirINode>(async (resolve, reject) => {

            if (path[0] != "/") {
                reject("Invalid path supplied")
            }

            let pieces = path.split('/')
            pieces.shift()
            let curdir = this.getRoot()

            // Iterate until we hit the path we want
            while (pieces.length) {
                let dirname = pieces.shift()
                try {
                    curdir = await curdir.getSubDir(dirname)
                } catch (e) {
                    reject(e)
                }
            }

            resolve(curdir)
        })

    }



    private genKey(): BSVKeyPair {
        return new HDPrivateKey(NETWORK)
    }
    private async getBalance(): Promise<number> {
        // TODO: Fill this in
        return new Promise<number>((resolve, reject) => {})
    }
}
