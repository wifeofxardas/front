'use strict'
const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const base = alphabet.length

export default class Helper {
  static decode (string) {
    let tmp

    const num = [0]

    for (let i = 0; i < string.length; i++) {
      let digit = alphabet.indexOf(string[i])

      for (let j = 0; j < num.length; j++) {
        tmp = num[j] * base + digit
        num[j] = tmp & 255
        digit = tmp >> 8
      }

      if (digit > 0) {
        num.push(digit)
      }
    }

    return num
      .reverse()
      .map(code => String.fromCharCode(code))
      .join('')
      .slice(1, -4)
  }
}
