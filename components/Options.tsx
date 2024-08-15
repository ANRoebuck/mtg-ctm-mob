import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { observer } from 'mobx-react';
import { pricesStore } from '../store/PricesStore';
import SellerType from '../types/SellerType';
import RadioButton from './RadioButton';
import { filterFoilsOptions, sortPriceOptions } from '../utils/utils';

interface SortAndFilterProps {
    props: {
        title: string;
        options: string[];
        selected: string;
        setSelected: Function;
    };
}

interface SellerOptionProps {
    seller: SellerType;
}

const SortAndFilterOption = observer(({ props }: SortAndFilterProps) => {
    const { title, options, selected, setSelected } = props;
    return (
        <View style={styles.sf_option_container}>
            <Text style={styles.sf_title_text}>{`${title}:`}</Text>
            <View>
                {options.map((o: string, i: number) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => setSelected(o)}
                            key={i}
                        >
                            <View style={styles.sf_option_row}>
                                <RadioButton
                                    onSelect={() => setSelected(o)}
                                    isSelected={selected === o}
                                    additionalStyles={{}}
                                />
                                <Text style={styles.sf_option_text}>{o}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </View>
        </View>
    );
});

const SellerOption = observer(({ seller }: SellerOptionProps) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => pricesStore.toggleSellerEnabled(seller.name)}
        >
            <View
                style={
                    seller.enabled
                        ? styles.seller_enabled
                        : styles.seller_disabled
                }
            >
                <Image style={styles.seller_logo} source={seller.logo}></Image>
            </View>
        </TouchableWithoutFeedback>
    );
});

const Options = observer(() => {
    const SortAndFilterOptions = [
        {
            title: 'Price',
            options: Object.values(sortPriceOptions),
            selected: pricesStore.sortPriceBy,
            setSelected: pricesStore.setSortPriceBy
        },
        {
            title: 'Foils',
            options: Object.values(filterFoilsOptions),
            selected: pricesStore.filterFoilsBy,
            setSelected: pricesStore.setFilterFoilsBy
        }
    ];

    return (
        <ScrollView style={styles.main_container}>
            <Text style={styles.options_header}>Display Options</Text>
            <View style={styles.options_container}>
                {SortAndFilterOptions.map((o, i) => (
                    <SortAndFilterOption props={o} key={i} />
                ))}
            </View>

            <Text style={styles.options_header}>
                Stores - Press to Enable/Disable
            </Text>
            <View style={styles.options_container}>
                {pricesStore.sellers.map((s, i) => (
                    <SellerOption seller={s} key={i} />
                ))}
            </View>
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    main_container: {
        width: '100%'
    },
    options_header: {
        color: 'white',
        textAlign: 'center',
        marginVertical: 15
    },
    options_container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-around'
    },

    sf_option_container: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        minWidth: 135
    },
    sf_title_text: {
        marginBottom: 5
    },
    sf_option_row: {
        flexDirection: 'row',
        padding: 5
    },
    sf_option_text: {
        marginLeft: 5
    },

    seller_enabled: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        width: '45%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    seller_disabled: {
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        width: '45%',
        alignItems: 'center',
        backgroundColor: 'darkred'
    },
    seller_favourite: {},
    seller_logo: {
        width: 125,
        height: 50,
        resizeMode: 'contain',
        margin: 10,
        borderRadius: 5
    }
});

export default Options;
