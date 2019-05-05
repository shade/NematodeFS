

export default class Reader {
    constructor() { }

    readInt (slice: Uint8Array, width: number): number {
        let value = 0
        for (let i = 0; i < width; i++) {
            value += slice[i] << (8 * i)
        }
        return value
    }
}