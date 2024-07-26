import React, { useContext, useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { withBadge ,Icon} from 'react-native-elements'

import EditRestaurant from '../Screen/EditRestaurant';
import AddFoodItem from '../Screen/AddFoodItem';
import { useNavigation } from '@react-navigation/native';
import { getData } from '../common/someCommonFunction';
import { API_ORDER_LIST } from '../common/apiURL';
import { OperationContext } from '../context/operationContext';
const RestaurantRow = ({ item }) => {
  const navigation=useNavigation();  
  const [pendingorders,setPendingOrders]=useState([]);
 const {fetchOrderList}=useContext(OperationContext);
 useEffect(()=>{
  const fetchData = async () => {
    try {
      const orderList = await fetchOrderList(item.id);
      //console.log("hh", orderList.filter((item)=>item.status_restaurant==='pending')); // Logging the fetched order list
      setPendingOrders(orderList.filter((item)=>item.status_restaurant!=='cancel'))
    } catch (error) {
      console.error('Error fetching order list:', error);
    }
  };

  fetchData(); 
 },[navigation])

 
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
        <Icon name="dots-vertical" type="material-community" size={24} color="#333" onPress={() => navigation.navigate("Restaurant-Screen",{item:item})} />
      </View>
      <Text style={styles.orderDetails}>{item.address}</Text>
      <Text style={styles.orderTime}>Pin: {item.pincode}</Text>
      <Text style={styles.amount}>Licenses:{item.licenses}</Text>
      <Text style={styles.amount}>Branch:{item.branch}</Text>
      <View style={styles.orderFooter}>
      <TouchableOpacity style={styles.editButton} onPress={() =>  navigation.navigate('Edit-Restaurant', { item: item })}>
          <Icon name="edit" color="#fff" size={20} />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() =>{pendingorders.length?navigation.navigate("Order-List",{oitem: pendingorders}):null}}>
          <Icon name="add" color="#fff" size={20} />
          <Text style={styles.actionButtonText}>Delevery({pendingorders.length})</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Add-Food",{rest_id:item.id})}>
          <Icon name="add" color="#fff" size={20} />
          <Text style={styles.actionButtonText}>Add Food</Text>
        </TouchableOpacity>
      
        
      </View>
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
    padding: 15,
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
export default RestaurantRow;
