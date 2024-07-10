import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, TextInput, View, Image, Text, Pressable, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { globalStyle } from '../common/style'
import { Button, Input, Icon, ListItem, Header } from '@rneui/base'
import { insertData, pickImage } from '../common/someCommonFunction'
import { API_FOOD } from '../common/apiURL'
const AddFoodItem = () => {
  const [image, setImage] = useState(null);  
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [package_items_count, setPackageItemsCount] = useState(null);
  const [weight, setWeight] = useState(null);
  const [unit, setUnit] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [deliverable, setDeliverable] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [food_categorie, setFoodCategorie] = useState(null);
  const handelSubmit = async () => {
    let data = { name,price,description,ingredients,package_items_count,weight,unit,featured,deliverable,restaurant,food_categorie}
    let formdata = new FormData()
    formdata.append('image', {
      uri: image,
      type: 'image/jpeg',  // Adjust according to your file type
      name: 'photo.jpg'    // Adjust file name as needed
    });
    Object.keys(data).forEach(key => {
      formdata.append(key, data[key]);
    });
    await insertData(formdata,API_FOOD)
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={{ marginHorizontal: 12 }}>
            <View style={globalStyle.inputBoxImage}>
              <View style={{ position: 'relative' }}>
                <Pressable onPress={() => pickImage(setImage)}>
                  {!image &&
                    <Icon
                      name="file-image-plus"
                      size={200}
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
              placeholder='description  of food item'
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
              numberOfLines={4}
              style={globalStyle.inputBoxArea}
            />
            <TextInput
              placeholder='ingredients of food '
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
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='restaurant name'
              value={restaurant}
              onChangeText={(text) => setRestaurant(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='food categorie'
              value={food_categorie}
              onChangeText={(text) => setFoodCategorie(text)}
              style={globalStyle.inputBox}
            />
            <Button title="Add Food " onPress={handelSubmit} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style='auto' />
    </View>
  )
}

export default AddFoodItem

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,

  },
})