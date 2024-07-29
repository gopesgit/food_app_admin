import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { API_DELIVERY_FEES } from '../common/apiURL';
import { updateData } from '../common/someCommonFunction';

const EditDeliveryFeeScreen = ({ route, navigation }) => {
    const { item } = route.params; // Assuming `item` contains the delivery fee data to edit

    const [restaurantId, setRestaurantId] = useState(item.restaurant_id.toString());
    const [minOrderAmount, setMinOrderAmount] = useState(item.min_order_amount.toString());
    const [maxOrderAmount, setMaxOrderAmount] = useState(item.max_order_amount ? item.max_order_amount.toString() : '');
    const [deliveryFee, setDeliveryFee] = useState(item.delivery_fee.toString());
    const [minDistance, setMinDistance] = useState(item.min_distance.toString());
    const [maxDistance, setMaxDistance] = useState(item.max_distance ? item.max_distance.toString() : '');
    const [isActive, setIsActive] = useState(item.is_active);

    const handleSubmit = async () => {
        if (!restaurantId || !deliveryFee) {
            Alert.alert('Error', 'Please fill all required fields.');
            return;
        }

        const data = {
            restaurant_id: parseInt(restaurantId),
            min_order_amount: minOrderAmount ? parseFloat(minOrderAmount) : 0,
            max_order_amount: parseFloat(maxOrderAmount)>parseFloat(minOrderAmount) ? parseFloat(maxOrderAmount) : parseFloat(minOrderAmount) + 1,
            delivery_fee: parseFloat(deliveryFee),
            min_distance: minDistance ? parseFloat(minDistance) : 0,
            max_distance: parseFloat(maxDistance)>parseFloat(minDistance) ? parseFloat(maxDistance) : parseFloat(minDistance) + 3,
            is_active: isActive,
        };

        let formdata = new FormData();
        Object.keys(data).forEach(key => {
            formdata.append(key, data[key]);
        });
        formdata.append('_method', 'put');
        try {
            await updateData(formdata, `${API_DELIVERY_FEES}/${item.id}`, "Delivery fee updated successfully");
            //Alert.alert('Success', 'Delivery fee updated successfully.');
            navigation.navigate("DeliveryFeeScreen", { rest_id: item.restaurant_id });
        } catch (error) {
            //Alert.alert('Error', 'Failed to update delivery fee.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Delivery Fee</Text>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Minimum Order Amount</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Minimum Order Amount"
                    keyboardType="numeric"
                    value={minOrderAmount}
                    onChangeText={setMinOrderAmount}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Maximum Order Amount (Optional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Maximum Order Amount"
                    keyboardType="numeric"
                    value={maxOrderAmount}
                    onChangeText={setMaxOrderAmount}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Delivery Fee</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Delivery Fee"
                    keyboardType="numeric"
                    value={deliveryFee}
                    onChangeText={setDeliveryFee}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Minimum Distance</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Minimum Distance"
                    keyboardType="numeric"
                    value={minDistance}
                    onChangeText={setMinDistance}
                />
            </View>
            <View style={styles.fieldContainer}>
                <Text style={styles.label}>Maximum Distance (Optional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Maximum Distance"
                    keyboardType="numeric"
                    value={maxDistance}
                    onChangeText={setMaxDistance}
                />
            </View>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Update</Text>
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
    fieldContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default EditDeliveryFeeScreen;
