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

  static decode (dec) {
    var decoded = 0
    while (dec) {
      var alphabetPosition = alphabet.indexOf(dec[0])
      var powerOf = dec.length - 1
      decoded += alphabetPosition * (Math.pow(base, powerOf))
      dec = dec.substring(1)
    }
    return decoded
  }

  static unhex (string) {
    if (typeof string !== 'string') {
      return ''
    }
    let res = ''
    for (let i = 0; i < string.length; i += 2) {
      const digit = parseInt(`0x${string.slice(i, i + 2)}`)
      res += String.fromCharCode(digit)
    }
    return res
  }

  static bin2String (array) {
    var result = ''
    for (var i = 0; i < array.length; i++) {
      result += String.fromCharCode(parseInt(array[i], 2))
    }
    return result
  }

  static dec2Bin (d) {
    var b = ''

    for (var i = 0; i < 8; i++) {
      b = (d % 2) + b
      d = Math.floor(d / 2)
    }

    return b
  }
}
