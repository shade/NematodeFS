let bsv = require('bsv')

// These are the different filetypes
const IFS_FT_UNKNOWN = 0
const IFS_FT_DIR = 1 << 1
const IFS_FT_REGFILE = 1 << 2
const IFS_FT_DYNLINK = 1 << 3

// Each INode is max N bytes, 1kb long
const INODE_MAX_SIZE = 1024
const SINGLE_INPUT_SIZE = 65 + 71
const SINGLE_OUTPUT_SIZE = 24 + 9

// The amount of data in each opreturn
const CHUNK_SIZE = 65536

class INode {
    constructor () {
        // Should only hold INODE_MAX_SIZE / OUTPUT_SIZE direct blocks
        this.MAX_BLOCKS = ~~((INODE_MAX_SIZE - SINGLE_INPUT_SIZE) / SINGLE_OUTPUT_SIZE)
        this.blocks = []
        this.indblock = []
        this.key = 
        this.open = true
    }

    addBlock (block) {
        if (this.blocks.length === this.MAX_BLOCKS) {
            this.indblock.push(block)
        } else {
            this.blocks.push(block)
        }
    }

    addFile (file) {
        if (!this.open) {
            throw new Error("Inode already used")
        }

        let num_chunks = file.length / NULLDATA_SIZE

        for (var i = 0; i <= num_chunks; i++) {
            chunk = file.slice(CHUNK_SIZE*i, CHUNK_SIZE*(i + 1))
            this.addBlock(chunk)
        }
    }

    publish () {
        // First this inode must be published.
        // Publish all the blocks
    }
}
