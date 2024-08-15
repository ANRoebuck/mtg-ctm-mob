import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import SearchBarWithAutoSuggest from './components/SearchBarWithAutoSuggest';
import { BookmarksView, ResultsView } from './components/PricesViews';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import FAQ from './components/FAQ';
import Options from './components/Options';

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
        <SafeAreaView style={styles.app}>
            <StatusBar backgroundColor={'#3a3f5a'} barStyle={'light-content'} />
            <View style={styles.nav_container}>
                <NavBar
                    tabs={pages}
                    selected={selected}
                    setSelected={setSelected}
                />
            </View>

            {getPageToDisplay()}

            {/* Seach Bar goes gelow to ensure suggestions appear on top of other elements  */}
            <SearchBarWithAutoSuggest snapToResults={() => setSelected(pages.results)}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: '#3a3f5a',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        maxHeight: '100%'
    },
    nav_container: {
        marginTop: 65,
        marginBottom: 10
    }
});

export default App;
