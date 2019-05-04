
// Each INode is max N bytes, 1kb long
const INODE_MAX_SIZE = 1024
const SINGLE_INPUT_SIZE = 65 + 71
const SINGLE_OUTPUT_SIZE = 24 + 9

// The amount of data in each opreturn
const NULLDATA_SIZE = 65536

class INode {
    constructor () {
        // Should only hold INODE_MAX_SIZE / OUTPUT_SIZE direct blocks
        this.MAX_BLOCKS = ~~((INODE_MAX_SIZE - SINGLE_INPUT_SIZE) / SINGLE_OUTPUT_SIZE)
        this.blocks = []
        this.indblock = []

        this.open = true
    }

    addBlock (block) {
        if (this.blocks.length === this.MAX_BLOCKS) {
            this.indblock.push(block)
        }
    }

    addFile (file) {
        if (!this.open) {
            throw new Error("Inode already used")
        }

        let num_chunks = file.length / NULLDATA_SIZE
        for (var i = 0; i < num_chunks; i++) {
            this.addBlock()
        }
    }
}
