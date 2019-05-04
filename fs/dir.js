
const DYNAMIC_FOLDER_BIT = 0b00000001

class Folder {
    constructor (dynamic, ptr, name) {
        this.mode = (dynamic ? 1 : 0)
        this.ptr = ptr
        this.name = name
    }

    serialize () {
        folderSize = 2 + 1

        if (this.mode & DYNAMIC_FOLDER_BIT) {
            folderSize += 20
        } else {
            folderSize += 32
        }
    }

    static validateName() {
        if (this.name.indexOf('/') !== -1) {
            throw new Error("Serialization did not work, bad name!")
        }
    }

    static deserialize (buffer) {
        // Add in size
        this.size = buffer[0] + (buffer[1] << 8)
        this.mode = buffer[2]
        
        // Check if it's dynamic or static 
        let cursor = 3
        if (mode & DYNAMIC_FOLDER_BIT) {
            cursor += 20
            this.ptr = buffer.slice(3, 3 + 20)
        } else {
            cursor += 32
            this.ptr = buffer.slice(3, 3 + 32)
        }

        // Get the name length
        let namelen = buffer[cursor]
        namelen += buffer[cursor + 1]

        cursor += 2

        this.name = buffer.slice(cursor, cursor + namelen).toString()
        this.validateName()
    }
}
