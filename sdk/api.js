
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
    }

    _getBalance (key) {
        
    }

    _findDirKey (name) {

    }


}
