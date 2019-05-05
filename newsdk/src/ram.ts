import request from 'request-promise'
import BitIndexSDK from "bitindex-sdk";

let bitindex = new BitIndexSDK()

let BITDB_URL = 'https://chronos.bitdb.network/q'
let BITDB_API_KEY = '1P6o45vqLdo6X8HRCZk8XuDsniURmXqiXo'


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