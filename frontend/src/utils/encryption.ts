import { AES } from 'crypto-js';
import encUtf8 from 'crypto-js/enc-utf8';

const encryptionKey: string = import.meta.env.VITE_STORAGE_KEY;

export const encryptData = (data: string): string => {
  const encryptedData = AES.encrypt(
    JSON.stringify(data),
    encryptionKey
  ).toString();
  return encryptedData;
};

export const decryptData = (encryptedData: string): string => {
  const decryptedData = AES.decrypt(encryptedData, encryptionKey).toString(
    encUtf8
  );
  return JSON.parse(decryptedData);
};