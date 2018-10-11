function encrypt(message, key) {
  var cyphertext = new Array(message.length)
  var carry=0
  for (var i=0;i<message.length;i++) {
    var adj = (3*key.charCodeAt(i%key.length) + 2*carry) % 43
    var code = message.charCodeAt(i) + adj
    code = code % 95 + 32
    cyphertext[i] = String.fromCharCode(code)
    console.log(code)
    carry = message.charCodeAt(i)
  }
  return cyphertext.join("")
}

function decrypt(cyphertext, key) {
  var message = new Array(cyphertext.length)
  var carry=0
  for (var i=0;i<cyphertext.length;i++) {
    var adj = (3*key.charCodeAt(i%key.length) + 2*carry) % 43
    var code = cyphertext.charCodeAt(i) - 32 -adj
    while (code < 32) {
      code += 95;
    }
    while (code >= 127) {
      code -= 95;
    }
    message[i] = String.fromCharCode(code)
    carry = code
  }
  return message.join("")
}