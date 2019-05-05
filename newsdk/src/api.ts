import bsv from 'bsv'
import { BSVKeyPair, NETWORK } from "./types";
import Directory from "./dir"

const BITCOM_ADDR = '1N2QZZrCs5HKS2SiPLMxyVtywSUfDKChmp'
const BITCOM_HASH = 'e69eb9be65f3120cf2150edf4c0ff4ecdfe67fe1'

class Nematode {
    root: BSVKeyPair
    balance: number

    constructor (key: BSVKeyPair) {
        if (!key) {
            this.root = this.genKey()
            this.balance = 0
        }

        this.root = key
    }

    getKey (): BSVKeyPair {
        return this.root
    }

    private genKey(): BSVKeyPair {
        return new bsv.HDPrivateKey(NETWORK)
    }
}