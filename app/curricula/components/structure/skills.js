import React from "react"
import { Text, View, StyleSheet } from "@react-pdf/renderer"

let styles = StyleSheet.create({
  title: {
    fontSize: "14pt",
    fontWeight: "bold",
  },
})

const Skills = (props) => {
  styles = { ...styles, ...props.styles }
  return (
    <>
      {props.skills.length > 0  && (
        <View>
          <Text style={styles.title}>{props.label}</Text>
          <View style={styles.text}>
            {props.skills.map((skill) => (
              <Text key={skill.id}>{skill.description}</Text>
            ))}
          </View>
        </View>
      )}
    </>
  ) 
}

export default Skills
