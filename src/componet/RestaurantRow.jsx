import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { tw } from 'react-native-tailwindcss';


const RestaurantRow = ({item}) => {
    console.log(item);
  return (
    <View style={[tw.flexRow, tw.itemsCenter,tw.p3, tw.roundedL, tw.shadow, tw.mB3, {shadowColor: "rgba(0, 0, 0, 0.5)", shadowRadius:12,padding:8}]}>      
            <Image           
                style={{ height: 100, width: 100,borderRadius:20 }}
                source={{uri:item.logo_url}}
            />
            <View style={[tw.flex, tw.flex1,tw.spaceY3]}>
                <View style={[tw.pL3]}>
                    <Text style={[tw.textXl]}>{item.name}</Text>
                    <Text style={[tw.textGray700]}>{item.description}</Text>
                </View>
              
            </View>
        </View>
  )
}

export default RestaurantRow

const styles = StyleSheet.create({})