import { Image, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { tw } from 'react-native-tailwindcss';
import { Button, Icon } from '@rneui/base';
import EditRestaurant from '../Screen/EditRestaurant';
import AddFoodItem from '../Screen/AddFoodItem';
import { globalStyle } from '../common/style';
const RestaurantRow = ({ item }) => {
    const [editResModalVisible, setEditResModalVisible] = useState(false);
    const [addfoodmodal, setAddFoodModal] = useState(false);
    return (
        <View style={[tw.shadow, globalStyle.adminCard]}>

            <View>
                <Image
                    style={{ height: 120, width: 120, borderRadius: 20 }}
                    source={{ uri: item.logo_url }}
                />
                <View style={{ marginBottom: 4, position: 'absolute', marginTop: 20, marginLeft: 28 }}>
                    <Button radius={"sm"} size='sm' containerStyle={{ backgroundColor: "#fff" }}
                        onPress={() => setEditResModalVisible(!editResModalVisible)}>
                        <Icon name="edit" color="#fff" size={20} />
                        Edit
                    </Button>
                </View>
                <View style={{ marginBottom: 4, position: 'absolute', marginTop: 70, marginLeft: 9 }}>
                    <Button radius={"sm"} size='sm' containerStyle={{ backgroundColor: "#fff" }}
                        onPress={() => setAddFoodModal(!addfoodmodal)}
                    >
                        <Icon name="add" color="#fff" size={20} />
                        Add Food
                    </Button>
                </View>
            </View>

            <Modal
                visible={editResModalVisible}
                onRequestClose={() => {
                    setEditResModalVisible(!editResModalVisible);
                }}
            >
                <EditRestaurant item={item} />
            </Modal>
            <Modal
                visible={addfoodmodal}
                onRequestClose={() => {
                    setAddFoodModal(!addfoodmodal);
                }}
            >
                <AddFoodItem rest_id={item.id} setAddFoodModal={setAddFoodModal}/>
            </Modal>
        </View>

    )
}

export default RestaurantRow

const styles = StyleSheet.create({})