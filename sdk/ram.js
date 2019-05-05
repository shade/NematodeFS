const request = require('request-promise')

const BASE_URL = 'https://genesis.bitdb.network/q'
const API_KEY = 'qrvgemq5et3yzn6mkxk4pwpkfgm7rrz9mcpk3uy8ha'
const QUERIES = {
    getTxByHash: hash => ({
        "v": 3,
        "q": {
            "find": {
            "tx.h": hash
            },
            "limit": 10
        }
    })
}

export class RAM {
    static getStaticTx () {
        let query = QUERIES.getTxByHash(hash)
        let cQuery = btoa(JSON.stringify(query))

        return request(`${BASE_URL}/${API_KEY}/${cQuery}`)
    }

    static getNode (pubkeyhash) {

    }
}