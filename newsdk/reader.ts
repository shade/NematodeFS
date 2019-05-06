
export default class Reader {
    constructor() { }

    readInt (slice: Uint8Array, width: number): number {
        let value = 0
        for (let i = 0; i < width; i++) {
            value += slice[i] << (8 * i)
        }
        return value
    }

    toArr (num: number, bytes: number): number[] {
        let arr = []

        for (var i = 0; i < bytes; i++) {
            arr.push(num & 0xFF)
            num >>= 8
        }

        return arr
    }
}
