import React from 'react';
import { StyleSheet, Text, View } from '@react-pdf/renderer';

const PDFSection = (props) => {

    /* 
        list is the list of objects to print in the pdf
        attributes is a list of string with the attributes to print
        styles is the object with css code
    */

    // Gets the sting value if the attrib exists 
    const getValue = (obj,attrib) => {
        let result = obj[attrib]
        if(result instanceof Date){
            result = result.toLocaleDateString()
        }
        return ( (result === undefined || result === null) ? "" : result)
    }

    // Gets the attributes of the object
    const getAttribute = (obj,attrib) => {
        let result = ""
        attrib.split("-").forEach((x)=>{
            result += getValue(obj,x) + " - "
        })
        return result.substring(0,result.length-3)
    }
    
    const titleStyles = StyleSheet.create(props.styles.title)
    const textStyles = StyleSheet.create(props.styles.text)

    return (
        <>
        { props.list.length > 0  && props.attributes.length > 0 && (
            <View>
                <Text style={titleStyles}>
                    {props.label}
                </Text>
                <View>
                {props.list.map((elem) => ( 
                    <View key={elem.id}>
                    {props.attributes.map((attrib,i) => ( 
                        <Text key={i} style={textStyles}>{getAttribute(elem,attrib)}</Text>
                    ))}
                    </View>
                ))}
                </View>
            </View>  
        )}
        </>
    )
}

export default PDFSection