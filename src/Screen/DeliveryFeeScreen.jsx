import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getData, updateData } from '../common/someCommonFunction';
import { API_DELIVERY_FEES, API_DELIVERY_FEES_BY_RES } from '../common/apiURL';

const DeliveryFeeScreen = ({ route }) => {
    const { rest_id } = route.params;
    const navigation = useNavigation();
    const [deliveryFees, setDeliveryFees] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    }, []);

    const fetchData = async () => {
        try {
            const data = await getData(API_DELIVERY_FEES_BY_RES + rest_id);
            setDeliveryFees(data);
        } catch (error) {
            console.error('Error fetching delivery fees:', error);
        }
    };

    const formatCurrency = (value) => {
        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
        });
        return formatter.format(value);
    };

    const handleStatusButtonClick = async (id, isActive,item) => {
        // Implement your logic here (e.g., API call to update status)
        // console.log(`Toggle status for ID ${id}. Current status: ${isActive ? 'Active' : 'Inactive'}`);
        // For demonstration, you can add a function to toggle the status locally
        // const updatedFees = deliveryFees.map(fee =>
        //     fee.id === id ? { ...fee, is_active: !isActive } : fee
        // );
        //setDeliveryFees(updatedFees);
        let formdata = new FormData();
        Object.keys(item).forEach(key => {
            formdata.append(key, item[key]);
        });
        formdata.append('_method', 'put');
        formdata.append('is_active',isActive ? 0 : 1);
        try {
            
            await updateData(formdata, `${API_DELIVERY_FEES}/${id}`, "Delivery fee updated successfully");
            //Alert.alert('Success', 'Delivery fee updated successfully.');
            //navigation.navigate("DeliveryFeeScreen", { rest_id: item.restaurant_id });
        } catch (error) {
            console.log(error);
            //Alert.alert('Error', 'Failed to update delivery fee.');
        }
        onRefresh()
    };

    const handleEditButtonClick = (item) => {
        // Navigate to edit screen with the delivery fee id
        //navigation.navigate("EditDeliveryFeeScreen", { id, rest_id });
        navigation.navigate("EditDeliveryFeeScreen", {item:item})
        console.log(item);
        onRefresh()
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={deliveryFees}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Min Order Amount:</Text>
                            <Text style={styles.value}>{formatCurrency(item.min_order_amount)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Max Order Amount:</Text>
                            <Text style={styles.value}>{item.max_order_amount ? formatCurrency(item.max_order_amount) : 'N/A'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Delivery Fee:</Text>
                            <Text style={styles.value}>{formatCurrency(item.delivery_fee)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Min Distance:</Text>
                            <Text style={styles.value}>{item.min_distance} km</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Max Distance:</Text>
                            <Text style={styles.value}>{item.max_distance ? `${item.max_distance} km` : 'N/A'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Effective From:</Text>
                            <Text style={styles.value}>{item.effective_from || 'N/A'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Status:</Text>
                            <View style={styles.statusContainer}>
                                <Text style={styles.value}>{item.is_active ? 'Active' : 'Inactive'}</Text>
                                <TouchableOpacity
                                    style={[styles.statusButton, item.is_active ? styles.activeButton : styles.inactiveButton]}
                                    onPress={() => handleStatusButtonClick(item.id, item.is_active,item)}
                                >
                                    <Text style={styles.buttonText}>{item.is_active ? 'Deactivate' : 'Activate'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => handleEditButtonClick(item)}
                                >
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>No delivery fees available.</Text>}
            />
            <Button
                title="Add New Delivery Fee"
                buttonStyle={styles.button}
                containerStyle={styles.buttonContainer}
                onPress={() => navigation.navigate("AddDeliveryFeeScreen", { rest_id })}
            />
        </View>
    );
};

export default DeliveryFeeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 10,
    },
    listContainer: {
        paddingBottom: 80, // Extra space for the button at the bottom
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 14,
        color: '#333',
        textAlign: 'right',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusButton: {
        marginLeft: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    activeButton: {
        backgroundColor: '#28a745', // Green for active
    },
    inactiveButton: {
        backgroundColor: '#dc3545', // Red for inactive
    },
    editButton: {
        marginLeft: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#007bff', // Blue for edit
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    buttonContainer: {
        margin: 15,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});
