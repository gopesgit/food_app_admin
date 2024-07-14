import { StyleSheet, View, Text, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView, ScrollView, Image, ToastAndroid } from "react-native";
import { globalStyle } from "../common/style";
import { useContext, useState } from "react";
import { Button, Icon } from "@rneui/base";
import { pickImage, checkFormData, insertData } from "../common/someCommonFunction";
import { API_FOOD_CATEGORIE } from "../common/apiURL";
import { OperationContext } from "../context/operationContext";

export default function AddFoodCatagorie({ navigation }) {
    const {allFunction}=useContext(OperationContext);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null);
    //Register User in google firebase    
    const handelSubmit = async () => {
        let data = { name, description }//name,description
        const requiredFields = ['name', 'description'];
        console.log({ name, description });
        if (!checkFormData(data, requiredFields) || !image) {
            ToastAndroid.showWithGravity(`Missing or empty field`, ToastAndroid.LONG, ToastAndroid.TOP)
            return
        }
        let formdata = new FormData()
        formdata.append('image', {
            uri: image,
            type: 'image/jpeg',  // Adjust according to your file type
            name: 'photo.jpg'    // Adjust file name as needed
        });
        Object.keys(data).forEach(key => {
            formdata.append(key, data[key]);
        });
        try {
            await insertData(formdata, API_FOOD_CATEGORIE)
            allFunction()
            setName("")
            setDescription("")
            setImage(null)
        } catch (error) {

        }
       
    }
    return (
        <View style={[globalStyle.container, { backgroundColor: "#fff" }]}>
            <ScrollView>
                <KeyboardAvoidingView>
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={globalStyle.inputBoxArea}>
                            <Pressable onPress={() => pickImage(setImage)}>
                                {!image &&
                                    <Icon
                                        name="file-image-plus"
                                        size={200}
                                        color={"#ddd"}
                                        type="material-community"
                                    />
                                }

                                {image && <Image source={{ uri: image }} style={styles.image} />}
                            </Pressable>
                        </View>

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
                            buttonStyle={{ marginTop: 8 }}
                            onPress={handelSubmit}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
        borderRadius: 12,

    },
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