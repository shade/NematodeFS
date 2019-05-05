import { BSVKeyPair, Dir, DirINode } from "./types";


export interface INematode {
    rootKey: BSVKeyPair
    rootDir: DirINode

    /**
     * Returns the number of actions that can be made
     * given the current key
     */
    getActions(): number

    /**
     * Return ths current BSV key for the root directory
     */
    getKey(): BSVKeyPair
    
    /**
     * Returns the inode associated with the root directory
     */
    getRoot(): DirINode

    /**
     * 
     * @param path UNIX style path to fetch dir inode from
     */
    getDirFromPath(path: string): DirINode
}
