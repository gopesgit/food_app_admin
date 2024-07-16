import { FlatList, Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { tw } from 'react-native-tailwindcss';
import { globalStyle } from '../common/style';
import { Button, Icon, Image } from '@rneui/base';
import { deleteData } from '../common/someCommonFunction';
import { API_FOOD } from '../common/apiURL';
import { useContext, useState } from 'react';
import { OperationContext } from '../context/operationContext';
import EditFoodItem from '../Screen/EditFoodItem';

const FoodItemRoow = ({ item }) => {
    console.log("item=>", item.foods);
    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    //   const numColumns = item.length < 3 && item.length > 0 ? item.length: 3;
    //   console.log(numColumns);
    return (
        <View style={{paddingVertical:6}}>
            <Text>{item.name}</Text>
            <FlatList
                data={item.foods}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={3}
                contentContainerStyle={{ backgroundColor: "#ddd" }}
            />
        </View>
    )
}
export default FoodItemRoow
const Item = ({ item }) => {
    const { allFunction } = useContext(OperationContext);
    const [editModal,seteditModal]=useState(false)
    const handelDelete = async (id) => {
        await deleteData(id, API_FOOD)
        allFunction()
    }
    return (
        <View style={[tw.shadow, globalStyle.adminCard]}>
            <View>
                <Image
                    style={{ height: 105, width: 105, borderRadius: 20 }}
                    source={{ uri: item.food_image_url }}
                />
                <View style={{ marginBottom: 4, position: 'absolute', marginTop: 20, marginLeft: 28 }}>
                    <Button radius={"sm"} size='sm' containerStyle={{ backgroundColor: "#fff" }}
                        onPress={() =>seteditModal(!editModal)}>
                        <Icon name="edit" color="#fff" size={20} />
                        Edit
                    </Button>
                </View>
                <View style={{ marginBottom: 4, position: 'absolute', marginTop: 60, marginLeft: 18 }}>
                    <Button radius={"sm"} size='sm' containerStyle={{ backgroundColor: "#fff" }}
                        onPress={() => handelDelete(item.id)}>
                        <Icon name="delete" color="#fff" size={20} />
                        Delete
                    </Button>
                </View>
            </View>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
            
            <Modal
                visible={editModal}
                onRequestClose={() => {
                    seteditModal(!editModal)
                }}
            >
                <EditFoodItem item={item} />
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({})