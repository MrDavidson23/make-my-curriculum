import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

let styles = StyleSheet.create({
    title: {
      fontSize: "14pt",
      fontWeight: "bold",
      color: '#DB5461'
    }
});

const TechnicalEducation = (props) => {
    styles = {...styles, ...props.styles}
    return (
        <>
        { props.technicalEducations.length > 0  && (
            <View>
            <Text style={styles.title}>{props.label}</Text>
                <View style={styles.text}>
                {props.technicalEducations.map((te) => (
                    <View key={te.id}>
                        <Text>{te.studies}</Text>
                        <Text>{te.institution}</Text>
                        <Text>{te.location}</Text>
                        <Text>{te.completionYear.toLocaleDateString()}</Text>
                    </View>
                ))}
                </View>
            </View>  
        )}
        </>
    )
}

export default TechnicalEducation