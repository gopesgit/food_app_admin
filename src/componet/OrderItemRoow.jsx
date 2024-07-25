import React, { useContext, useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Icon } from '@rneui/base';
import EditRestaurant from '../Screen/EditRestaurant';
import AddFoodItem from '../Screen/AddFoodItem';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-elements';
import moment from 'moment';
import { API_ORDER } from '../common/apiURL';
import { insertData } from '../common/someCommonFunction';
import { OperationContext } from '../context/operationContext';
const OrderItemRoow = ({ item }) => {    
    //console.log(item);
    const navigation = useNavigation();
  
    //console.log("===>",item.restaurant_id);
    const handleCancel = async () => {
        const formdata = new FormData();
        formdata.append('_method', 'put');
        formdata.append('status_restaurant',"cancel"); // Set is_default = 1 for the selected address, 0 for others
        await insertData(formdata, API_ORDER + item.id);
        // Add your logic for cancel action here
        console.log('Cancel button pressed',item.id);
        //navigation.navigate("Order-List")
        //setItem(await fetchOrderList(item.restaurant_id));
      };
    
      const handleAccept = async () => {
        const formdata = new FormData();
        formdata.append('_method', 'put');
        formdata.append('status_restaurant',"accept"); // Set is_default = 1 for the selected address, 0 for others
        await insertData(formdata, API_ORDER + item.id);
        // Add your logic for cancel action here
        console.log('Cancel button pressed',item.id);
        //navigation.navigate("Order-List")
        //setItem(await fetchOrderList(item.restaurant_id));
      };
      const handleDelivery = async () => {
        const formdata = new FormData();
        formdata.append('_method', 'put');
        formdata.append('status_restaurant',"delivery"); // Set is_default = 1 for the selected address, 0 for others
        await insertData(formdata, API_ORDER + item.id);
        // Add your logic for cancel action here
        console.log('Cancel button pressed',item.id);
        //navigation.navigate("Order-List")
        //setItem(await fetchOrderList(item.restaurant_id));
      };
    return (
        <View >
            {item.status_restaurant!=='delivery'?
            <Card>
                <Card.Title>{ moment(item.updatedAt).format('MMMM Do YYYY, h:mm:ss a')},{item.status_restaurant}</Card.Title>

                {item.orders.map((item, index) => {
                    return (
                        <View key={item.id} style={{ borderBottomWidth: 1, paddingVertical: 4, borderTopWidth: 1, marginVertical: 1 }}>
                            <Text >Food Name: {item.name}</Text>
                            <Text >Quantity:  {item.quantity}</Text>
                            <Text >Selling Price:  {item.price}</Text>
                        </View>

                    );
                })}
                <View style={{ borderBottomWidth: 1, paddingVertical: 4, borderTopWidth: 1, marginVertical: 1 }}>
                    <Text>Total Amount:{item.amount}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginTop:12 }}>
                    <Button
                        title="Cancel"
                        size='sm'
                        buttonStyle={{ backgroundColor: 'red', width: 120 }}
                        onPress={handleCancel}
                    />
                     {item.status_restaurant!=='accept'?
                    <Button
                        title="Accept"
                        size='sm'
                        buttonStyle={{ backgroundColor: 'green', width: 120 }}
                        onPress={handleAccept}
                    />:
                    <Button
                    title="Delivery"
                    size='sm'
                    buttonStyle={{ backgroundColor: 'green', width: 120 }}
                    onPress={handleDelivery}
                    />
                    }
                </View>
            
            </Card>
:null}
            {/* <View style={styles.orderHeader}>
                {item.orders.map(item => (
                    <View key={item.id} >
                        <Text >{item.name}</Text>
                        <Text>Price: {item.price}</Text>
                        <Text >Quantity: {item.quantity}</Text>
                        <Text>Restaurant: {item.restaurant_id}</Text>
                    </View>
                ))}
                <View style={styles.orderInfo}>
                    <Text style={styles.restaurantName}>{item.name}</Text>
                    <Text style={styles.location}>Rs. {item.amount}</Text>
                    <TouchableOpacity>
                        <Text style={styles.menuLink}>{item.menuLink}</Text>
                    </TouchableOpacity>
                </View>
                <Icon name="dots-vertical" type="material-community" size={24} color="#333" />
            </View>

            <View style={styles.orderFooter}>
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Edit-Food', { item: item })}>
                    <Icon name="edit" color="#fff" size={20} />
                    <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Add-Food")}>
                    <Icon name="add" color="#fff" size={20} />
                    <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>

            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 0,
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    backIcon: {
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        margin: 15,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16,
        color: '#333',
    },
    orderList: {
        paddingBottom: 20,
    },
    orderCard: {
        backgroundColor: '#fff',

        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    orderHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    restaurantImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    orderInfo: {
        flex: 1,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    location: {
        fontSize: 14,
        color: '#666',
    },
    menuLink: {
        fontSize: 14,
        color: '#007AFF',
        marginTop: 5,
    },
    orderDetails: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    orderTime: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    status: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    paymentFailed: {
        fontSize: 14,
        color: '#FF3B30',
        marginBottom: 5,
    },
    paymentFailedDetails: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        color: '#333',
        marginRight: 10,
    },
    paymentStatus: {
        fontSize: 12,
        color: '#666',
        backgroundColor: '#eee',
        padding: 5,
        borderRadius: 5,
    },
});
export default OrderItemRoow;
// onPress={() => navigation.navigate("Restaurant-Screen",{item:item})}