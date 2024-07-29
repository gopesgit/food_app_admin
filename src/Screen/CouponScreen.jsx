import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { getData, updateData } from '../common/someCommonFunction';
import { API_COUPON_RES, API_COUPON_UPDATE } from '../common/apiURL';
import moment from 'moment';

const CouponScreen = ({ route }) => {
    const { rest_id } = route.params;
    const navigation = useNavigation();

    const [coupons, setCoupons] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchCouponData = async () => {
        try {
            const data = await getData(API_COUPON_RES + rest_id);
            setCoupons(data);
        } catch (error) {
            console.error('Failed to fetch coupons:', error);
            // Optionally show an alert or UI feedback here
        }
    };

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await fetchCouponData();
        setIsRefreshing(false);
    }, [rest_id]);

    useEffect(() => {
        fetchCouponData();
    }, [rest_id]);

    const handleStatusButtonClick = async (id, isActive) => {
        let formdata = new FormData();
        formdata.append('_method', 'put');
        formdata.append('active', isActive ? 0 : 1);

        try {            
            await updateData(formdata, `${API_COUPON_UPDATE}${id}`, "Coupon status updated successfully");
            onRefresh();
        } catch (error) {
            console.error('Failed to update coupon status:', error);
        }
    };

    const formatDate = (date) => moment(date).format('MMM DD, YYYY');

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Code</Text>
                <Text style={styles.tableData}>{item.code}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Discount Type</Text>
                <Text style={styles.tableData}>{item.discount_type}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Value</Text>
                <Text style={styles.tableData}>{item.discount_value}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Min Order Value</Text>
                <Text style={styles.tableData}>{item.min_order_val}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Valid From</Text>
                <Text style={styles.tableData}>{formatDate(item.valid_from)}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Valid Until</Text>
                <Text style={styles.tableData}>{formatDate(item.valid_until)}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Description</Text>
                <Text style={styles.tableData}>{item.description}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Quantity</Text>
                <Text style={styles.tableData}>{item.quantity}</Text>
            </View>
            <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, { flex: 1 }]}>
                    Status ({item.active ? "Active" : "Inactive"})
                </Text>
                <TouchableOpacity
                    style={[styles.statusButton, item.active ? styles.activeButton : styles.inactiveButton]}
                    onPress={() => handleStatusButtonClick(item.id, item.active)}
                >
                    <Text style={styles.statusButtonText}>{item.active ? "Deactivate" : "Activate"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate("Coupon-Form", { couponItem: item,rest_id:rest_id })}
                >
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Button 
                title="Add Coupon" 
                onPress={() => navigation.navigate("Coupon-Form", { rest_id: rest_id })} 
                containerStyle={styles.addButtonContainer}
                buttonStyle={styles.addButton}
            />
            <FlatList
                data={coupons}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    addButtonContainer: {
        marginBottom: 16,
    },
    addButton: {
        backgroundColor: '#007bff',
        borderRadius: 8,
    },
    listContainer: {
        paddingBottom: 16,
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    tableHeader: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
    },
    tableData: {
        fontSize: 14,
        color: '#666',
    },
    statusButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    activeButton: {
        backgroundColor: '#28a745',
    },
    inactiveButton: {
        backgroundColor: '#dc3545',
    },
    statusButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    editButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CouponScreen;
