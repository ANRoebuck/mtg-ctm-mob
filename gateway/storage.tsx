import AsyncStorage from '@react-native-async-storage/async-storage';


export const storageKeys = {
  sortPriceBy: 'ctm_sortByPrice',
  filterFoils: 'ctm_filterFoils',
  bookmarkedPrices: '',
}

export const storeData = async (uniqueKey: string, data: [] | {}) => {
    storeDataString(uniqueKey, JSON.stringify(data));
}

export const storeDataString = async (uniqueKey: string, data: string) => {
    try {
      await AsyncStorage.setItem(uniqueKey, data)
    } catch (e) {
      console.log('Error storing data', e);
    }
}

export const getStoredDataOrDefault = async (uniqueKey: string, defaultValue: any): Promise<any> => {
    const storedString = await getDataAsString(uniqueKey);
    return storedString === '' ? defaultValue : JSON.parse(storedString) ;
}

export const getStoredData = async (uniqueKey: string) : Promise<any> => {
    return getDataAsString(uniqueKey).then(dataString => JSON.parse(dataString));
}

const getDataAsString = async (uniqueKey: string): Promise<string> => {
    try {
      const value = await AsyncStorage.getItem(uniqueKey)
      if(value !== null) {
        return value;
      }
      return '';
    } catch(e) {
      console.log('Error retrieving data', e);
      return '';
    }
}

