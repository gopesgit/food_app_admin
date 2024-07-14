import { Modal, ScrollView, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { OperationContext } from '../context/operationContext'
import AddRestaurant from './AddRestaurant';
import RestaurantRow from '../componet/RestaurantRow';
import { Button, Icon, Text } from '@rneui/base';
import { tw } from 'react-native-tailwindcss';

const HomeScreen = ({ navigation }) => {
    const { restaurant } = useContext(OperationContext);
    const showAddRestaurant = !restaurant || restaurant.length === 0;
    const [modalvisible, setModalVisible] = useState(false);
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <View>
                <ScrollView
                    horizontal={true}
                    contentContainerStyle={styles.scrollViewContent}
                    showsHorizontalScrollIndicator={false}
                >
                    {!showAddRestaurant && (
                        restaurant.map((item, index) => (
                            <View key={index}>
                                <RestaurantRow item={item} />
                            </View>
                        ))
                    )}
                    <View style={{ backgroundColor: "#fff", height: 120, width: 120, marginVertical: 4, marginRight: 12, alignItems: 'center', justifyContent: 'center', }}>
                        <Icon
                            name="add"
                            size={90}
                            color="#999"
                            onPress={() => setModalVisible(!modalvisible)}
                        />
                        <Text>Add New</Text>
                    </View>
                </ScrollView>
            </View>
            <View>
              {
                 restaurant.map((item, index) => (
                   console.log(item.foods)
                ))
              }  
            </View>
            <Modal
                visible={modalvisible}
                onRequestClose={() => {
                    setModalVisible(!modalvisible);
                }}
            >
                <AddRestaurant setModalVisible={setModalVisible} />
            </Modal>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 8,
        justifyContent: 'center',
    },
    scrollViewContent: {
        alignItems: 'center',
        gap: 8
    },
})