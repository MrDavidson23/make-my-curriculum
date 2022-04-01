import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

let styles = StyleSheet.create({
    title: {
      fontSize: "14pt",
      fontWeight: "bold",
      color: '#DB5461'
    }
});

const Experiences = (props) => {
    styles = {...styles, ...props.styles}
    return (
        <>
        { props.experiences && (
            <View>
            <Text style={styles.title}>Experiencia Laboral</Text>
                <View style={styles.text}>
                {props.experiences.map((xp) => (
                    <>
                    <Text>{xp.position}</Text>
                    <Text>{xp.institution}</Text>
                    <Text>{xp.location}</Text>
                    <Text>{xp.startYear.toLocaleDateString()+" - "+xp.finishYear.toLocaleDateString()}</Text>
                    </>
                ))}
                </View>
            </View>  
        )}
        </>
    )
}

export default Experiences