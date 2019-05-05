import bitindex from 'bitindex-sdsk'
import { HDPrivateKey } from 'bsv'
import { BSVKeyPair, NETWORK, ACTION_SATOSHI_AMOUNT } from "./types";
import Directory from "./dir"

const BITCOM_ADDR = '1N2QZZrCs5HKS2SiPLMxyVtywSUfDKChmp'
const BITCOM_HASH = 'e69eb9be65f3120cf2150edf4c0ff4ecdfe67fe1'

export default class Nematode {
    root: BSVKeyPair
    balance: number

    constructor (key: any) {
        if (!key) {
            this.root = this.genKey()
            this.balance = 0
        } else {
            this.root = HDPrivateKey.fromJSON(key)
            this.getBalance().then(this.updateBalance)
        }
    }

    exportKey (): JSON {
        return this.root.toJSON()
    }

    getKey (): BSVKeyPair {
        return this.root
    }

    getActions () {
        return this.balance / ACTION_SATOSHI_AMOUNT
    }

    private genKey(): BSVKeyPair {
        return new HDPrivateKey(NETWORK)
    }

    private updateBalance (utxos: JSON) {

    }

    private async getBalance(): Promise<JSON> {
        return bitindex.xpub.getUtxos(this.root.hdPublicKey.publicKey);
    }
}