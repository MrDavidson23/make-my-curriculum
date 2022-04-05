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
        { props.technicalEducations && (
            <View>
            <Text style={styles.title}>Educación Técnica</Text>
                <View style={styles.text}>
                {props.technicalEducations.map((te) => (
                    <>
                    <Text>{te.studies}</Text>
                    <Text>{te.institution}</Text>
                    <Text>{te.location}</Text>
                    <Text>{te.completionYear.toLocaleDateString()}</Text>
                    </>
                ))}
                </View>
            </View>  
        )}
        </>
    )
}

export default TechnicalEducation