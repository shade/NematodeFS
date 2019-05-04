let bsv = require('bsv')

class Block {
    constructor (keys, data) {
        this.keys = keys
        this.data = data
    }

    /**
     * Publishes the entire block to the bitcoin network
     * 
     * @param {String} prevTxHash The hash of the transaction we're spending
     * @param {Number} prevTxIndex The index of the transaction we're spending
     */
    publish (prevTxHash, prevTxIndex) {      
        // Create transaction
        const tx = new bsv.Transaction()
        tx.setVersion(1)
        tx.addInput(prevTxHash, prevTxIndex)
        tx.addData(this.data)

        // Push transaction to the network
        networkPush(tx.serialize())
    }
}

