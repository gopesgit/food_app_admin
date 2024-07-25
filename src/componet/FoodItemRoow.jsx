import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Icon } from '@rneui/base';
import EditRestaurant from '../Screen/EditRestaurant';
import AddFoodItem from '../Screen/AddFoodItem';
import { useNavigation } from '@react-navigation/native';
const FoodItemRoow = ({ item }) => {
  const navigation=useNavigation();
  
  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Image source={{ uri: item.food_image_url }} style={styles.restaurantImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <Text style={styles.location}>Rs. {item.price}</Text>
          <TouchableOpacity>
            <Text style={styles.menuLink}>{item.menuLink}</Text>
          </TouchableOpacity>
        </View>
        <Icon name="dots-vertical" type="material-community" size={24} color="#333"  />
      </View>
      
      <View style={styles.orderFooter}>
      <TouchableOpacity style={styles.editButton} onPress={() =>  navigation.navigate('Edit-Food', { item: item })}>
          <Icon name="edit" color="#fff" size={20} />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("Add-Food")}>
          <Icon name="add" color="#fff" size={20} />
          <Text style={styles.actionButtonText}>Delete</Text>
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
export default FoodItemRoow;
// onPress={() => navigation.navigate("Restaurant-Screen",{item:item})}