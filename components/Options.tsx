import React from "react";
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { observer } from "mobx-react";
import { pricesStore } from "../store/PricesStore";
import SellerType from "../types/SellerType";
import { sortAndFilterOptions } from "../utils/utils";

interface SortAndFilterProps {
    option: {
        name: string,
        options: { [key: string]: string },
    }
}

interface SellerOptionProps {
    seller: SellerType,
}

const SortAndFilterOption = ({ option }: SortAndFilterProps) => {
    return(
        <View>

        </View>
    )
}

const SellerOption = ({ seller }: SellerOptionProps) => {
    return(
        <TouchableWithoutFeedback onPress={() => console.log('foo')}>
            <View style={styles.seller}>
                <View style={seller.enabled ? styles.seller_enabled : styles.seller_disabled }>
                    <Image style={styles.seller_logo} source={seller.logo}></Image>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const Options = observer(() => {

    return(
        <View style={styles.options_container}>

            <Text style={styles.options_header}>Sort and filter</Text>
            <View>
                {sortAndFilterOptions.map((o, i) => <SortAndFilterOption option={o} key={i}/>)}
            </View>

            <Text style={styles.options_header}>Stores - Press to enable, disable, or set as favourite</Text>
            <View style={styles.sellers_container} >
                {pricesStore.sellers.map((s, i) => <SellerOption seller={s} key={i}/>)}
            </View>
            
        </View>
    )
});

const styles = StyleSheet.create({
    options_container: {
        width: '100%',
    },
    options_header: {
        color: 'white',
        textAlign: 'center',
        marginVertical: 15,
    },

    sellers_container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-around',
    },
    seller: {
        // padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 10,
        width: '45%',
        alignItems: 'center',
    },
    seller_enabled: {

    },
    seller_disabled: {
        backgroundColor: 'darkred',
    },
    seller_favourite: {

    },
    seller_logo: {
        width: 125,
        height: 50,
        resizeMode: 'contain',
        margin: 10,
        borderRadius: 5,
    }
});

export default Options;