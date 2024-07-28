import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { API_FOOD } from '../common/apiURL';
import { updateData } from '../common/someCommonFunction';

const FoodItemRow = ({ item, onRefresh }) => {
  const navigation = useNavigation();

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append('_method', 'put');
    formData.append('active', 0);

    try {
      await updateData(formData, `${API_FOOD}/${id}`, "Food Item Update");
      onRefresh();
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  const handleDeliverable = async (id) => {
    const formData = new FormData();
    formData.append('_method', 'put');
    formData.append('deliverable', item.deliverable ? 0 : 1);

    try {
      await updateData(formData, `${API_FOOD}/${id}`, "Food Item Update");
      onRefresh();
    } catch (error) {
      console.error("Error updating deliverable status:", error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: item.food_image_url }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>Rs. {item.price}</Text>
          {item.menuLink ? (
            <TouchableOpacity>
              <Text style={styles.menuLink}>{item.menuLink}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <Icon name="dots-vertical" type="material-community" size={24} color="#333" />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('Edit-Food', { item })}
        >
          <Icon name="edit" color="#fff" size={16} />
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Icon name="delete" color="#fff" size={16} />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, { backgroundColor: item.deliverable ? "#28a745" : "#6c757d" }]}
          onPress={() => handleDeliverable(item.id)}
        >
          <Icon name="check-circle" color="#fff" size={16} />
          <Text style={styles.buttonText}>
            {item.deliverable ? "Online" : "Offline"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,  // Reduced padding
    marginHorizontal: 10, // Reduced margin
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 40, // Reduced width
    height: 40, // Reduced height
    borderRadius: 20, // Reduced borderRadius
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14, // Reduced fontSize
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 12, // Reduced fontSize
    color: '#666',
  },
  menuLink: {
    fontSize: 12, // Reduced fontSize
    color: '#007AFF',
    marginTop: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingHorizontal: 10, // Reduced padding
    paddingVertical: 5, // Reduced padding
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    paddingHorizontal: 10, // Reduced padding
    paddingVertical: 5, // Reduced padding
    alignItems: 'center',
  },
  toggleButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingHorizontal: 10, // Reduced padding
    paddingVertical: 5, // Reduced padding
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14, // Reduced fontSize
    marginLeft: 5,
  },
});

export default FoodItemRow;
