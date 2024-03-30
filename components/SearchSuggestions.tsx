import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

interface Props {
    suggestions: string[];
    onClick: Function;
    maxSuggestions: number;
}

const SearchSuggestions = ({ suggestions, onClick, maxSuggestions }: Props) => {
    return suggestions.length === 0 ? null : (
        <View style={styles.suggestions_container}>
            {suggestions
                .slice(0, maxSuggestions)
                .map((suggestion: string, i: number) => (
                    <TouchableWithoutFeedback
                        style={styles.wrapper}
                        key={i}
                        onPress={() => onClick(suggestion)}
                    >
                        <View style={styles.suggestion}>
                            <Text style={styles.text}>{suggestion}</Text>
                            <View style={styles.placeHolder}></View>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    suggestions_container: {
        top: 50,
        position: 'absolute',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        minWidth: '100%',
        width: '100%',
        flex: 1,
    },
    wrapper: {
        minWidth: '100%',
        width: '100%',
    },
    suggestion: {
        marginVertical: 8,
        minWidth: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        minWidth: '100%',
    },
    placeHolder: {}
});

export default SearchSuggestions;
