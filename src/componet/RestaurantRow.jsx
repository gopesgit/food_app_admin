import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { OperationContext } from '../context/operationContext';
import { updateData } from '../common/someCommonFunction';
import { API_RESTAURANT } from '../common/apiURL';
import { AuthContext } from '../context/authContex';

const RestaurantRow = ({ item, onRefresh }) => {
  const navigation = useNavigation();
  const [pendingOrders, setPendingOrders] = useState([]);
  const { fetchOrderList } = useContext(OperationContext);
  const { user } = useContext(AuthContext);

  // Function to handle the toggle between open and closed states
  const handleClosedToggle = async () => {
    const formData = new FormData();
    formData.append('_method', 'put');
    formData.append('closed', item.closed ? 0 : 1);

    try {
      await updateData(formData, `${API_RESTAURANT}/${item.id}`, "Restaurant Status Update");
      onRefresh();
    } catch (error) {
      console.error("Error updating restaurant status:", error);
    }
  };

  // Function to handle the toggle for available for delivery
  const handleAvailableForDeliveryToggle = async () => {
    const formData = new FormData();
    formData.append('_method', 'put');
    formData.append('available_for_delivery', item.available_for_delivery ? 0 : 1);

    try {
      await updateData(formData, `${API_RESTAURANT}/${item.id}`, "Restaurant Delivery Status Update");
      onRefresh();
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  // Function to handle the toggle for Restaruant Status
  const handleApproveRejectToggle = async () => {
    const formData = new FormData();
    formData.append('_method', 'put');
    formData.append('active', item.active ? 0 : 1);

    try {
      await updateData(formData, `${API_RESTAURANT}/${item.id}`, "Restaurant Active Status Update");
      onRefresh();
    } catch (error) {
      console.error("Error updating Active status:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderList = await fetchOrderList(item.id);
        setPendingOrders(orderList.filter((order) => order.status_restaurant !== 'cancel'));
      } catch (error) {
        console.error('Error fetching order list:', error);
      }
    };

    fetchData();
  }, [fetchOrderList, item.id]);

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Image source={{ uri: item.logo_url }} style={styles.restaurantImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <Text style={styles.location}>{item.description}</Text>
          <TouchableOpacity>
            <Text style={styles.menuLink}>{item.menuLink}</Text>
          </TouchableOpacity>
        </View>
        <Icon
          name="dots-vertical"
          type="material-community"
          size={20}
          color="#333"
          onPress={() => navigation.navigate("Restaurant-Screen", { id: item.id })}
        />
      </View>
      <Text style={styles.orderDetails}>{ item.street_address }</Text>
      <Text style={styles.orderTime}>Pin: {item.postal_code}</Text>
      <Text style={styles.amount}>Licenses: {item.licenses}</Text>
      <Text style={styles.amount}>Branch: {item.branch}</Text>
      <View style={styles.orderFooter}>
        <TouchableOpacity style={styles.buttonEdit} onPress={() => navigation.navigate('Edit-Restaurant', { item })}>
          <Icon name="edit" color="#fff" size={18} />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>

        {pendingOrders.length > 0 && (
          <TouchableOpacity
            style={styles.buttonDelivery}
            onPress={() => navigation.navigate("Order-List", { oitem: pendingOrders })}
          >
            <Icon name="add" color="#fff" size={18} />
            <Text style={styles.actionButtonText}>Delivery ({pendingOrders.length})</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.buttonAddFood} onPress={() => navigation.navigate("Add-Food", { rest_id: item.id })}>
          <Icon name="add" color="#fff" size={18} />
          <Text style={styles.actionButtonText}>Add Food</Text>
        </TouchableOpacity>
        {item.active === 1 ? (
            <TouchableOpacity style={styles.buttonOrder} onPress={() => navigation.navigate("Order-List", { rest_id: item.id })}>
              <Icon name="add" color="#fff" size={18} />
              <Text style={styles.actionButtonText}>Order</Text>
            </TouchableOpacity>
        ) : (
          <View style={styles.buttonOrderDisabled}>
            <Icon name="add" color="#fff" size={18} />
            <Text style={styles.actionButtonTextDisabled}>Order</Text>
          </View>
        )}
        {item.active === 1 ? (
            <TouchableOpacity 
              style={item.closed ? styles.buttonOpen : styles.buttonClosed}
              onPress={handleClosedToggle}
            >
              <Icon name={item.closed ? "check-circle" : "cancel"} color="#fff" size={18} />
              <Text style={styles.actionButtonText}>{item.closed ? "Open" : "Closed"}</Text>
            </TouchableOpacity>
        ) : (
          <View style={styles.buttonClosedDisabled}>
            <Icon name="cancel" color="#fff" size={18} />
            <Text style={styles.actionButtonTextDisabled}>Closed</Text>
          </View>
        )}
        {item.active === 1 ? (
          <TouchableOpacity 
            style={item.available_for_delivery ? styles.buttonAvailableForDeliveryActive : styles.buttonAvailableForDelivery}
            onPress={handleAvailableForDeliveryToggle}
          >
            <Icon name={item.available_for_delivery ? "check-circle" : "cancel"} color="#fff" size={18} />
            <Text style={styles.actionButtonText}>{item.available_for_delivery ? "Available for Delivery" : "Not Available for Delivery"}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonDeliveryDisabled}>
            <Icon name="cancel" color="#fff" size={18} />
            <Text style={styles.actionButtonTextDisabled}>Not Available for Delivery</Text>
          </View>
        )}
        {item.active === 1 ? (
          <TouchableOpacity style={styles.buttonOrder} onPress={() =>navigation.navigate("DeliveryFeeScreen", { rest_id: item.id })}>
            <Icon name="add" color="#fff" size={18} />
            <Text style={styles.actionButtonText}>Delivery Fees</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonOrderDisabled}>
            <Icon name="add" color="#fff" size={18} />
            <Text style={styles.actionButtonTextDisabled}>Delivery Fees</Text>
          </View>
        )}
        {item.active === 1 ? (
          <TouchableOpacity style={styles.buttonOrder} onPress={() =>navigation.navigate("Coupon-Screen", { rest_id: item.id })}>
            <Icon name="add" color="#fff" size={18} />
            <Text style={styles.actionButtonText}>Add Coupon</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonOrderDisabled}>
            <Icon name="add" color="#fff" size={18} />
            <Text style={styles.actionButtonTextDisabled}>Add Coupon</Text>
          </View>
        )}
        {user.type === 'admin' && (
          <TouchableOpacity 
            style={item.active === 1 ? styles.buttonOpen : styles.buttonClosed}
            onPress={handleApproveRejectToggle}
          >
            <Icon name={item.active === 1 ? "check-circle" : "hourglass-empty"} color="#fff" size={18} />
            <Text style={styles.actionButtonText}>{item.active === 1 ? "Approved Restaurant" : "Pending Restaurant"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  orderCard: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: width - 20, // Adjust width to fit screen with margin
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  restaurantImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  orderInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 12,
    color: '#666',
  },
  menuLink: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 5,
  },
  orderDetails: {
    fontSize: 12,
    color: '#333',
    marginBottom: 5,
  },
  orderTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  amount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  orderFooter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center align the buttons
    alignItems: 'center',
  },
  buttonEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonAddFood: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff5722',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonOrder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff9800',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonOrderDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffb74d', // light color of #ff9800
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonClosed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff0000',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonOpen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745', // Different color for open
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonClosedDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6262', // Different color for open
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonAvailableForDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonAvailableForDeliveryActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745', // Green color when available for delivery
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonDeliveryDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4da2ff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 6,
  },
  actionButtonTextDisabled: {
    color: '#fff', // Grey color to indicate disabled
    fontSize: 12,
    marginLeft: 6,
  },
  buttonPending: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc', // Grey color to indicate pending
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
});

export default RestaurantRow;
