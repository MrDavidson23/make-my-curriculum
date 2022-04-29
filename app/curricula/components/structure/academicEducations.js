import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

let styles = StyleSheet.create({
    title: {
      fontSize: "14pt",
      fontWeight: "bold",
      color: '#DB5461'
    }
});

const AcademicEducations = (props) => {
    styles = {...styles, ...props.styles}
    return (
        <>
        { props.academicEducations.length > 0  && (
            <View>
            <Text style={styles.title}>{props.label}</Text>
                <View style={styles.text}>
                {props.academicEducations.map((ac) => (
                    <View key={ac.id}>
                        <Text>{ac.studies}</Text>
                        <Text>{ac.institution}</Text>
                        <Text>{ac.location}</Text>
                        <Text>{ac.startYear.toLocaleDateString()+" - "+ac.finishYear.toLocaleDateString()}</Text>
                    </View>
                ))}
                </View>
            </View>  
        )}
        </>
    )
}

export default AcademicEducations