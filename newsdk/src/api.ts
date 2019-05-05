
import bsv from 'bsv'
import { BSVKeyPair } from "./types";


const BITCOM_ADDR = '1N2QZZrCs5HKS2SiPLMxyVtywSUfDKChmp'
const BITCOM_HASH = 'e69eb9be65f3120cf2150edf4c0ff4ecdfe67fe1'

class Nematode {
    master: BSVKeyPair
    freeBalance: number

    constructor (key: BSVKeyPair) {
        if (!key) {
            this.master = this.genKey()
            this.balance = 0

            return
        }

        this.master = key
        this.balance = this._getBalance(this.master)
    }

//    mkdirByPath (path, name) {
//        let parent = _deriveKeyFromPath(path)
//        return mkdir(parent, name)
//    } 

    mkdir (parent: BSVKeyPair, name: string) {
        // TODO: Fetch inode information 
        let newDirKey = parent.derive(0)

        // TODO: Add update parent index function
    }

/**

    fetchDir (dirkey) NemaDir {
        // TODO: BitDB Query to fetch the actual directory
        // The actual directory is the last index created by dirkey
        address = new bsv.Address(dirkey.hdPublicKey, LIVENET)
    }

    genKey () BSVKeyPair {

    }

    serveKey (key) {

    }

    _getBalance (key) {
        
    }

    _findDirKey (name) {

    }
*/
}
