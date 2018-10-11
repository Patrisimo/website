function verify(s) {
  for (var i=0;i<s.length;i++) {
    if (s.charCodeAt(i) >= 127 || s.charCodeAt(i) < 32) {
      alert('Text "' + s + '" has invalid character "' + s.charAt(i) + '"');
      return false;
    }
  }
  return true;
}
/***
Takes a String message and a String key, consisting only of 
ascii characters between 32 and 126, and produces cyphertext.
The i'th character of the cyphertext is computed by
1. Setting the "carry" value to be the ascii code of the (i-1)th
    character of the message (0 if i=0)
2. Compute the adjustment: 3*(ascii code of the i'th character of 
    the key, wrapping) + 2*carry, modulo 43
3. The ascii code for the i'th character of the cyphertext is then 
    the sum of the adjustment and the ascii code for the i'th 
    character of the message, put in the range [32,127)
***/
function encrypt(message, key) {
  if (!verify(message) || !verify(key)) { // only characters between 32 and 126 allowed
    return;
  }
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

/***
Do the encryption, but in reverse
***/
function decrypt(cyphertext, key) {
  if (!verify(cyphertext) || !verify(key)) {
    return;
  }
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