import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

let styles = StyleSheet.create({
    title: {
      fontSize: "14pt",
      fontWeight: "bold",
      color: '#DB5461'
    }
});

const Publications = (props) => {
    styles = {...styles, ...props.styles}
    return (
        <>
        { props.publications.length > 0  && (
            <View>
            <Text style={styles.title}>{props.label}</Text>
                <View style={styles.text}>
                {props.publications.map((publication) => (
                    <>
                    <Text>{publication.name} - {publication.tag}</Text>
                    <Text>{publication.institution}</Text>
                    <Text>{publication.location}</Text>
                    <Text>{publication.date.toLocaleDateString()}</Text>
                    </>
                ))}
                </View>
            </View>  
        )}
        </>
    )
}

export default Publications