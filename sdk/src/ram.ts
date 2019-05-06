let request = require('request-promise')
let btoa = require('btoa')

let BITDB_URL = 'https://chronos.bitdb.network/q'
let BITDB_API_KEY = '1P6o45vqLdo6X8HRCZk8XuDsniURmXqiXo'


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
                    if (tx.t.length == 1) { 
                        resolve(tx.t[0])
                    } else {
                        resolve(tx.t)
                    }
                }
            } catch (e) {
                reject(e)   
            }
        })
    }
}