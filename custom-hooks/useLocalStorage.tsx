import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getStoredData, storeData } from '../gateway/storage';

const getSavedValue = async (key: string, initialValue: any): Promise<any> => {
  const savedValue = await getStoredData(key);
  const parsedData = JSON.parse(savedValue);
  return parsedData || initialValue;
}

const useLocalStorage = (key: string, initialValue: any): [Promise<any>, Dispatch<SetStateAction<Promise<string>>>] => {
  const [value, setValue] = useState(() => getSavedValue(key, initialValue));

  useEffect(() => {
    storeData(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
