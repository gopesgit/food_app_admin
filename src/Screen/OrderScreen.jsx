// OrderScreen.jsx
import React, { useCallback, useContext, useState } from 'react';
import { StyleSheet, View, TextInput, FlatList, RefreshControl } from 'react-native';
import { OperationContext } from '../context/operationContext';
import OrderItemRoow from '../componet/OrderItemRoow';
import { Icon } from '@rneui/base';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const OrderScreen = ({ route }) => {
  const { rest_id } = route.params; // Get the restaurant ID from navigation params
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all'); // State for selected order status
  const { fetchOrderListAll } = useContext(OperationContext);

  // Callback for refreshing data
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const updatedItems = await fetchOrderListAll(rest_id); // Use restaurant ID from route params
      setItems(updatedItems);
    } catch (error) {
      console.error('Error refreshing orders:', error);
    }
    setRefreshing(false);
  }, [rest_id, fetchOrderListAll]);

  // Refresh data when screen is focused
  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [onRefresh])
  );

  // Filter the items based on the search query and selected status
  const filteredItems = items.filter(item => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    // Check if restaurant name matches the search query
    const matchesRestaurantName = item.restaurant.name.toLowerCase().includes(lowerCaseQuery);

    // Check if any dish name matches the search query
    const matchesDishName = item.order_details.some(orderDetail =>
      orderDetail.name.toLowerCase().includes(lowerCaseQuery)
    );

    // Check if the total price matches the search query
    const matchesTotalPrice = item.amount.toString().includes(lowerCaseQuery);

    // Check if the status matches the selected filter or if 'all' is selected
    const matchesStatus = selectedStatus === 'all' || item.status_restaurant === selectedStatus;

    // Return true if all conditions are met
    return (matchesRestaurantName || matchesDishName || matchesTotalPrice) && matchesStatus;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" type="material" size={24} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by dish or total price"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon name="mic" type="material" size={24} color="#888" />
      </View>

      <Picker
        selectedValue={selectedStatus}
        onValueChange={(itemValue) => setSelectedStatus(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="All Orders" value="all" />
        <Picker.Item label="Pending" value="pending" />
        <Picker.Item label="Accepted" value="accept" />
        <Picker.Item label="Delivered" value="delivery" />
        <Picker.Item label="Cancelled" value="cancel" />
        {/* Add more status options as needed */}
      </Picker>

      <FlatList
        data={filteredItems}
        renderItem={({ item }) => <OrderItemRoow item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ marginTop: 8 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 15,
    marginTop: 5,
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
  picker: {
    marginHorizontal: 15,
    marginTop: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
  },
});
