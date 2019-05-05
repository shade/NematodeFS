
import BitIndexSDK from "bitindex-sdk";

let bitindex = new BitIndexSDK()

export default class RAM {
    static getTx() {
    }

    // Gets the data from the last transaction signed by a given address
    static getLastTxData(address: string):Uint8Array {
        return new Uint8Array(1)
    }

    static getUTXOs(pubkey: string): Promise<any> {
        return bitindex.xpub.getUTXOs(pubkey)
    }
}