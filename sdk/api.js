
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

//    mkdirByPath (path, name) {
//        let parent = _deriveKeyFromPath(path)
//        return mkdir(parent, name)
//    } 

    mkdir (parent, name) {
        newDirKey = _deriveNewKey(parent)

        // TODO: Add update parent index function
    }

    fetchDir (dirkey) {
        // TODO: BitDB Query to fetch the actual directory
        // The actual directory is the last index created by dirkey
        address = new bsv.Address(dirkey.hdPublicKey, LIVENET)
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
