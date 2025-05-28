import CryptoJS from 'crypto-js'

const secretKey = process.env.DATA_SECRET_HASH_KEY as string;

export const decryptDataFunction = (encryptedData: any) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  const data = JSON.parse(decryptedData)
  return data;
}
