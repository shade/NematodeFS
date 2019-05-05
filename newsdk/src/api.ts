import bitindex from 'bitindex-sdk'
import { HDPrivateKey } from 'bsv'
import {
    BSVKeyPair,
    NETWORK,
    ACTION_SATOSHI_AMOUNT, 
    TRANSACTION_OVERHEAD, 
    DirINode
    INematode } from "./types";

import Directory from "./dir"
import Dir from './dir';

const BITCOM_ADDR = '1N2QZZrCs5HKS2SiPLMxyVtywSUfDKChmp'
const BITCOM_HASH = 'e69eb9be65f3120cf2150edf4c0ff4ecdfe67fe1'


export default class Nematode implements INematode {
    rootKey: BSVKeyPair
    rootDir: DirINode
    balance: number


    getActions(): number {
        this.updateBalance()
        return this.balance / ACTION_SATOSHI_AMOUNT
    }

    getKey(): BSVKeyPair {
        return this.rootKey
    }
    
    getRoot(): DirINode {
        return this.rootDir
    }

    async updateBalance(): Promise<number> {
        let pubkey = this.rootKey.hdPublicKey.publicKey
        let utxos = await RAM.getUTXOs(pubkey)

        return utxos.reduce((prev, cur): number => {
            return prev + cur.value - TRANSACTION_OVERHEAD
        }, 0)
    }

    async getDirFromPath(path: string): Promise<DirINode> {
        return new Promise<DirINode>((resolve, reject) => {

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
}



