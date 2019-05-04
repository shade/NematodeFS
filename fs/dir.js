
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
}
