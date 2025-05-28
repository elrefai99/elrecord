import CryptoJS from 'crypto-js'

const secretKey = process.env.DATA_SECRET_HASH_KEY as string;

export const encryptDataFunction = (data: any) => {
  let encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString()
  return encrypted;
}
