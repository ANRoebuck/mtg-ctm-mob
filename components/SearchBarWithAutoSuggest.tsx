import { StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';
import { getAutocompleteSuggestions } from '../gateway/http';
import { observer } from 'mobx-react';
import { pricesStore } from '../store/PricesStore';
import SearchSuggestions from './SearchSuggestions';

const SearchBarWithAutoSuggest = observer(() => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (updatedValue: string): void => {
        setValue(updatedValue);
        getUpdatedSuggestions(updatedValue).then(setSuggestions);
    };

    const getUpdatedSuggestions = async (term: string) => term.length > 2 ? getAutocompleteSuggestions(term) : [];

    const handleSubmit = (searchTerm: string): void => {
        setValue('');
        setSuggestions([]);
        pricesStore.search(searchTerm);
    };

    return (
        <View style={styles.outer_container}>
            <View style={styles.inner_container}>
                <TextInput
                    style={styles.input}
                    value={value}
                    placeholder={'Type to search'}
                    onChangeText={handleChange}
                    onSubmitEditing={() => handleSubmit(value)}
                />
                <SearchSuggestions
                    suggestions={suggestions}
                    onClick={handleSubmit}
                    maxSuggestions={5}
                />
                {/* <Button title={"Search"} onPress={() => handleSubmit()}/> */}
            </View>
        </View>
    );
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
        justifyContent: 'center'
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
        padding: 10,
        width: '100%',
        height: '100%'
    }
});

export default SearchBarWithAutoSuggest;
