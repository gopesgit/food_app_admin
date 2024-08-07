import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, RefreshControl } from 'react-native';
import { getData } from '../common/someCommonFunction';
import { API_ORDERVIEW_DELIVERY } from '../common/apiURL';
import { Button } from 'react-native-elements';

const DeliveryBoyScreen = () => {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = async () => {
    try {
      setRefreshing(true);
      const fetchedOrders = await getData(API_ORDERVIEW_DELIVERY);
      console.log(fetchedOrders);
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleAccept = (orderId) => {
    // Handle the accept action
    console.log('Accepting order:', orderId);
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderDate}>Date: {item.date}</Text>
      {/* Uncomment if you want to display the restaurant logo */}
      {/* <Image source={{ uri: item.restaurant.logo_url }} style={styles.restaurantLogo} /> */}
      <Text style={styles.restaurantName}>{item.restaurant.name}</Text>
      <Text style={styles.address}>{item.restaurant.street_address}</Text>

      <View style={styles.deliveryAddressContainer}>
        <Text style={styles.deliveryAddressTitle}>Delivery Address:</Text>
        <Text>{item.delivery_address.street_address}</Text>
        <Text>{item.delivery_address.near_location}</Text>
        <Text>{item.delivery_address.city}, {item.delivery_address.state} {item.delivery_address.postal_code}</Text>
        <Text>{item.delivery_address.country}</Text>
        <Text>{item.delivery_address.description}</Text>
      </View>

      <FlatList
        data={item.order_details}
        keyExtractor={(detail) => detail.name}
        renderItem={({ item }) => (
          <View style={styles.itemDetail}>
            <Text>{item.name}</Text>
            <Text>Qty: {item.quantity}</Text>
            <Text>Price: ${item.price}</Text>
          </View>
        )}
      />

      <Button
        title="Accept"
        buttonStyle={styles.button}
        disabled={item.status_restaurant !== 'accept' || item.status_delivery === 'accept'}
        onPress={() => handleAccept(item.id)}
      />

      <Text style={styles.status}>Restaurant Status: {item.status_restaurant}</Text>
      <Text style={styles.status}>Delivery Status: {item.status_delivery}</Text>
      <Text style={styles.status}>Payment Status: {item.status_payment === 'pending' ? "Collect Cash" : "Paid"}</Text>
      <Text style={styles.amount}>Total Amount: ${item.amount}</Text>
      <Text style={styles.deliveryFees}>Delivery Fees: ${item.delivery_fees}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(order) => order.id.toString()}
        renderItem={renderOrderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadOrders}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  restaurantLogo: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deliveryFees: {
    fontSize: 14,
    marginBottom: 8,
  },
  itemDetail: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 16,
  },
  deliveryAddressContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  deliveryAddressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default DeliveryBoyScreen;
