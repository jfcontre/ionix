import { localStorageEnum } from '@/constants/enums/localStorage';
import { encryptData, decryptData } from './encryption';

interface ILocalStorage<T> {
  data: T;
  entity: localStorageEnum;
  shouldEncrypt?: boolean;
}

export const persistDataLocalStorage = <T>({
  entity,
  data,
  shouldEncrypt = true
}: ILocalStorage<T>): void => {
  const body = JSON.stringify(data);
  const encrypted = shouldEncrypt ? encryptData(body) : body;

  localStorage.setItem(entity, encrypted);
};
export const getDataLocalStorage = <T>(entity: localStorageEnum): T | null => {
  const data = localStorage.getItem(entity);
  if (data === null) return null;
  try {
    const decrypted = decryptData(data);
    return JSON.parse(decrypted);
  } catch (error) {
    return JSON.parse(data);
  }
};