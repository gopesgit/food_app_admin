import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AddRestaurant from './AddRestaurant'
import AddFoodCatagorie from './AddFoodCatagorie'

const HomeScreen = ({ navigation }) => {
    
    return (
        <AddRestaurant/>
        //<AddFoodCatagorie/>
        // <View style={{ backgroundColor: "#fff", flex: 1 }}>
           
        // </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 8,
        justifyContent: 'center',
    },
})