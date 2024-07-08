import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView, ScrollView } from "react-native";
import { globalStyle } from "../common/style";
import { useState } from "react";
import { Button, Icon } from "@rneui/base";

export default function AddFoodCatagorie({ navigation }) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
      //Register User in google firebase    
    const handelSubmit = async () => {
        console.log({name,description});
        setName("")
        setDescription("")
    }
    return (
        <View style={[globalStyle.container, { backgroundColor: "#fff" }]}>
            <ScrollView>
            <KeyboardAvoidingView>
            <View style={{ marginHorizontal: 20 }}>
                <View style={globalStyle.inputBoxArea}>
                </View>
                <Pressable onPress={() => console.log("ok")}>
                    <Icon
                        name="file-image-plus"
                        size={75}
                        color={"#ddd"}
                        type="material-community"
                    />
                </Pressable>
                <TextInput
                    style={globalStyle.inputBox}
                    placeholder='Food Catagorie Name '
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={globalStyle.inputBoxArea}
                    placeholder='Description Food Catagorie Name'
                    value={description}
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => setDescription(text)}
                />
                <Button 
                title={"Add Catagorie"} 
                radius={12} 
                buttonStyle={{marginTop:8}}
                onPress={handelSubmit}
                />               
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    dropdown: {
        height: 40,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginVertical: 5,
        paddingLeft: 10,
        color: "#af9f85",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

});