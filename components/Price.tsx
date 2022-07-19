import { Button, Image, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import PriceType from "../types/PriceType";
import foilStar from '../assets/foil-star.png';
import {getLogoForSeller, sellers} from '../utils/utils';
import { storeData } from "../gateway/storage";

interface PriceProps {
    result: PriceType
}

const Price = ({ result }: PriceProps) => {

    const { seller, title, imgSrc, productRef, expansion, price_textRepresentation, subtitle, isFoil } = result;

    return (
        <View style={styles.main_container}>

            <View style={styles.title_container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.expansion}>{expansion}</Text>
            </View>

            <View style={styles.info_container}>

                <Image style={styles.img} source={{uri: imgSrc}} />

                <View style={styles.info}>


                    <Image style={styles.logo} source={getLogoForSeller(seller)} />

                    <View style={styles.price_container}>
                        <View style={styles.badge_container}>
                            { isFoil && <Image style={styles.foil_badge} source={foilStar} /> }
                        </View>
                        <Text style={styles.price}>{price_textRepresentation}</Text>
                    </View>

                    <View style={styles.widgets_container}>
                        <TouchableHighlight style={styles.widget} onPress={() => storeData(`${seller}_${title}`, result)}>
                            <Text >Save</Text>   
                        </TouchableHighlight>
                
                        <TouchableHighlight style={styles.widget} onPress={() => window.open(productRef, "_blank")}>
                            <Text >Link</Text>
                        </TouchableHighlight>
                    </View>

                </View>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    main_container: {
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    title_container: {

    },
    title: {
        width: '100%',
        flexWrap: 'wrap',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginBottom: 5,
        fontSize: 16,
    },

    info_container: {
        flexDirection: 'row',
        height: 160,
    },
    img: {
        // height: 'auto',
        width: '40%',
        // resizeMethod: 'scale',
        resizeMode: 'contain',
        // borderWidth: 1,
    },
    info: {
        width: '60%',
        padding: 10,
        alignItems: 'center',
    },
    expansion: {
        width: '100%',
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 5,
    },
    logo: {
        width: 125,
        height: 50,
        resizeMode: 'contain',
        margin: 10,
        borderRadius: 5,
    },

    price_container: {
        width: '100%',
        flexDirection: 'row',
        margin: 10,
    },
    price: {
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 18,
        alignContent: 'center',
        width: '60%',
    },
    badge_container: {
        width: '40%',
        height: 25,
    },
    foil_badge: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',  
    },

    widgets_container: {
        width: '100%',
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    widget: {
        width: '20%',
        textAlign: 'center',
        marginHorizontal: 5,
    },
});

export default Price;

