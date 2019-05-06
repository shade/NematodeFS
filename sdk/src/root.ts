
import { BSVKeyPair, IDirINode, ACTION_SATOSHI_AMOUNT, INematode } from './types'
import { createINode } from './inode/inode'

export class Nematode implements INematode {
    root: BSVKeyPair

    async getActions(): Promise<number> {
        return new Promise<number>( async (resolve, reject) => {
            let balance = await this.getBalance()
            resolve(balance / ACTION_SATOSHI_AMOUNT)
        })
    }

    getKey(): BSVKeyPair {
        return this.root.deriveChild(2)
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



    private async getBalance(): Promise<number> {
        // TODO: Fill this in
        return new Promise<number>((resolve, reject) => {})
    }
}
