import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text, FlatList, RefreshControl } from 'react-native';
import { OperationContext } from '../context/operationContext';
import AddRestaurant from './AddRestaurant';
import RestaurantRow from '../componet/RestaurantRow';
import FoodItemRoow from '../componet/FoodItemRoow';
import { Icon } from '@rneui/base';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const { restaurant,getRestaurantList } = useContext(OperationContext);
  const [refreshing, setRefreshing] = useState(false);
  //console.log(restaurant);
  const showAddRestaurant = !restaurant || restaurant.length === 0;
  //console.log(restaurant.length);
  const [modalVisible, setModalVisible] = useState(false);
  
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await getRestaurantList(); // Function to fetch restaurants
    } catch (error) {
      console.error('Error refreshing restaurants:', error);
    }
    setRefreshing(false);
  }, []);
  
  useFocusEffect(
    useCallback(() => {
      // Trigger refresh when screen gains focus
      onRefresh();
    }, [onRefresh])
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" type="material" size={24} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by restaurant or dish"
          placeholderTextColor="#888"
        />
        <Icon name="mic" type="material" size={24} color="#888" />
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Add-Restaurant')}>
     
     <Text style={styles.actionButtonText}>Add New</Text>
   </TouchableOpacity>
      <FlatList
        data={restaurant}
        renderItem={({ item }) => <RestaurantRow item={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />


      {/* <FlatList
      data={formattedOrders}
      renderItem={renderOrder}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.orderList}
    /> */}
    </View>
  );
};

export default HomeScreen;

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
    marginHorizontal:15,
    marginTop:15,
    marginBottom:5,
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
  editButton: {
    flexDirection: 'row',
    marginBottom:5,
    alignItems: 'center',
    backgroundColor: '#007AFF', // Background color for the button
    borderRadius: 5, // Rounded corners
    paddingHorizontal: 15, // Horizontal padding inside the button
    paddingVertical: 10, // Vertical padding inside the button
   
    alignSelf: 'center', // Align button to center horizontally
  },
  actionButtonText: {
    color: '#fff', // Text color
    fontSize: 16, // Text size
    marginLeft: 5, // Space between icon and text, adjust as needed
  },
});