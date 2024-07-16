import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, TextInput, View, Image, Text, Pressable, Alert, ToastAndroid, SafeAreaView } from 'react-native'
import React, { useContext, useState } from 'react'
import { globalStyle } from '../common/style'
import { Button, Input, Icon, ListItem, Header } from '@rneui/base'
import { checkFormData, insertData, pickImage } from '../common/someCommonFunction'
import { API_FOOD } from '../common/apiURL'
import { OperationContext } from '../context/operationContext'
import { Dropdown } from 'react-native-element-dropdown'
const EditFoodItem = ({item}) => {
  console.log(item);
  const { foodcategorie,allFunction } = useContext(OperationContext);
  // console.log("RES=>",restaurant);
  // console.log("FoodCAT=>",foodcategorie);
  const [loading,setLoading]=useState(false);
  const [image, setImage] = useState(item.food_image_url);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(String(item.price || ''));
  const [description, setDescription] = useState(item.description);
  const [ingredients, setIngredients] = useState(item.ingredients);
  const [package_items_count, setPackageItemsCount] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("");
  const [featured, setFeatured] = useState("");
  const [deliverable, setDeliverable] = useState("");
  const [restaurant_id, setRestaurant] = useState(item.restaurant_id);
  const [category_id, setFoodCategorie] = useState("");
  const [discount_price, setDiscountPrice] = useState("");
  //console.log(price);
  const handelSubmit = async () => {
    let data = { name, price, description, ingredients, package_items_count, weight, unit, featured, deliverable, restaurant_id, category_id, discount_price }
    const requiredFields = ['name', 'price', 'description', 'restaurant_id', 'category_id'];
    if (!checkFormData(data, requiredFields) || !image) {
      ToastAndroid.showWithGravity(`Missing or empty field`, ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    let formdata = new FormData()
    formdata.append('image', {
      uri: image,
      type: 'image/jpeg',  // Adjust according to your file type
      name: 'photo.jpg'    // Adjust file name as needed
    });
    Object.keys(data).forEach(key => {
      formdata.append(key, data[key]);
    });
    //console.log(formdata);
    try {
      setLoading(true)
      await insertData(formdata, API_FOOD)
      setImage(null)
      setLoading(false)
      allFunction()
      setAddFoodModal(false)
      ToastAndroid.showWithGravity(`Data submit`, ToastAndroid.LONG, ToastAndroid.TOP)
    } catch (error) {
      ToastAndroid.showWithGravity(`Error`, ToastAndroid.LONG, ToastAndroid.TOP)
    }
   
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={{ marginHorizontal: 12 }}>
            <View style={globalStyle.inputBoxImage}>
              <View style={{ position: 'relative' }}>
                <Pressable onPress={() => pickImage(setImage)}>
                  {!image &&
                    <Icon
                      name="file-image-plus"
                      size={150}
                      color={"#ddd"}
                      type="material-community"
                    />
                  }
                  {image && <Image source={{ uri: image }} style={styles.image} />}
                </Pressable>

              </View>
            </View>

            <TextInput
              placeholder='Enter name of Food'
              value={name}
              onChangeText={(text) => setName(text)}
              style={globalStyle.inputBox}
            />

            <TextInput
              placeholder='Price Of Food'
              value={price}
              onChangeText={(text) => setPrice(text)}
              style={globalStyle.inputBox}
              keyboardType='number-pad'
            />
            <TextInput
              placeholder='Discount of Food Price'
              value={discount_price}
              onChangeText={(text) => setDiscountPrice(text)}
              style={globalStyle.inputBox}
              keyboardType='number-pad'
            />

            <TextInput
              placeholder='description  of food item'
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
              numberOfLines={4}
              style={globalStyle.inputBoxArea}
            />
            <TextInput
              placeholder='Ingredients of food '
              value={ingredients}
              onChangeText={(text) => setIngredients(text)}
              multiline
              numberOfLines={4}
              style={globalStyle.inputBoxArea}
            />
            <TextInput
              placeholder='package_items_count'
              value={package_items_count}
              onChangeText={(text) => setPackageItemsCount(text)}
              style={globalStyle.inputBox}

            />
            <TextInput
              placeholder='weight'
              value={weight}
              onChangeText={(text) => setWeight(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='unit'
              value={unit}
              onChangeText={(text) => setUnit(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='featured'
              value={featured}
              onChangeText={(text) => setFeatured(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='deliverable'
              value={deliverable}
              onChangeText={(text) => setDeliverable(text)}
              style={[globalStyle.inputBox]}
            />
       
          {foodcategorie &&
              <View >
                <Dropdown
                  style={styles.dropdown}
                  data={foodcategorie}
                  labelField="name"
                  // valueField="value"
                  placeholder="Select Transaction Type"
                  onChange={(item) => {
                    console.log("=>", item.id)
                    setFoodCategorie(item.id)
                    //setTrantype(item.value)
                  }}
                />
              </View>
            }
             {loading?
             <Button title="outline" type="solid" loading size='lg' />
             :
            <Button title="Add Food " onPress={handelSubmit} />
             }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style='auto' />
    </SafeAreaView>
  
  )
}

export default EditFoodItem

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,

  },
  dropdown: {
    height: 40,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginVertical: 5,
    paddingLeft: 10,
    color: "#af9f85",
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
},
})