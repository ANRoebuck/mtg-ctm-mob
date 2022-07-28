import { ScrollView, StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import { pricesStore } from '../store/PricesStore';
import Price from './Price';
import PriceType from '../types/PriceType';

interface PriceViewProps {
    prices: PriceType[];
}

export const ResultsView = observer(() => (
    <PricesView prices={pricesStore.sortedPrices} />
));

export const BookmarksView = observer(() => (
    <PricesView prices={pricesStore.sortedBookmarks} />
));

const PricesView = ({ prices }: PriceViewProps) => {
    return (
        <ScrollView
            style={styles.scroll_container}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.prices_container}>
                {prices.map((result: PriceType, i: number) => {
                    return <Price result={result} key={i} />;
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scroll_container: {
        width: '100%',
        maxWidth: 800,
        padding: 10
    },
    prices_container: {
        width: '100%'
    }
});
