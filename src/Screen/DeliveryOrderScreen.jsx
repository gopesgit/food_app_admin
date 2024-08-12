import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { getData, insertData } from '../common/someCommonFunction';
import { API_ORDER, API_ORDER_LIST } from '../common/apiURL';

const DeliveryOrderScreen = ({ route }) => {
  const { id } = route.params;
  const [pendingOrders, setPendingOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [id]);

  const fetchOrders = async () => {
    setRefreshing(true);
    try {
      const orderlistPending = await getData(API_ORDER_LIST + id);
      const filteredOrders = orderlistPending.filter(
        (item) => item.status_restaurant !== 'cancel' && item.status_restaurant !== 'delivery'
      );
      setPendingOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    fetchOrders();
  }, [id]);

  const renderOrderItem = ({ item }) => (
    <OrderItemRow
      order={item}
      onAccept={handleAccept}
      onCancel={handleCancel}
      onDeliver={handleDeliver}
    />
  );

  const handleAccept = async (orderId) => {
    const formdata = new FormData();
    formdata.append('_method', 'put');
    formdata.append('status_restaurant', 'accept');
    await insertData(formdata, `${API_ORDER}${orderId}`, "Update");
    onRefresh();
  };

  const handleCancel = async (orderId) => {
    const formdata = new FormData();
    formdata.append('_method', 'put');
    formdata.append('status_restaurant', 'cancel');
    await insertData(formdata, `${API_ORDER}${orderId}`);
    onRefresh();
  };

  const handleDeliver = async (orderId) => {
    const formdata = new FormData();
    formdata.append('_method', 'put');
    formdata.append('status_restaurant', 'delivery');
    await insertData(formdata, `${API_ORDER}${orderId}`);
    onRefresh();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pendingOrders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

// OrderItemRow Component
const OrderItemRow = ({ order, onAccept, onCancel, onDeliver }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>Order ID: {order.id}</Text>
      <Text style={styles.text}>Date: {order.date}</Text>
      <Text style={styles.text}>Amount: ₹{order.amount}</Text>
      <Text style={styles.text}>Delivery Address: {order.delivery_address.street_address}</Text>
      <Text style={styles.text}>Restaurant: {order.restaurant.name}</Text>
      <Text style={styles.text}>Customer: {order.order_user.name}</Text>
      <Text style={styles.text}>
        Delivery Partner: {order.delivery_user ? order.delivery_user.name : 'Not assigned'}
      </Text>
      <Text style={styles.text}>Payment Method: {order.payment_method}</Text>
      <Text style={[styles.text, { color: order.status_payment === 'pending' ? '#FFA500' : '#4CAF50' }]}>
        Payment Status: {order.status_payment}
      </Text>
      <Text style={[styles.text, { color: order.status_delivery === 'pending' ? '#FFA500' : '#4CAF50' }]}>
        Delivery Status: {order.status_delivery}
      </Text>
      <Text style={[styles.text, { color: order.status_restaurant === 'pending' ? '#FFA500' : '#4CAF50' }]}>
        Restaurant Status: {order.status_restaurant}
      </Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, styles.flex1]}>Food</Text>
          <Text style={[styles.tableHeaderText, styles.flex1]}>Quantity</Text>
          <Text style={[styles.tableHeaderText, styles.flex1]}>Price</Text>
        </View>
        {order.order_details.map((detail) => (
          <View key={detail.id} style={styles.tableRow}>
            <Text style={[styles.tableText, styles.flex1]}>{detail.name}</Text>
            <Text style={[styles.tableText, styles.flex1]}>{detail.quantity}</Text>
            <Text style={[styles.tableText, styles.flex1]}>₹{detail.price}</Text>
          </View>
        ))}
      </View>

      {/* Conditional buttons */}
      {order.status_restaurant === 'accept' && order.status_delivery === 'accept' ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.deliverButton]} onPress={() => onDeliver(order.id)}>
            <Text style={styles.buttonText}>Deliver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => onCancel(order.id)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : order.status_restaurant === 'pending' ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => onAccept(order.id)}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => onCancel(order.id)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : order.status_restaurant === 'accept' ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.acceptedButton]} disabled={true}>
            <Text style={styles.buttonText}>Accepted</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => onCancel(order.id)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Lighter background color
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    padding: 20,
    elevation: 3, // Shadow for card-like effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600', // Slightly lighter than bold
    marginBottom: 10,
    color: '#333', // Dark text color
  },
  text: {
    fontSize: 16,
    color: '#666', // Subtle text color
    marginBottom: 5,
  },
  tableContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tableText: {
    fontSize: 16,
    color: '#333',
  },
  flex1: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  acceptButton: {
    backgroundColor: '#4CAF50', // Green for accept
  },
  cancelButton: {
    backgroundColor: '#F44336', // Red for cancel
  },
  deliverButton: {
    backgroundColor: '#2196F3', // Blue for deliver
  },
  acceptedButton: {
    backgroundColor: '#dddddd', // Blue for deliver
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeliveryOrderScreen;
