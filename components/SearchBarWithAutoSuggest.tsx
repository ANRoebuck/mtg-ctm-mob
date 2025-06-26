import { StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';
import { getAutocompleteSuggestions } from '../gateway/http';
import { observer } from 'mobx-react';
import { pricesStore } from '../store/PricesStore';
import SearchSuggestions from './SearchSuggestions';

interface SearchBarWithAutoSuggestProps {
    snapToResults: () => void;
}

const SearchBarWithAutoSuggest = observer(({ snapToResults }: SearchBarWithAutoSuggestProps) => {
    const [value, setValue] = useState('');

    const defaultSuggestions = () => ( { capturedAt: new Date(), values: [] });
    const [suggestions, setSuggestions] = useState(defaultSuggestions());

    const handleChange = (updatedValue: string): void => {
        setValue(updatedValue);

        // this ensures only latest suggestions will be used in a case where async calls resolve out of sequence
        const capturedAt = new Date();
        getUpdatedSuggestions(updatedValue)
            .then(values => setSuggestions(prev => prev.capturedAt < capturedAt ? { capturedAt, values } : prev));
    };

    const getUpdatedSuggestions = async (term: string) => term.length > 2 ? getAutocompleteSuggestions(term) : [];

    const handleSubmit = (searchTerm: string): void => {
        setValue('');
        setSuggestions(defaultSuggestions());
        pricesStore.searchForPrices(searchTerm);
        snapToResults();
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
                    suggestions={suggestions.values}
                    onClick={handleSubmit}
                    maxSuggestions={5}
                />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    outer_container: {
        margin: 12,
        position: 'absolute',
        top: 0,
        marginVertical: 0,
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
