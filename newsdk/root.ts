
import { BSVKeyPair, IDirINode, ACTION_SATOSHI_AMOUNT } from './types'
import DirINode from './inode'

class Nematode {
    root: BSVKeyPair


    async getActions(): Promise<number> {
        return new Promise<number>( async (resolve, reject) => {
            let balance = await this.getBalance()
            resolve(balance / ACTION_SATOSHI_AMOUNT)
        })
    }

    getKey(): BSVKeyPair {
        return this.root
    }

    getRoot(): IDirINode {
        return DirINode.createINode(this.root, this.root) as IDirINode
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



    private async getBalance(): number {

    }
}
