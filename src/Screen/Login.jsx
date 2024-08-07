import { StyleSheet, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Text, Alert, Platform } from "react-native";
import { globalStyle } from "../common/style";
import { Icon } from "@rneui/base";
import { Picker } from '@react-native-picker/picker';
import { useContext, useState } from "react";
import { login } from "../common/someCommonFunction";
import { AuthContext } from "../context/authContex";

export default function Login({ navigation }) {
    // Global state
    const { setUser } = useContext(AuthContext);
    
    // Local state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState(""); // Default user type
    
    const handleSubmit = async () => {
        setLoading(true);
        if (!email || !password||!userType) {
            Alert.alert("Error", "Please fill all fields.");
            setLoading(false);
            return;
        }
        
        try {
            const result = await login({ email, password, type:userType }, setUser);
            
            // if (result) {
            //     navigation.navigate('Home'); // Navigate to home or another screen
            // } else {
            //     //Alert.alert("Error", "Login failed. Please check your credentials.");
            // }
        } catch (error) {
            console.log(error);
            //Alert.alert("Error", "An error occurred, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={globalStyle.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 20 }}>
                <Text style={globalStyle.pageTitle}>Login</Text>
                
                <TextInput
                    placeholder='Enter email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={[globalStyle.inputBox, styles.input]}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                />
                
                <View style={[globalStyle.inputBox, styles.passwordContainer]}>
                    <TextInput
                        placeholder='Enter your password'
                        secureTextEntry={showPass}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.passwordInput}
                    />
                    <Icon
                        name={showPass ? "visibility" : "visibility-off"}
                        size={24}
                        color={"#000"}
                        onPress={() => setShowPass(!showPass)}
                        style={styles.eyeIcon}
                    />
                </View>
                
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={userType}
                        onValueChange={(itemValue) => setUserType(itemValue)}
                        style={styles.picker}
                    >
                     
                        <Picker.Item label="Restaurant Admin" value="restadmin" />
                        <Picker.Item label="Delivery Person" value="delivery" />
                    </Picker>
                </View>
                
                <TouchableOpacity
                    style={[globalStyle.submitBtn, styles.submitBtn]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={globalStyle.btnText}>
                        {!loading ? "Login" : "Please wait..."}
                    </Text>
                </TouchableOpacity>
                
                <Text style={styles.registerLink}>
                    Don't have an account?{" "}
                    <Text style={globalStyle.link} onPress={() => navigation.navigate("Register")}>
                        Register
                    </Text>
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:8
    },
    passwordInput: {
        flex: 1,
    },
    eyeIcon: {
        marginLeft: 10,
    },
    pickerContainer: {
        marginVertical: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
    },
    submitBtn: {
        marginTop: 15,
    },
    registerLink: {
        marginTop: 20,
        textAlign: 'center',
        color: '#555',
    },
});
