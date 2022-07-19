import React from "react";
import { StyleSheet, View } from "react-native";
import { observer } from "mobx-react";
import { pricesStore } from "../store/PricesStore";



const Options = observer(() => {

    const sortAndFilterOptions = () => [];

    const sellerOptions = () => [];
    

    return(
        <View>

            {/* <View>
                {sortAndFilterOptions}
            </View> */}

            <View>
                {sellerOptions}
            </View>
            
        </View>
    )
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

export default Options;