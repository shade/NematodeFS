let request = require('request-promise')
let btoa = require('btoa')

let BITDB_URL = 'https://chronos.bitdb.network/q'
let BITDB_API_KEY = '1P6o45vqLdo6X8HRCZk8XuDsniURmXqiXo'
let BITINDEX_API_KEY = '35JGWtfhEKn7N3oPHustAh4uuQEfyBXJBbx5gRYMicpvzXPatmpYcGQqrmBgw3M2oe'

export default class RAM {
    static getTx(hash: string): Promise<JSON> {
        let query = btoa(JSON.stringify({
            "v": 3,
            "q": {
              "find": {
                "tx.h": hash
              },
              "limit": 1
            }
        }))

        return this.sendBITDBRequest(query)
    }

    static getLastTxData(address: string): Uint8Array {
        let query = btoa(JSON.stringify({
            "v": 3,
            "q": {
              "find": {
                "tx.h": address
              },
              "limit": 1
            }
        }))

        return request.get(query)
    }
    

    static getUTXOs(address: string): Promise<any> {
        let query = btoa(JSON.stringify({
            "v": 3,
            "q": {
              "find": {
                "out.e.a": address
              },
              "limit": 20
            }
          }))

        return this.sendBITDBRequest(query)
    }

    static sendBITDBRequest(query: string): Promise<any> {
        let url = [
            BITDB_URL,
            BITDB_API_KEY,
            query
        ].join('/')

        return new Promise<any>(async (resolve, reject) => {
            try {
                let tx = await request({
                    url: url,
                    headers: {
                        'key': BITDB_API_KEY
                    },
                    json: true
                })
                if (tx.t.length == 0) {
                    reject("Not found")
                } else {
                    resolve(tx.t)
                }
            } catch (e) {
                reject(e)   
            }
        })
    }

    static broadcastRaw (raw: Uint8Array): Promise<string> {
        // Convert to hex, broadcast
        let str = Array.prototype.map
            .call(raw, x => ('00' + x.toString(16)).slice(-2))
            .join('')

        return this.broadcastStr(str)
    }

    static broadcastStr (txstr: string): Promise<string> {
        return new Promise<string>(async (resolve, reject) => {
            try {
                let opts = {
                    method: 'POST',
                    uri: 'https://api.bitindex.network/api/v3/main/tx/send',
                    body: {
                        rawtx: txstr
                    },
                    headers: {
                        'api_key': BITINDEX_API_KEY
                    },
                    json: true // Automatically stringifies the body to JSON
                };

                let { txid } = await request(opts)
                if (txid) {
                    resolve(txid)
                } else {
                    reject("Bad request....")
                }
            } catch (e) {
                reject(e)
            } 
        })
    }
}