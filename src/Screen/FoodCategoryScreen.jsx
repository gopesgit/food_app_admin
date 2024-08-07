import React, { useContext, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getData, updateData } from '../common/someCommonFunction';
import { API_FOOD_CATEGORIE_LIST } from '../common/apiURL';
import { AuthContext } from '../context/authContex';

const FoodCategoryScreen = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { rest_id } = "all";
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchCategories();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchCategories();
        setRefreshing(false);
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await getData(API_FOOD_CATEGORIE_LIST + rest_id);
            setCategories(data);
        } catch (error) {
            console.error('Error fetching food categories:', error);
        }
    };

    const handleEditButtonClick = (category) => {
        // Navigate to edit screen with the category details
        navigation.navigate("EditCategoryScreen", { category });
        onRefresh();
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Category Name:</Text>
                            <Text style={styles.value}>{item.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Description:</Text>
                            <Text style={styles.value}>{item.description || 'N/A'}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Status:</Text>
                            <Text style={styles.value}>{item.active ? 'Active' : 'Inactive'}</Text>
                        </View>
                        {user.type === 'admin' && (
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => handleEditButtonClick(item)}
                            >
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text style={styles.emptyText}>No categories available.</Text>}
            />
            {user.type === 'admin' && (
                <Button
                    title="Add New Category"
                    buttonStyle={styles.button}
                    containerStyle={styles.buttonContainer}
                    onPress={() => navigation.navigate("AddFoodCatagorie")}
                />
            )}
        </View>
    );
};

export default FoodCategoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 10,
    },
    listContainer: {
        paddingBottom: 80, // Extra space for the button at the bottom
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
    },
    value: {
        fontSize: 14,
        color: '#333',
        textAlign: 'right',
    },
    editButton: {
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#007bff', // Blue for edit
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    buttonContainer: {
        margin: 15,
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});
