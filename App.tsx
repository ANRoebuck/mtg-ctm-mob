import { StyleSheet, View } from 'react-native';
import SearchBarWithAutoSuggest from './components/SearchBarWithAutoSuggest';
import { BookmarksView, ResultsView } from './components/PricesViews';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import FAQ from './components/FAQ';
import Options from './components/options/Options';

const App = () => {
    const pages = {
        results: 'Results',
        options: 'Options',
        bookmarks: 'Bookmarks',
        faq: 'FAQ'
    };

    const [selected, setSelected] = useState(pages.results);

    const getPageToDisplay = () => {
        switch (selected) {
            case pages.results:
                return <ResultsView />;
            case pages.options:
                return <Options />;
            case pages.bookmarks:
                return <BookmarksView />;
            case pages.faq:
                return <FAQ />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.app}>
            <View style={styles.nav_container}>
                <NavBar
                    tabs={pages}
                    selected={selected}
                    setSelected={setSelected}
                />
            </View>

            {getPageToDisplay()}

            {/* Seach Bar goes gelow to ensure suggestions appear on top of other elements  */}
            <SearchBarWithAutoSuggest />
        </View>
    );
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#3a3f5a',
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
        maxHeight: '100%'
    },
    nav_container: {
        marginTop: 100,
        marginBottom: 10
    }
});

export default App;
