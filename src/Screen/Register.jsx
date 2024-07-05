import { StyleSheet,View,Text,TextInput,TouchableOpacity } from "react-native";
import { globalStyle } from "../common/style";
import { useState } from "react";

export default function Register({ navigation }) {
   
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [repassword, setREPassword] = useState("")
    const [loading, setLoding] = useState(false)
   
    
    //Register User in google firebase    
    const handelSubmit = async () => {      
        
    }
    return (
        
        <View style={globalStyle.container}>
            <Text style={globalStyle.pageTitle}>Register</Text>
            <View style={{ marginHorizontal: 20 }}>
                <TextInput
                    style={globalStyle.inputBox}
                    placeholder='Enter your name'
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={globalStyle.inputBox}
                    placeholder='Enter your email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
              
               
                <TextInput
                    style={globalStyle.inputBox}
                    placeholder='Enter your phone no.'
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={globalStyle.inputBox}
                    placeholder='Enter your password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={globalStyle.inputBox}
                    placeholder='Re-Enter your password'
                    secureTextEntry={true}
                    value={repassword}
                    onChangeText={(text) => setREPassword(text)}
                />
                <TouchableOpacity style={[globalStyle.submitBtn, { marginTop: 10 }]} onPress={handelSubmit}>
                    <Text style={globalStyle.btnText}>
                        {!loading ? "Register" : "Please wait...."}
                    </Text>
                </TouchableOpacity>
                <Text style={[globalStyle.linkText, { marginTop: 5 }]}>
                    Already Register Please{" "}
                    <Text style={globalStyle.link} onPress={() => navigation.navigate("Login")}>
                        LOGIN
                    </Text>{" "}
                </Text>
            </View>
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