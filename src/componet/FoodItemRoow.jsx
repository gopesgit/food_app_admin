import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { tw } from 'react-native-tailwindcss';
import { globalStyle } from '../common/style';
import { Button, Icon, Image } from '@rneui/base';

const FoodItemRoow = ({ item }) => {
    //console.log("item=>", item);
    const renderItem = ({ item }) => (
        <Item item={item} />
    );
    //   const numColumns = item.length < 3 && item.length > 0 ? item.length: 3;
    //   console.log(numColumns);
    return (
        <SafeAreaView>
             <FlatList
                data={item}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={3}
                contentContainerStyle={{backgroundColor:"#fef"}}
            />
        </SafeAreaView>
    )
}
export default FoodItemRoow
const Item = ({ item }) => {
    return (
        <View style={[tw.shadow,globalStyle.adminCard]}>
            <View>                
                <Image
                    style={{ height: 105, width: 105, borderRadius: 20 }}
                    source={{ uri: item.food_image_url}}
                />
                 <View style={{ marginBottom: 4, position: 'absolute', marginTop: 20, marginLeft: 28 }}>                    
                    <Button radius={"sm"} size='sm' containerStyle={{ backgroundColor: "#fff" }}
                        onPress={() => console.log("ok")}>
                        <Icon name="edit" color="#fff" size={20} />
                        Edit
                    </Button>
                </View>
                <View style={{ marginBottom: 4, position: 'absolute', marginTop:60, marginLeft: 18 }}>                    
                    <Button radius={"sm"} size='sm' containerStyle={{ backgroundColor: "#fff" }}
                        onPress={() => console.log("ok")}>
                        <Icon name="delete" color="#fff" size={20} />
                        Delete
                    </Button>
                </View>
            </View>    
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
        </View>
    );
}
const styles = StyleSheet.create({})