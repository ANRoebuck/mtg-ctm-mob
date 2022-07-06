import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {getPrices} from "../gateway/http";
import {observer, Observer} from "mobx-react";
import {pricesStore} from "../store/prices";


const SearchBar = observer(() => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = () => {
        setSearchTerm('');
        getPrices('Axion Now', "Tarmogoyf")
            .then(({ prices }) => pricesStore.addPrices(prices));
    }

    return (
        <View style={styles.search_container}>
            <TextInput style={styles.input} onChangeText={setSearchTerm} value={searchTerm} placeholder={"Type to search"}/>
            <Button title={"Search"} onPress={() => handleSubmit()}/>
        </View>)

});

const styles = StyleSheet.create({
    search_container: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    input: {
    }
});

export default SearchBar;
