import JSEncrypt from 'jsencrypt';
import { sha256 } from 'js-sha256';
// 加密
export function getEncryCode (str: string, pubKey: string): string | boolean {
  let jse = new JSEncrypt();
  jse.setPublicKey(pubKey);
  let data = jse.encrypt(str.toString());
  return data;
}

// 解密
export function getDecryptCode (str: string, priKey: string) {
  let jse = new JSEncrypt();
  jse.setPrivateKey(priKey);
  let data = jse.decrypt(str.toString());
  return data;
}

export function getSignatureSufix () {
  let now = new Date();
  let month = ((now.getMonth() + 1) > 9) ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
  let currentFormattedDate = now.getFullYear() + '' + month;
  let bytes = stringToByte(currentFormattedDate);
  let sha256Date = sha256(bytes);
  let startIndex = (now.getMonth() + 1) * 3;
  let endIndex = startIndex + 10;
  let sufix = sha256Date.substring(startIndex, endIndex);
  return sufix;
}

function stringToByte (str: string) {
  let bytes = [];
  let len: number, c: number;
  len = str.length;
  for (let i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0);
      bytes.push(((c >> 12) & 0x3F) | 0x80);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0);
      bytes.push((c & 0x3F) | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }
  return bytes;
}

export function getSignature (encryptData: string | boolean, timestamp: string) {
  let signature = encryptData + timestamp + getSignatureSufix();
  let bytes = stringToByte(signature);
  let sha256Signature = sha256(bytes);
  return sha256Signature;
}
