import React, { useCallback, useContext, useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, RefreshControl } from 'react-native';
import { OperationContext } from '../context/operationContext';
import OrderItemRoow from '../componet/OrderItemRoow';
import { Icon } from '@rneui/base';
import { useFocusEffect } from '@react-navigation/native';

const OrderScreen = ({ route }) => {
  const { oitem } = route.params;
  const [items, setItems] = useState(oitem);
  const [refreshing, setRefreshing] = useState(false);
  const { fetchOrderList } = useContext(OperationContext); 
  //console.log(oitem[0].restaurant_id);
  // Callback for refreshing data
  const onRefresh = useCallback(async () => {
    setRefreshing(true);   
    try {        
      const updatedItems = await fetchOrderList(oitem[0].restaurant_id);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error refreshing orders:', error);
    }
    setRefreshing(false);
  }, []);

  // Refresh data when screen is focused
  useFocusEffect(
    useCallback(() => {
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

      <FlatList
        data={items}
        renderItem={({ item }) => <OrderItemRoow item={item} />}
        keyExtractor={(item, index) => index.toString()}
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
});
