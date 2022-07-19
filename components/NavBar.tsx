import React from "react";
import {Button, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';


interface ButtonProps {
    value: string,
    selected: string,
    setSelected: Function,
}

interface NavBarProps {
    tabs: object,
    selected: string,
    setSelected: Function,
}

const NavButton = ({ value, selected, setSelected }: ButtonProps) => {

    const isSelected = value === selected;

    return (
        <TouchableHighlight style={isSelected ? styles.nav_button_selected : styles.nav_button} onPress={() => setSelected(value)}>
            <Text>{value}</Text>
        </TouchableHighlight>
    )
}

const NavBar = ({ tabs, selected, setSelected }: NavBarProps) => {
    return(
        <View style={styles.nav_bar}>
            {Object.values(tabs).map((tab, i) =>
                <NavButton value={tab} selected={selected} setSelected={setSelected} key={i}/>)}
        </View>
    )
}

const styles = StyleSheet.create({
    nav_bar: {
        flexDirection: 'row',
    },
    nav_button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginHorizontal: 5,
    },
    nav_button_selected: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'lightgray',
        marginHorizontal: 5,
    },
});

export default NavBar;