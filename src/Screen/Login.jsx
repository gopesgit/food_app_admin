import { StyleSheet, View,KeyboardAvoidingView,TextInput, TouchableOpacity,Text, Alert, ToastAndroid } from "react-native"
import { globalStyle } from "../common/style"

import { Icon } from "@rneui/base"
import { useContext, useState } from "react"
import { login } from "../common/someCommonFunction"
import { AuthContext } from "../context/authContex"

export default function Login({ navigation }) {
    //global state
    const {setUser}=useContext(AuthContext);
    const [email,setEmail]=useState()
    const [showpass,setShowPass]=useState(true)
    const [password,setPassword]=useState()
    const [loading,setLoading]=useState(false)
    const handelSubmit=async ()=>{
        setLoading(true)
        if(!email || !password){
            //ToastAndroid.showWithGravity("Please fill field",ToastAndroid.SHORT,ToastAndroid.TOP)
            setLoading(false) 
            return
        }
        await login({email,password},setUser)   
        setLoading(false) 
    }
    return (        
        <View style={globalStyle.container}>
            <View style={{ flex: 1}}>               
            </View>           
            <View style={{ flex: 1, marginHorizontal: 20 }}>
            <KeyboardAvoidingView>
                    <TextInput
                        placeholder='Enter your emp code'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={globalStyle.inputBox}
                    />               
                <View style={[globalStyle.inputBox,{flexDirection:'row',gap:150}]}>
                    <TextInput
                        placeholder='Enter your password'
                        secureTextEntry={showpass}
                        value={password}
                        onChangeText={(text) => setPassword(text)}                        
                    />
                <Icon name="remove-red-eye" size={40} color={"#dddddd"} 
                style={{justifyContent:'flex-end'}} 
                onPress={()=>setShowPass(!showpass)}
                />                   
                </View>
                <TouchableOpacity style={[globalStyle.submitBtn, { marginTop: 8 }]} onPress={handelSubmit}>
                    <Text style={globalStyle.btnText}>
                        {!loading ? "Login" : "Please wait...."}
                    </Text>
                </TouchableOpacity>
                <Text style={[globalStyle.linkText, { marginTop:20 }]}>
                    Your have not Register Please{" "}
                    <Text style={globalStyle.link} onPress={() => navigation.navigate("Register")}>
                        Register
                    </Text>{" "}
                </Text>
                </KeyboardAvoidingView>
            </View>            
        </View>
    )
}
const styles = StyleSheet.create({})