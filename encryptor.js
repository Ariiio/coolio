function generateKey(length) {
    var result = '';
    var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function randShift() {
    return Math.floor(Math.random() * 52);
}

function reverseString(s){
    return s.split("").reverse().join("");
}

function getAsciiValue(text) {
    let list = [];
    for (let i = 0; i < text.length; i++) {
        const num = text.charCodeAt(i);
        list.push(num);
    }

    return list;
}

function encrypt(text) {
    const inputLen = text.length;
    const input = text;
    const key = generateKey(inputLen);
    let inputAscii = getAsciiValue(input);
    let keyAscii = getAsciiValue(key);
    const shift = randShift();

    let key2 = '';
    for (let i = 0; i < inputLen; i++) {
        const num = ((inputAscii[i] + keyAscii[i]) % 128) + 256;
        let char = String.fromCharCode(num);
        key2 += char;
    }
    let key2Ascii = getAsciiValue(key2);

    let almostEncr = '';
    for (let i = 0; i < inputLen; i++) {
        const num = (inputAscii[i] + key2Ascii[i]) + 50;
        let char = String.fromCharCode(num);
        almostEncr += char;
    }

    let encrypted = '';
    for (let i = 0; i < almostEncr.length; i++) {
        const num = almostEncr.charCodeAt(i) + shift;
        const char = String.fromCharCode(num);
        encrypted += char;
    }
    encrypted = reverseString(encrypted);
    const encryptionKey = key2;
    return [shift, input, encryptionKey, encrypted];
}

function decrypt(text, userKey, userShift) {
    let input = text;
    const inputLen = input.length;
    const shift = userShift;
    const key = userKey;
    input = reverseString(input);
    const inputAscii = getAsciiValue(input);
    const keyAscii = getAsciiValue(key);

    let almostDecr = '';
    for (let i = 0; i < inputLen; i++) {
        const num = (inputAscii[i] - keyAscii[i]) - 50;
        const char = String.fromCharCode(num);
        almostDecr += char;
    }

    let decrypted = '';
    for (let i = 0; i < inputLen; i++) {
        const num = almostDecr.charCodeAt(i) - shift;
        const char = String.fromCharCode(num);
        decrypted += char;
    }
    return decrypted;
}

module.exports = {encrypt, decrypt};