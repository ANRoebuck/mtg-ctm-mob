import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

interface Props {
    suggestions: string[],
    onClick: Function,
    maxSuggestions: number,
}

const SearchSuggestions = ({ suggestions, onClick, maxSuggestions }: Props) => {

    return(
        suggestions.length === 0
        ? null
        : <View style={styles.suggestions_container}>
            {suggestions.slice(0, maxSuggestions).map((suggestion: string, i: number) => 
                <TouchableHighlight style={styles.suggestion} key={i} onPress={() => onClick(suggestion)} >
                    <Text >
                        {suggestion}
                    </Text>
                </TouchableHighlight >)}
        </View>
    )
}


const styles = StyleSheet.create({
    suggestions_container: {
        top: 50,
        position: 'absolute',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        minWidth: '100%',
    },
    suggestion: {
        marginVertical: 8,
        minWidth: '100%',
    },
});

export default SearchSuggestions;