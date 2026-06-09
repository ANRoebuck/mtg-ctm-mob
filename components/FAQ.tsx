import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { observer } from 'mobx-react';
import { infoStore } from '../store/InfoStore';

const year = new Date().getFullYear();
const notice = `© Alex Roebuck ${year}`;

const FAQ = observer(() => {
    return (
        <ScrollView style={styles.container}>
            {infoStore.faqs.map((faq, i: number) => (
                <View style={styles.card} key={i}>
                    <Text style={styles.card_title}>{faq.title}</Text>
                    <Text style={styles.card_text}>{faq.body}</Text>
                </View>
            ))}

            <Text style={styles.notice}>{notice}</Text>
        </ScrollView>
    );
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10
    },
    card: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5
    },
    card_title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 10
    },
    card_text: {
        textAlign: 'left'
    },
    notice: {
        textAlign: 'center',
        color: 'white',
        margin: 15
    }
});

export default FAQ;
