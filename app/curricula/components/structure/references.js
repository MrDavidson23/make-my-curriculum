import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

let styles = StyleSheet.create({
    title: {
      fontSize: "14pt",
      fontWeight: "bold",
      color: '#DB5461'
    }
});

const References = (props) => {
    styles = {...styles, ...props.styles}
    return (
        <>
        { props.references.length > 0  && (
            <View>
            <Text style={styles.title}>{props.label}</Text>
                <View style={styles.text}>                 
                {props.references.map((reference) => (
                    <>
                    <Text>{reference.name}</Text>
                    <Text>{reference.email}</Text>
                    <Text>{reference.phone}</Text>
                    <Text>{reference.location}</Text>
                    </>
                ))}
                </View>
            </View>  
        )}
        </>
    )
}

export default References