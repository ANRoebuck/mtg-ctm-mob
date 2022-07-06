import {Button, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {getPrices} from "../gateway/http";
import {observer, Observer} from "mobx-react";
import {pricesStore} from "../store/prices";
import Price from "./Price";
import PriceType from "../types/PriceType";


const Prices = observer(() => {

    console.log(pricesStore.sortedPrices);

    return (
        <ScrollView
            style={styles.scroll_container}
            contentContainerStyle={{flexGrow: 1,}}
            keyboardShouldPersistTaps="handled"
        >
            <View style={styles.prices_container}>
                {pricesStore.sortedPrices.map((result: PriceType) => {
                    return (
                        <Price result={result}/>
                    );
                })}
            </View>
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    scroll_container: {
        width: '100%',
        padding: 10,
    },
    prices_container: {
        width: '100%',
    },
});

export default Prices;