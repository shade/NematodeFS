import RAM from './ram'
import { Transaction, Script } from 'bsv'

export default class TxMaker {
    constructor () {}

    async getFreshOutput (addr: string, pubkey: string): Promise<boolean> {
        // Create the base transaction
        // get the UTXO to spend
        let utxos = await RAM.getUTXOs(addr)
        let count = 0

        var newTx = new Transaction()

        // Add in all the inputs
        utxos.forEach(tx => {
            tx.out.forEach((out, i) => {
                if (out.e.a == addr) {
                    count++
                    newTx.addInput(new Transaction.UnspentOutput({
                        txid: tx.h,
                        vout: i,
                        addr: addr,
                        scriptPubKey: pubkey,
                        satoshi: out.e.v
                    }))
                }
            })
        })

        // Add an output
        newTx.to(addr)

        // Attempt to publish this transaction
        return new Promise<boolean>((resolve, reject) => {
            if (count == 0) {
                reject("No UTXOs found")
            }

            // Serialize, send to the destination.

            resolve(true)
        })

    }

    sendToNullData (data: string) {

    }
}