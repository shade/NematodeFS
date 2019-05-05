
import BitIndexSDK from "bitindex-sdk";

let bitindex = new BitIndexSDK()

export default class RAM {
    static getTx(hash: string): Uint8Array {
    
    }

    static getLastTxData(address: string): Uint8Array {}
    

    static getUTXOs(pubkey: string): Promise<any> {
        return bitindex.xpub.getUTXOs(pubkey)
    }
}