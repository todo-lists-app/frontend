async function generateKey(userid: string, salt: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const baseKey = encoder.encode(userid);
    const key = await window.crypto.subtle.importKey(
        "raw",
        baseKey,
        {name: "PBKDF2"},
        false,
        ["deriveKey"]
    );
    const derivedKey = await window.crypto.subtle.deriveKey(
        {
            "name": "PBKDF2",
            "salt": encoder.encode(salt), // use a unique salt for each user
            "iterations": 100000,
            "hash": "SHA-256"
        },
        key,
        { "name": "AES-GCM", "length": 256},
        true,
        [ "encrypt", "decrypt" ]
    );
    return derivedKey;
}

async function encryptData(userid: string, salt: string, data: string): Promise<{data: ArrayBuffer, iv: Uint8Array}> {
    const derivedKey = await generateKey(userid, salt);
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        derivedKey,
        encodedData
    );
    return {data: encryptedData, iv: iv};
}

async function decryptData(userid: string, salt: string, encryptedData: ArrayBuffer, iv: Uint8Array): Promise<string> {
    const derivedKey = await generateKey(userid, salt);
    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        derivedKey,
        encryptedData
    );
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string) {
    let binaryString = window.atob(base64);
    let len = binaryString.length;
    let bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

function uint8ArrayToBase64(uint8Array: Uint8Array) {
    let binaryString = '';
    for (let i = 0; i < uint8Array.byteLength; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
    }
    return window.btoa(binaryString);
}

function base64ToUint8Array(base64: string) {
    let binaryString = window.atob(base64);
    let bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}


export {
  encryptData,
  decryptData,
  arrayBufferToBase64,
  base64ToArrayBuffer,
  uint8ArrayToBase64,
  base64ToUint8Array
};
