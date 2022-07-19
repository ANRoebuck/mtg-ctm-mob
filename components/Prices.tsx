import {Button, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {useState} from "react";
import {getPrices} from "../gateway/http";
import {observer, Observer} from "mobx-react";
import {pricesStore} from "../store/PricesStore";
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
                {pricesStore.sortedPrices.map((result: PriceType, i: number) => {
                    return (
                        <Price result={result} key={i}/>
                    );
                })}
            </View>
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    scroll_container: {
        width: '100%',
        maxWidth: 800,
        padding: 10,
        // marginTop: 80,
    },
    prices_container: {
        width: '100%',
    },
});

export default Prices;
