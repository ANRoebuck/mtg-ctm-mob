import React from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import { pricesStore } from '../store/PricesStore';


export const LoadingWidget = observer(() => {

    const total = pricesStore.activeSellers.length;
    const loading = pricesStore.sellersLoadingCount;

    const isLoading = pricesStore.sellersLoadingCount > 0;

    const loadedIcons = [];
    const loadingIcons = [];

    if (isLoading) {
        for(let i = 0; i < total - loading; i++) { loadedIcons.push(<LoadedIcon />)}
        for(let i = 0; i < loading; i++) { loadingIcons.push(<LoadingIcon />)}
    }

    return(
        <View style={styles.container}>
            {loadedIcons}
            {loadingIcons}
        </View>
    );
});

const LoadedIcon = () => {
    return(
        <View style={styles.loaded} />
    );
};

const LoadingIcon = () => {
    return(
        <View style={styles.loading}/>
    );
};

const iconSize = 10;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 5,
    },
    loaded: {
        width: iconSize,
        height: iconSize,
        borderWidth: 1,
        backgroundColor: 'green',
    },
    loading: {
        width: iconSize,
        height: iconSize,
        borderWidth: 1,
        backgroundColor: '#36454F',
    }
});