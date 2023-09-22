import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface GoalsEntryProps {
    // Defines the type of the props parameter as an object with a text property of type 'string'
    text: string;
    points: number;
}

const GoalsEntry : React.FC<GoalsEntryProps> = ({text, points}) => {
    // Annoated the props parameter with type 'GoalsEntryProps'
    // Makes it clear that the function wants an object with a 'text' property
  return (
    <View style={styles.entryPortion}>
        <View style={styles.itemLeft}>
            <TouchableOpacity style={styles.pointsDisplay}>
                {/* Placeholder for where points will be displayed */}
                <Text>{points} pts</Text>
            </TouchableOpacity>

            <Text style={styles.entryText}>{text}</Text>
        </View>

        {/* <View style={styles.checkoffEntry}>

        </View> */}
    </View>
  )
}

export default GoalsEntry

const styles = StyleSheet.create({
    entryPortion: {
        backgroundColor: '#ADD4F8',
        width: 375,
        height: 51,
        borderRadius: 20,
        borderColor: '#ADD4F8',
        borderWidth: 1,
        shadowColor: 'gray',
        shadowOffset: {width: -4, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },

    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    pointsDisplay: {
        width: 61,
        height: 24,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
        marginRight: 15,
        marginLeft: 10
    },

    entryText: {
        fontSize: 17
    },

    checkoffEntry: {
        width: 22,
        height: 22,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 8,
        marginRight: 20
    },

})