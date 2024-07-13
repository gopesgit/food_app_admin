import { Alert, Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { OperationContext } from '../context/operationContext'
import AddRestaurant from './AddRestaurant';
import RestaurantRow from '../componet/RestaurantRow';
import { Button } from '@rneui/base';
import EditRestaurant from './EditRestaurant';
const HomeScreen = ({ navigation }) => {
    const { restaurant } = useContext(OperationContext);
    const showAddRestaurant = !restaurant || restaurant.length === 0;
    const [modalvisible, setModalVisible] = useState();
    const [editRestaurant,setEditRestaurant]=useState(null);
    const [editResModalVisible,setEditResModalVisible]=useState(false);
    useEffect(() => {
        !showAddRestaurant ? setModalVisible(false) : setModalVisible(true)
    }, [restaurant])
    const openEditModal=(item)=>{
        setEditRestaurant(item)
        setEditResModalVisible(true)
    }
    return (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
            {/* {showAddRestaurant && setModalVisible(true)} */}
            <Button title="Add Restaurant" size='lg' onPress={() => setModalVisible(!modalvisible)} />
            {!showAddRestaurant && (
                <ScrollView>
                    {restaurant.map((item, index) => (
                        <Pressable key={index} onPress={() => openEditModal(item)}>
                            <RestaurantRow item={item} />
                        </Pressable>
                    ))}

                </ScrollView>
            )}
            <Modal
                visible={modalvisible}
                onRequestClose={() => {
                    !showAddRestaurant && setModalVisible(!modalvisible);
                }}
            >
                <AddRestaurant setModalVisible={setModalVisible} />
            </Modal>
            <Modal
                visible={editResModalVisible}
                onRequestClose={() => {
                    setEditResModalVisible(!editResModalVisible);
                }}
            >
                <EditRestaurant setModalVisible={setEditResModalVisible} item={editRestaurant} />
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
})