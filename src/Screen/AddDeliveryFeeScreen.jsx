import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { API_DELIVERY_FEES } from '../common/apiURL';
import { insertData } from '../common/someCommonFunction';
//import { addDeliveryFee } from '../apiUtils';

const AddDeliveryFeeScreen = ({ route,navigation }) => {
    const {rest_id}=route.params
    console.log(rest_id);
    const [restaurantId, setRestaurantId] = useState(rest_id);
    const [minOrderAmount, setMinOrderAmount] = useState('');
    const [maxOrderAmount, setMaxOrderAmount] = useState('');
    const [deliveryFee, setDeliveryFee] = useState('');
    const [minDistance, setMinDistance] = useState('');
    const [maxDistance, setMaxDistance] = useState('');
    // const [effectiveFrom, setEffectiveFrom] = useState('');
    // const [effectiveUntil, setEffectiveUntil] = useState('');
    const [isActive, setIsActive] = useState(0);

    const handleSubmit = async () => {
        if (!restaurantId || !deliveryFee) {
            Alert.alert('Error', 'Please fill all required fields.');
            return;
        }

        const data = {
            restaurant_id: parseInt(restaurantId),
            min_order_amount: minOrderAmount? parseFloat(minOrderAmount):0,
            max_order_amount: maxOrderAmount ? parseFloat(maxOrderAmount) :parseFloat(minOrderAmount)+1 ,
            delivery_fee: parseFloat(deliveryFee),
            min_distance:minDistance?parseFloat(minDistance):0,
            max_distance: maxDistance ? parseFloat(maxDistance) :parseFloat(minDistance)+3 ,
            // effective_from: effectiveFrom || null,
            // effective_until: effectiveUntil || null,
            is_active: isActive,
        };
        let formdata = new FormData();
        Object.keys(data).forEach(key => {
            formdata.append(key, data[key]);
        });
        console.log(formdata);
        try {
            await insertData(formdata,API_DELIVERY_FEES,"Delivery fee added successfully")
        //   await insertData(formdata,API_DELIVERY_FEES,"Delivery fee added successfully.")
          //Alert.alert('Success', 'Delivery fee added successfully.');
          navigation.navigate("DeliveryFeeScreen", { rest_id: rest_id })
        } catch (error) {
          //Alert.alert('Error', 'Failed to add delivery fee.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Delivery Fee</Text>
            {/* <TextInput
                style={styles.input}
                placeholder="Restaurant ID"
                keyboardType="numeric"
                value={restaurantId}
                onChangeText={setRestaurantId}
            /> */}
            <TextInput
                style={styles.input}
                placeholder="Minimum Order Amount"
                keyboardType="numeric"
                value={minOrderAmount}
                onChangeText={setMinOrderAmount}
            />
            <TextInput
                style={styles.input}
                placeholder="Maximum Order Amount (Optional)"
                keyboardType="numeric"
                value={maxOrderAmount}
                onChangeText={setMaxOrderAmount}
            />
            <TextInput
                style={styles.input}
                placeholder="Delivery Fee"
                keyboardType="numeric"
                value={deliveryFee}
                onChangeText={setDeliveryFee}
            />
            <TextInput
                style={styles.input}
                placeholder="Minimum Distance"
                keyboardType="numeric"
                value={minDistance}
                onChangeText={setMinDistance}
            />
            <TextInput
                style={styles.input}
                placeholder="Maximum Distance (Optional)"
                keyboardType="numeric"
                value={maxDistance}
                onChangeText={setMaxDistance}
            />
            {/* <TextInput
        style={styles.input}
        placeholder="Effective From (YYYY-MM-DD)"
        value={effectiveFrom}
        onChangeText={setEffectiveFrom}
      />
      <TextInput
        style={styles.input}
        placeholder="Effective Until (YYYY-MM-DD)"
        value={effectiveUntil}
        onChangeText={setEffectiveUntil}
      /> */}

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 5,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    toggleButton: {
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    active: {
        backgroundColor: '#4CAF50',
    },
    inactive: {
        backgroundColor: '#F44336',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default AddDeliveryFeeScreen;
