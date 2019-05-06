import { expect } from "chai"; 
import RAM from "../src/ram";


const TEST_PRIV_KEY = '5Jd7LMJwxKEYHAkBvxMmyBmJHQNj2nZxcQsGCfsf8zbSprhC8uE'
const TEST_ADDR = '1oXxCn7iUEm4nX6keKosNaght21KCrEVa'

const INVALID_TX_HASH = '1234567812345678123456781234567812345678123456781234567812345678'
const VALID_TX_HASH = 'ca0e6ad2c0cb878ce7b17b415a35185a5bab33f1c5f25282fb03e05d2a0740e5'

describe('getTx', function() {
  it('should reject if not found', async () => {
    let tx = null
    try {
      tx = await RAM.getTx(INVALID_TX_HASH)
    } catch (e) {
      expect(e).to.not.equal(null)
    }

    expect(tx).to.equal(null)
  })
  it('should resolve if found', async () => {
    let tx = null
    try {
      tx = await RAM.getTx(VALID_TX_HASH)
    } catch (e) {
      expect(e).to.equal(null)
    }

    expect(tx).to.not.equal(null)
  })
})

describe('getUTXOs', async () => {

  it('should reject if not found', async () => {
    let tx = null
    try {
      tx = await RAM.getUTXOs(TEST_ADDR)
    } catch (e) {
      expect(e).to.equal(null)
    }

    expect(tx).to.not.equal(null)
  })

})