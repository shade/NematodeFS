import { create } from "domain";

export const NEMATODE_LOCAL_DIR = 0x1
export const NEMATODE_PUBLIC_DIR = 0x2
export const NEMATODE_STATIC_FILE = 0x3

export const IS_DIR = (mode) => ((mode & 0b11) != 0b11)
export const IS_FILE = (mode) => !IS_DIR(mode)




export interface BSVKeyPair {
    privateKey: object
    hdPublicKey: {
        publicKey: object
    }

    deriveChild(child: number): BSVKeyPair
    toJSON(): JSON
}


export interface IDal {
    /**
     * Assembles all the UTXOs that are connected to this inode and spits out a brand
     * new inode. Will use UTXOs from root, change goes to root as well. 
     * Inode transactions have 3 outputs
     *  Output 0 - the update output (this is spent when we update)
     *  Output 1 - the actual data
     *  Output 2 - the change address (root key)
     * 
     * 
     * @param inodeKey the key to the inode that needs updating
     * @param data The new data to update the inode with
     */
    update(inodeKey: BSVKeyPair, root: BSVKeyPair, data: string): Promise<object>

    /**
     * Creates a brand new inode with data, uses a many-1 transaction, then spends that
     * with a many - 3 transaction.
     * 
     * 
     * @param inodeKey the inode key we're sending data to
     * @param data The data to be sent to
     * @param root The root key, where money is to be sent to.
     */
    create(inodeKey: BSVKeyPair, root: BSVKeyPair, data: string): Promise<object>
}

export interface INematode {
    root: BSVKeyPair

    /**
     * Returns the number of actions that can be made
     * given the current key
     */
    getActions(): Promise<number>

    /** Return ths current BSV key for the root directory */
    getKey(): BSVKeyPair
    
    /** Returns the inode associated with the root directory */
    getRoot(): IDirINode

    /**
     * Returns the inode associated with path, otherwise, null
     * @param path UNIX style path to fetchDirEntry inode from
     * @return {{Promise<IDirINode>}}
     *  resolves to DirInode, or rejects with error message
     */
    getDirFromPath(path: string): Promise<IDirINode>
}

export interface IDirEntry {
    // 2 byte number, the size of this entire directory entry
    record_size: number

    // 1 byte number: the type of record, folder, file, dynamic, static
    record_type: number

    // Pointer to either a static resource, or another pubkey inode, or your own child
    static_pointer: Uint8Array
    dynamic_pointer: Uint8Array
    child_pointer: number

    // 1 byte length for name
    name_len: number

    // 256 character name, max
    name: string
    
    // This the inode for the directory entry
    inode: INode

}

export interface INode {
    // Tells us if this is a directory, a normal file
    mode: number
    // A 20 byte pubkeyhash related to the type 
    bitcom_id: Uint8Array
    // A 8 byte number telling us how large this file is
    size: number
    // A 4 byte number telling us how many children inodes have ever been created
    // Set to 0 for files
    child_count: number
    // A 4 byte number telling us how many records this has, (only for directories)
    // Set to 0 for files
    record_count: number

    // Resyncs the inode with the blockchain
    refresh()
}

export interface IDirINode extends INode {
    dirs: IDirEntry[]

    getSubDir(name: string): Promise<IDirINode>
}


export interface Serializable {
    serialize (): Uint8Array
    deserialize (data: Uint8Array)
}

// It's pretty cheap on mainnet so why bother with testnet?
export const NETWORK = 'mainnet'

export const ACTION_SATOSHI_AMOUNT = 550
export const TRANSACTION_OVERHEAD = 32 + 65 + 73 + 4

export const B_BITCOM_ID = "TODO: FIGURE THIS OUT" 