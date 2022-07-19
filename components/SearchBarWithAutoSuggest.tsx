import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {getAutocompleteSuggestions, getPrices} from "../gateway/http";
import {observer, Observer} from "mobx-react";
import {pricesStore} from "../store/PricesStore";
import SearchSuggestions from "./SearchSuggestions";
import PriceType from "../types/PriceType";


const SearchBarWithAutoSuggest = observer(() => {

    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const getUpdatedSuggestions = async (term: string) => term.length > 2 ? getAutocompleteSuggestions(term) : [];

    const handleChange = (updatedSearchTerm: string): void => {
        setSearchTerm(updatedSearchTerm);
        getUpdatedSuggestions(updatedSearchTerm).then(setSuggestions);
    }

    const handleSubmit = (toSearchFor: string): void => {
        setSearchTerm('');
        setSuggestions([]);
        pricesStore.clearResults();
        pricesStore.sellers.forEach(seller => {
            getPrices(seller, toSearchFor)
                .then((prices: PriceType[]) => pricesStore.addPrices(prices));
        });
    }

    return (
        <View style={styles.outer_container}>
            <View style={styles.inner_container}>
                <TextInput style={styles.input}
                    value={searchTerm} placeholder={"Type to search"}
                    onChangeText={handleChange} 
                    onSubmitEditing={() => handleSubmit(searchTerm)}
                    />
                <SearchSuggestions suggestions={suggestions} onClick={handleSubmit} maxSuggestions={5} />
                {/* <Button title={"Search"} onPress={() => handleSubmit()}/> */}   
            </View>

        </View>)

});

const styles = StyleSheet.create({
    outer_container: {
        margin: 12,
        position: 'absolute',
        top: 0,
        marginVertical: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        // backgroundColor: '#fff',
        width: '66%',
        justifyContent: 'center',
    },
    inner_container: {
        height: 50,
        marginVertical: 15,
        borderWidth: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        minWidth: '100%',
    },
    input: {
        width: '100%',
        height: '100%',
    },
});

export default SearchBarWithAutoSuggest;
