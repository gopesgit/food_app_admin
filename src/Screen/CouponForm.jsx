import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { API_COUPON, API_COUPON_INSERT, API_COUPON_UPDATE } from '../common/apiURL';
import { insertData, updateData } from '../common/someCommonFunction';
import moment from 'moment';

const CouponForm = ({ route, navigation }) => {
    const validFrom = moment().format('YYYY-MM-DD');
    const validUntil = moment().add(7, 'days').format('YYYY-MM-DD');
    const [coupon, setCoupon] = useState({
        code: '',
        discount_type: '',
        discount_value: '',
        discount_min: 0,
        discount_max: 0,
        min_order_val: '',
        quantity: '',
        valid_for_user: 0,
        valid_from: validFrom,
        valid_until: validUntil,
        active: 0,
        description: '',
    });

    const [errors, setErrors] = useState({});
    const { couponItem } = route.params || {};
    const { rest_id } = route.params || {};

    useEffect(() => {
        if (couponItem) {
            setCoupon({ ...couponItem, valid_for_user: couponItem.valid_for_user || '0' });
        }
    }, [couponItem]);

    const validate = () => {
        let valid = true;
        const errors = {};

        if (!coupon.code) {
            errors.code = 'Code is required';
            valid = false;
        }

        if (!coupon.discount_type) {
            errors.discount_type = 'Discount type is required';
            valid = false;
        }

        if (!coupon.discount_value) {
            errors.discount_value = 'Discount value is required';
            valid = false;
        }

        if (!coupon.min_order_val) {
            errors.min_order_val = 'Minimum order value must be a number';
            valid = false;
        }

        if (!coupon.quantity) {
            errors.quantity = 'Quantity must be a number';
            valid = false;
        }

        if (!coupon.discount_max) {
            errors.discount_max = 'Maximum Discount must be a number';
            valid = false;
        }

        if (!coupon.valid_for_user) {
            errors.valid_for_user = 'Valid User must be a number';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    function convertToFormData(obj) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(obj)) {
            formData.append(key, value);
        }
        return formData;
    }

    const handleSubmit = async () => {
        if (validate()) {
            const method = couponItem ? 'put' : 'post';
            //const url = couponItem ? `https://yourapi.com/api/coupons/${couponItem.id}` : 'https://yourapi.com/api/coupons';
            const updatedCoupon = { ...coupon, create_owner_type: "restaurant", created_by: rest_id };
            //const formData = convertToFormData(updatedCoupon);
            const formData = new FormData();

            // Append each key-value pair
            formData.append('code',coupon.code);
            formData.append('discount_type',coupon.discount_type);
            formData.append('discount_value', coupon.discount_value);
            formData.append('discount_min', 0);
            formData.append('discount_max', coupon.discount_max);
            formData.append('min_order_val',coupon.min_order_val);
            formData.append('quantity', coupon.quantity);
            formData.append('valid_for_user', coupon.valid_for_user);
            formData.append('valid_from',validFrom); // Replace with actual validFrom variable
            formData.append('valid_until', validUntil); // Replace with actual validUntil variable
            formData.append('active', 0);
            formData.append('description', coupon.description);
            formData.append('created_by',rest_id);
            //formData.append('_method', method);
            console.log(formData);
            try {
                if(method==='post'){
                    await insertData(formData, API_COUPON_INSERT, "Coupon added successfully");
                }else{
                      formData.append('_method', method);
                    await updateData(formData, `${API_COUPON_UPDATE}${couponItem.id}`, "Coupon status updated successfully");
                }
               
                navigation.navigate("Coupon-Screen", { rest_id: rest_id });
            } catch (error) {
                console.log(error);
                //Alert.alert('Error', 'Failed to add coupon.');
            }
        }
    };

    const handleChange = (name, value) => {
        setCoupon({ ...coupon, [name]: value });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Coupon Form</Text>

            <Text style={styles.label}>Coupon Code</Text>
            <TextInput
                style={styles.input}
                placeholder="Coupon Code"
                value={coupon.code}
                onChangeText={(text) => handleChange('code', text)}
            />
            {errors.code && <Text style={styles.errorText}>{errors.code}</Text>}

            <Text style={styles.label}>Discount Type</Text>
            <Picker
                selectedValue={coupon.discount_type}
                style={styles.picker}
                onValueChange={(itemValue) => handleChange('discount_type', itemValue)}
            >
                <Picker.Item label="Select Discount Type" value="" />
                <Picker.Item label="Amount" value="amount" />
                <Picker.Item label="Percentage" value="percentage" />
            </Picker>
            {errors.discount_type && <Text style={styles.errorText}>{errors.discount_type}</Text>}

            <Text style={styles.label}>Discount Value</Text>
            <TextInput
                style={styles.input}
                placeholder="Discount Value"
                value={coupon.discount_value}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('discount_value', text)}
            />
            {errors.discount_value && <Text style={styles.errorText}>{errors.discount_value}</Text>}

            <Text style={styles.label}>Maximum Discount Value</Text>
            <TextInput
                style={styles.input}
                placeholder="Maximum Discount Value"
                value={coupon.discount_max}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('discount_max', text)}
            />
            {errors.discount_max && <Text style={styles.errorText}>{errors.discount_max}</Text>}

            <Text style={styles.label}>Minimum Order Value</Text>
            <TextInput
                style={styles.input}
                placeholder="Minimum Order Value"
                value={coupon.min_order_val}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('min_order_val', text)}
            />
            {errors.min_order_val && <Text style={styles.errorText}>{errors.min_order_val}</Text>}

            <Text style={styles.label}>Coupon Quantity</Text>
            <TextInput
                style={styles.input}
                placeholder="Quantity"
                value={coupon.quantity.toString()}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('quantity', text)}
            />
            {errors.quantity && <Text style={styles.errorText}>{errors.quantity}</Text>}

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={coupon.description}
                onChangeText={(text) => handleChange('description', text)}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

            <Text style={styles.label}>Customer Mobile Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Customer Mobile Number"
                value={coupon.valid_for_user}
                onChangeText={(text) => handleChange('valid_for_user', text)}
            />
            {errors.valid_for_user && <Text style={styles.errorText}>{errors.valid_for_user}</Text>}
            <Text style={styles.noteText}>* If you want to issue this coupon to any specific customer enter mobile number of that customer Or set it 0 For All</Text>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Save Coupon</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#343a40',
    },
    label: {
        top: 10,
        left: 10,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 5,
        zIndex: 1,
        fontSize: 14,
        color: '#333',
        alignSelf: 'flex-start',
    },
    input: {
        height: 50,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        paddingHorizontal: 12,
        backgroundColor: '#ffffff',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 12,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#ffffff',
    },
    errorText: {
        color: '#dc3545',
        marginBottom: 12,
        fontSize: 14,
    },
    noteText: {
        color: '#dc3545',
        marginBottom: 12,
        fontSize: 14,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#28a745',
        padding: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CouponForm;
