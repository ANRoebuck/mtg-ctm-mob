import {Button, Image, StyleSheet, Text, TextInput, View} from "react-native";
import PriceType from "../types/PriceType";
import foilStar from '../assets/foil-star.png';
import {getLogoForSeller, sellers} from '../utils/utils';


const Price = ({ result }: PriceType) => {

    const { seller, title, imgSrc, productRef, expansion, price, stock, subtitle, isFoil } = result;

    return (
        <View style={styles.container}>

            <Image style={styles.img} source={imgSrc} />

            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.expansion}>{expansion}</Text>

                <Image style={styles.badge} source={getLogoForSeller(seller)} />


                {/*imgs row*/}
                <View style={styles.badges_container}>
                    {/*<Image style={styles.badge} source={foilStar} />*/}
                    <Text style={styles.price}>{price}</Text>
                </View>


            </View>


        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        marginVertical: 8,
        borderWidth: 1,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
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
    title: {
        width: '100%',
        flexWrap: 'wrap',
        textAlign: 'center',
        marginBottom: 5,
    },
    expansion: {
        width: '100%',
        flexWrap: 'wrap',
        textAlign: 'center',
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 5,
    },
    badge: {
        width: 125,
        height: 50,
        resizeMode: 'contain',
        margin: 10,
    },
    badges_container: {
        flexDirection: 'row',
    },
    price: {
        textAlign: 'right',
        fontWeight: 'bold',
    },
});

export default Price;

