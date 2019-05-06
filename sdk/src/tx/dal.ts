// Data Access Layer
import * as request from 'request-promise'
import * as btoa from 'btoa'

import { IDal, BSVKeyPair, NETWORK } from '../types'
import bsv from 'bsv'

let BITDB_URL = 'https://genesis.bitdb.network/q'
let BITDB_API_KEY = '1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN'
let BITINDEX_API_KEY = '35JGWtfhEKn7N3oPHustAh4uuQEfyBXJBbx5gRYMicpvzXPatmpYcGQqrmBgw3M2oe'

// This should be a singleton but ignore, pretend it implements IDal
export default class DAL {

    static update(inodeKey: BSVKeyPair, root: BSVKeyPair, data: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            let addr = new bsv.Address(inodeKey.hdPublicKey.publicKey, NETWORK).toString()
            let rootAddr = new bsv.Address(root.hdPublicKey.publicKey, NETWORK).toString()
            let newTx = new bsv.Transaction()
            let utxos = await DAL.getAllUTXOs(addr)
            // Add in all the inputs
            utxos.forEach(tx => {
                tx.out.forEach((out, i) => {
                    if (out.e.a == addr) {
                        newTx.addInput(new bsv.Transaction.UnspentOutput({
                            txid: tx.h,
                            vout: i,
                            addr: addr,
                            scriptPubKey: inodeKey.hdPublicKey.publicKey,
                            satoshi: out.e.v
                        }))
                    }
                })
            })

            // Add an output
            newTx.to(addr, 546)
            // Add in the data
            newTx.addData(data)
            // Add in the change
            newTx.change(rootAddr)
            // Sign everything!
            newTx.sign(inodeKey, root)

            // Serialize and broadcast
            this.broadcastStr(newTx.serialize())
        })
    }

    static create(inodeKey: BSVKeyPair, root: BSVKeyPair, data: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            let addr = new bsv.Address(inodeKey.hdPublicKey.publicKey, NETWORK).toString()
            let rootAddr = new bsv.Address(root.hdPublicKey.publicKey, NETWORK).toString()

            // First transaction is a many to 1, via the root key
            let firstTx = new bsv.Transaction()
            firstTx.from(rootAddr)
            firstTx.to(addr)
            firstTx.sign(root)
            let firstTxId = null
            try {
                firstTxId = await this.broadcastStr(firstTx.serialize())
            } catch (e) {
                reject(e)
            }

            // Second transaction is a 1 to 3, returning change to the root key
            let secondTx = new bsv.Transaction()
            secondTx.addInput(new bsv.Transaction.UnspentOutput({
                txid: firstTxId,
                vout: 0,
                addr: addr,
                scriptPubKey: inodeKey.hdPublicKey.publicKey,
                // This is a bit hacky... I guess this is a hackathon
                satoshi: firstTx._getOutputAmount()
            }))
        })
    }


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

    static getLastTxData(address: string): Promise<JSON> {
        let query = btoa(JSON.stringify({
            "v": 3,
            "q": {
              "find": {
                "tx.h": address
              },
              "limit": 1
            }
        }))

        return this.sendBITDBRequest(query)
    }
    

    static getAllUTXOs(address: string): Promise<any> {
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

                let txs = tx.u.concat(tx.c)
                if (txs.length == 0) {
                    reject("Not found")
                } else {
                    resolve(txs)
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
