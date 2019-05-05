import request from 'request-promise'
import BitIndexSDK from "bitindex-sdk";

let bitindex = new BitIndexSDK()

export default class RAM {
    static getTx(hash: string): JSON {
        let url = [
            BITDB_URL,
            BITDB_API_KEY,
            query
        ].join('/')

        return request.get(url)
    }

    static getLastTxData(address: string): Uint8Array {
        let url = [
            BITDB_URL,
            BITDB_API_KEY,
            query
        ].join('/')

        return request.get(url)
    }
    

    static getUTXOs(pubkey: string): Promise<any> {
        return bitindex.xpub.getUTXOs(pubkey)
    }
}