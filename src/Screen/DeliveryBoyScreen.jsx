import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
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
      <Text style={styles.deliveryAddressTitle}>Pickup Address:</Text>
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

      <View style={styles.itemDetailsContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Qty</Text>
          <Text style={styles.headerCell}>Price</Text>
        </View>
        <FlatList
          data={item.order_details}
          keyExtractor={(detail) => detail.name}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>₹{item.price.toFixed(2)}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noDataText}>No items available</Text>}
        />
      </View>

      <Text style={styles.status}>Restaurant Status: {item.status_restaurant}</Text>
      <Text style={styles.status}>Delivery Status: {item.status_delivery}</Text>
      <Text style={styles.status}>Payment Status: {item.status_payment === 'pending' ? "Collect Cash" : "Paid"}</Text>
      <Text style={styles.amount}>Total Amount: ₹{item.amount.toFixed(2)}</Text>
      <Text style={styles.deliveryFees}>Delivery Fees: ₹{item.delivery_fees.toFixed(2)}</Text>

      <View style={styles.buttonContainer}>
        {item.status_payment === 'pending' && item.status_delivery === 'accept' && (
          <Button
            title={`Collect ₹${(item.amount + item.delivery_fees - item.discount_amount).toFixed(2)}`}
            buttonStyle={styles.paymentButton}
            onPress={() => handleAccept(item.id)}
          />
        )}
        <Button
          title="Accept"
          buttonStyle={styles.acceptButton}
          disabled={item.status_restaurant !== 'accept' || item.status_delivery === 'accept'}
          onPress={() => handleAccept(item.id)}
        />
      </View>
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
    backgroundColor: '#e0f7fa', // Light cyan background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796b', // Teal color
    marginBottom: 16,
  },
  orderContainer: {
    backgroundColor: '#ffffff', // White background for cards
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004d40', // Dark teal color
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b', // Teal color
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#004d40', // Dark teal color
    marginBottom: 8,
  },
  deliveryAddressContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#b2dfdb', // Light teal color
  },
  deliveryAddressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b', // Teal color
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    color: '#004d40', // Dark teal color
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004d40', // Dark teal color
    marginBottom: 8,
  },
  deliveryFees: {
    fontSize: 14,
    color: '#004d40', // Dark teal color
    marginBottom: 8,
  },
  itemDetailsContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#b2dfdb', // Light teal color
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#b2dfdb', // Light teal color
    paddingVertical: 8,
    backgroundColor: '#e0f2f1', // Very light teal color
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#004d40', // Dark teal color
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#b2dfdb', // Light teal color
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#004d40', // Dark teal color
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
    marginRight: 8,
  },
  paymentButton: {
    backgroundColor: '#4caf50', // Green color
    borderRadius: 8,
    paddingVertical: 12,
    flex: 1,
  },
  noDataText: {
    textAlign: 'center',
    color: '#00796b', // Teal color
    paddingVertical: 16,
  },
});

export default DeliveryBoyScreen;
