
// Basically, this exists to create the high level UI


class FileSystem {
    constructor (key) {
        if (!key) {
            this.master = this.genKey()
            this.serveKey(this.master)
        }

        this.master = key
        this.balance = this._getBalance(this.master)
    }

    mkdir (parent, name) {
        parentKey = _findDirKey(parent)
        newDirKey = _deriveNewKey(parentKey)

        // TODO: Add update parent index function
    }

    genKey () {

    }

    serveKey (key) {

    }

    _getBalance (key) {
        
    }

    _findDirKey (name) {

    }

    _deriveNewKey (key) {
        // TODO: Fetch inode information
        return key.derive(key)
    }
}
