import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeData = async (uniqueKey: string, data: [] | {} | string) => {
    storeDataString(uniqueKey, JSON.stringify(data));
}

const storeDataString = async (uniqueKey: string, data: string) => {
    try {
      await AsyncStorage.setItem(uniqueKey, data)
    } catch (e) {
      console.log('Error storing data', e);
    }
}

export const getData = async (uniqueKey: string) : Promise<any> => {
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

