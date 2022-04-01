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
        { props.academicEducations && (
            <View>
            <Text style={styles.title}>Educación Académica</Text>
                <View style={styles.text}>
                {props.academicEducations.map((ac) => (
                    <>
                    <Text>{ac.studies}</Text>
                    <Text>{ac.institution}</Text>
                    <Text>{ac.location}</Text>
                    <Text>{ac.startYear.toLocaleDateString()+" - "+ac.finishYear.toLocaleDateString()}</Text>
                    </>
                ))}
                </View>
            </View>  
        )}
        </>
    )
}

export default AcademicEducations