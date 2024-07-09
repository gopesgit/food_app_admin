import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, TextInput, View, Image, Text, Pressable, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import { globalStyle } from '../common/style'
import { Button, Input, Icon, ListItem, Header } from '@rneui/base'
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
const AddFoodItem = () => {
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState(null);
  const [address, setAddress] = useState(null);
  const [description, setDescription] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [pincode, setPincode] = useState(null);
  const [email, setEmail] = useState(null);
  const [licenses, setLicenses] = useState(null);
  const [branch, setBranch] = useState(null);
  const pickImage = async (data) => {   
    //console.log(data);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      data(result.assets[0].uri);
    }
  };
  const handelSubmit = async () => {
    let data = { name, address, description, latitude, longitude, pincode, email, licenses, branch }
    let formdata = new FormData()
    formdata.append('image', {
      uri: image,
      type: 'image/jpeg',  // Adjust according to your file type
      name: 'photo.jpg'    // Adjust file name as needed
    });

    formdata.append('logo', {
      uri: logo,
      type: 'image/jpeg',  // Adjust according to your file type
      name: 'logo.jpg'     // Adjust file name as needed
    });
    Object.keys(data).forEach(key => {
      formdata.append(key, data[key]);
    });
    console.log(formdata);
    try {
      let response = await axios.post(
        'http://shop.mondalsoft.com/api/restaurant',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Upload successful! ', response.data);
    } catch (error) {
      console.error('Upload failed! ', error);
    }

    // let response = await axios.post('http://shop.mondalsoft.com/api/restaurant', formdata, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });

    // console.log('Upload successful! ', response.data);
    //console.log({name,address,description,latitude,longitude,pincode,email,licenses,branch,image,logo});
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={{ marginHorizontal: 12 }}>
            <View style={globalStyle.inputBoxImage}>
              <View style={{ position: 'relative'}}>
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
              value={name}
              onChangeText={(text) => setName(text)}
              style={globalStyle.inputBox}
            />

            <TextInput
              placeholder='description  of food item'
              value={address}
              onChangeText={(text) => setAddress(text)}
              multiline
              numberOfLines={4}
              style={globalStyle.inputBoxArea}
            />
            <TextInput
              placeholder='ingredients of food '
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
              numberOfLines={4}
              style={globalStyle.inputBoxArea}
            />
            <TextInput
              placeholder='package_items_count'
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={globalStyle.inputBox}

            />
            <TextInput
              placeholder='weight'
              value={pincode}
              onChangeText={(text) => setPincode(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='unit'
              value={latitude}
              onChangeText={(text) => setLatitude(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='featured'
              value={longitude}
              onChangeText={(text) => setLongitude(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='deliverable'
              value={licenses}
              onChangeText={(text) => setLicenses(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='restaurant name'
              value={branch}
              onChangeText={(text) => setBranch(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='food categorie'
              value={branch}
              onChangeText={(text) => setBranch(text)}
              style={globalStyle.inputBox}
            />
            <Button title="Add Restaurant " onPress={handelSubmit} />
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
    width:'100%',
    height: 200,
    borderRadius:12,
   
  },
})