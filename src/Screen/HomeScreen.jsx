import React, { useCallback, useContext, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text, FlatList, RefreshControl } from 'react-native';
import { OperationContext } from '../context/operationContext';
import RestaurantRow from '../componet/RestaurantRow';
import { Icon } from '@rneui/base';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const { restaurant,getRestaurantList } = useContext(OperationContext);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurant);

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

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredRestaurants(restaurant);
    } else {
      const filteredData = restaurant.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.branch.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRestaurants(filteredData);
    }
  }, [searchQuery, restaurant]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" type="material" size={24} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Restaurant name, Description, Branch"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <TouchableOpacity style={[styles.editButton,{justifyContent:'center'}]} onPress={() => navigation.navigate('Add-Restaurant')}>
     
     <Text style={[styles.actionButtonText,{alignSelf:'center'}]}>Add New</Text>
   </TouchableOpacity>
      <FlatList
        data={filteredRestaurants}
        renderItem={({ item }) => <RestaurantRow item={item} onRefresh={onRefresh} />}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 10, // Rounded corners for a modern look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF', // Primary color
    borderRadius:12 , // Larger radius for pill shape
    paddingVertical: 12, // Adjusted for better visual appeal
    paddingHorizontal: 20, // Increased horizontal padding
    marginHorizontal: 15, // Added margin for better spacing
    marginBottom: 15, // Increased bottom margin for better separation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButtonText: {
    color: '#fff', // Text color
    fontSize: 18, // Larger font size for better readability
    fontWeight: 'bold', // Bold text for emphasis
    marginLeft: 10, // Space between icon and text
  },
});
