import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, Text } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
const CouponForm = ({ route, navigation }) => {
    const validFrom = moment().format('YYYY-MM-DD');
    const validUntil = moment().add(7, 'days').format('YYYY-MM-DD');
    const [coupon, setCoupon] = useState({
        code: '',
        discount_type: '',
        discount_value: '',
        discount_min: '',
        discount_max: '',
        min_order_val: '',
        quantity: '',
        valid_for_user: "all",
        valid_from: validFrom,
        valid_until:validUntil,
        active: true,
        description: '',
    });

    const [errors, setErrors] = useState({}); // To store validation errors

    const { couponItem } = route.params || {}; // For editing an existing coupon
    const { rest_id } = route.params || {};

    useEffect(() => {
        if (couponItem) {
            setCoupon({ ...couponItem, valid_for_user: couponItem.valid_for_user || 'all' });
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

        if (coupon.discount_min && isNaN(Number(coupon.discount_min))) {
            errors.discount_min = 'Discount min must be a number';
            valid = false;
        }

        if (coupon.discount_max && isNaN(Number(coupon.discount_max))) {
            errors.discount_max = 'Discount max must be a number';
            valid = false;
        }

        if (coupon.min_order_val && isNaN(Number(coupon.min_order_val))) {
            errors.min_order_val = 'Minimum order value must be a number';
            valid = false;
        }

        if (!coupon.quantity) {
            errors.quantity = 'Quantity must be a number';
            valid = false;
        }

        if (!coupon.valid_for_user) {
            errors.valid_for_user = 'Valid for user is required';
            valid = false;
        }

        if (!coupon.valid_from) {
            errors.valid_from = 'Valid from is required';
            valid = false;
        }

        if (!coupon.valid_until) {
            errors.valid_until = 'Valid until is required';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = () => {
        if (validate()) {
            const method = couponItem ? 'put' : 'post';
            const url = couponItem ? `https://yourapi.com/api/coupons/${couponItem.id}` : 'https://yourapi.com/api/coupons';
            console.log(coupon);
            // axios({
            //     method,
            //     url,
            //     data: coupon,
            // })
            //     .then(response => {
            //         Alert.alert('Success', 'Coupon saved successfully!');
            //         navigation.goBack();
            //     })
            //     .catch(error => {
            //         Alert.alert('Error', 'Failed to save coupon.');
            //         console.error(error);
            //     });
        }
    };

    const handleChange = (name, value) => {
        setCoupon({ ...coupon, [name]: value });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Code"
                value={coupon.code}
                onChangeText={(text) => handleChange('code', text)}
            />
            {errors.code && <Text style={styles.errorText}>{errors.code}</Text>}

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

            <TextInput
                style={styles.input}
                placeholder="Discount Value"
                value={coupon.discount_value}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('discount_value', text)}
            />
            {errors.discount_value && <Text style={styles.errorText}>{errors.discount_value}</Text>}

            {/* <TextInput
                style={styles.input}
                placeholder="Discount Min"
                value={coupon.discount_min}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('discount_min', text)}
            />
            {errors.discount_min && <Text style={styles.errorText}>{errors.discount_min}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Discount Max"
                value={coupon.discount_max}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('discount_max', text)}
            />
            {errors.discount_max && <Text style={styles.errorText}>{errors.discount_max}</Text>} */}

            <TextInput
                style={styles.input}
                placeholder="Minimum Order Value"
                value={coupon.min_order_val}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('min_order_val', text)}
            />
            {errors.min_order_val && <Text style={styles.errorText}>{errors.min_order_val}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Quantity"
                value={coupon.quantity}
                keyboardType="numeric"
                onChangeText={(text) => handleChange('quantity', text)}
            />
            {errors.quantity && <Text style={styles.errorText}>{errors.quantity}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Valid For User"
                value={coupon.valid_for_user}
                onChangeText={(text) => handleChange('valid_for_user', text)}
            />
            {errors.valid_for_user && <Text style={styles.errorText}>{errors.valid_for_user}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Valid From (YYYY-MM-DD HH:MM:SS)"
                value={coupon.valid_from}
                onChangeText={(text) => handleChange('valid_from', text)}
            />
            {errors.valid_from && <Text style={styles.errorText}>{errors.valid_from}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Valid Until (YYYY-MM-DD HH:MM:SS)"
                value={coupon.valid_until}
                onChangeText={(text) => handleChange('valid_until', text)}
            />
            {errors.valid_until && <Text style={styles.errorText}>{errors.valid_until}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Description"
                value={coupon.description}
                onChangeText={(text) => handleChange('description', text)}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

            <Button title="Save Coupon" onPress={handleSubmit} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 12,
    },
    errorText: {
        color: 'red',
        marginBottom: 12,
    },
});

export default CouponForm;
