import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { globalStyle } from "../common/style";
import { useState } from "react";
import { insertData } from "../common/someCommonFunction";
import { API_USER } from "../common/apiURL";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Use MaterialIcons for the eye icons

export default function Register({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [repassword, setREPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [userType, setUserType] = useState("customer");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [repasswordVisible, setREPasswordVisible] = useState(false);

    const handleSubmit = async () => {
        const message = 'Registration successful!';
        if (!name || !email || !password || !phone || password !== repassword) {
            Alert.alert("Error", "Please fill all fields correctly.");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', repassword);
        formData.append('phone', phone);
        formData.append('type', userType);
        formData.append('active', 0);

        try {
            setLoading(true);
            const response = await insertData(formData, API_USER, message);

            if (response) {
                Alert.alert("Success", "Registration successful!");
                navigation.navigate('Login'); // Navigate to login or another screen

                //Reset fields
                setName("");
                setEmail("");
                setPassword("");
                setPhone("");
                setREPassword("");
                setUserType("customer"); // Reset to default user type
                setPasswordVisible(false); // Reset password visibility
                setREPasswordVisible(false); // Reset re-enter password visibility
            } else {
                Alert.alert("Error", "Registration failed.");
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "An error occurred, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={globalStyle.container}>
            <Text style={globalStyle.pageTitle}>Register</Text>
            <View style={{ marginHorizontal: 20 }}>
                <TextInput
                    style={globalStyle.inputBox}
                    placeholder='Enter your name'
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={globalStyle.inputBox}
                    placeholder='Enter your email'
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={globalStyle.inputBox}
                        placeholder='Enter your password'
                        secureTextEntry={!passwordVisible}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.iconButton}>
                        <Icon name={passwordVisible ? "visibility" : "visibility-off"} size={24} color="#000" />
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={globalStyle.inputBox}
                        placeholder='Re-enter your password'
                        secureTextEntry={!repasswordVisible}
                        value={repassword}
                        onChangeText={setREPassword}
                    />
                    <TouchableOpacity onPress={() => setREPasswordVisible(!repasswordVisible)} style={styles.iconButton}>
                        <Icon name={repasswordVisible ? "visibility" : "visibility-off"} size={24} color="#000" />
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={globalStyle.inputBox}
                    placeholder='Enter your phone number'
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType='phone-pad' // Use phone-pad for numeric input
                />
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
                <TouchableOpacity style={[globalStyle.submitBtn, { marginTop: 10 }]} onPress={handleSubmit}>
                    <Text style={globalStyle.btnText}>
                        {!loading ? "Register" : "Please wait..."}
                    </Text>
                </TouchableOpacity>
                <Text style={[globalStyle.linkText, { marginTop: 5 }]}>
                    Already registered?{" "}
                    <Text style={globalStyle.link} onPress={() => navigation.navigate("Login")}>
                        LOGIN
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    passwordContainer: {
        position: 'relative',
        marginVertical: 10,
    },
    iconButton: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
        padding: 5,
    },
});
