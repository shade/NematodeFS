
export interface Dir {
    // 2 byte number, the size of this entire directory entry
    record_size: number,

    // 1 byte number: the type of record, folder, file, dynamic, static
    record_type: number,

    // Pointer to either a static resource, or another pubkey inode, or your own child
    static_pointer: Uint8Array[32],
    dynamic_pointer: Uint8Array[20],
    child_pointer: number

    // 1 byte length for name
    name_len: number

    // 256 character name, max
    name: Uint8Array[256]
}

export interface INode {
    // Tells us if this is a directory, a normal file
    mode: number,
    // A 20 byte pubkeyhash related to the type 
    bitcom_id: Uint8Array[20]
    // A 8 byte number telling us how large this file is
    size: number,
    // A 4 byte number telling us how many children inodes have ever been created
    // Set to 0 for files
    children_count: number,
    // A 4 byte number telling us how many records this has, (only for directories)
    // Set to 0 for files
    record_count: number,
}

export interface DirINode extends INode {
    dirs: Dir[]
}

export interface BSVKeyPair {
    privateKey: object
    hdPublicKey: {
        publicKey: object
    }

    derive(child: number): BSVKeyPair
}
