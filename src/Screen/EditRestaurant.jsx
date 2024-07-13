import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, TextInput, View, Image, Text, Pressable, Alert, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import { globalStyle } from '../common/style'
import { Button, Input, Icon, ListItem } from '@rneui/base'
import { checkFormData, insertData, isValidImageURI, pickImage } from '../common/someCommonFunction';
import { API_RESTAURANT } from '../common/apiURL';
import { OperationContext } from '../context/operationContext';
import { AuthContext } from '../context/authContex';
import Header from '../componet/Header';
const EditRestaurant = ({ setModalVisible }) => {
  const { restaurant } = useContext(OperationContext);
  const { user } = useContext(AuthContext);
  const showAddRestaurant = !restaurant || restaurant.length === 0;
  
  console.log("Rest", restaurant);
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
  const handelSubmit = async () => {
    let data = { name, address, description, latitude, longitude, pincode, email, licenses, branch }
    const requiredFields = ['name', 'address', 'description', 'latitude', 'longitude', 'pincode', 'email', 'licenses', 'branch'];
    if (!checkFormData(data, requiredFields) || !image || !logo) {
      ToastAndroid.showWithGravity(`Missing or empty field`, ToastAndroid.LONG, ToastAndroid.TOP)
      return
    }
    //console.log(image);
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
    formdata.append('user_id', user.email)
    Object.keys(data).forEach(key => {
      formdata.append(key, data[key]);
    });

    try {
      await insertData(formdata, API_RESTAURANT)
      setName('')
      setAddress('')
      setDescription('')
      setBranch('')
      setEmail('')
      setLatitude('')
      setLicenses('')
      setPincode('')
      setLongitude('')
      setImage(null)
      setLogo(null)
      ToastAndroid.showWithGravity(`Data submit`, ToastAndroid.LONG, ToastAndroid.TOP)
    } catch (error) {
      ToastAndroid.showWithGravity(`Error`, ToastAndroid.LONG, ToastAndroid.TOP)
    }

  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>

      <KeyboardAvoidingView>
        <ScrollView stickyHeaderIndices={[0]}>
          <View style={{alignItems:'flex-end',marginHorizontal:12}}>
            <Header />
          </View>

          <View style={{ marginHorizontal: 12 }}>
            {!showAddRestaurant &&
              <>
                <Button title="Close " onPress={() => setModalVisible(false)} radius={'lg'} containerStyle={{ marginVertical: 8 }} />

              </>}
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
                <View style={{ position: 'absolute', top: '30%', left: '43%', backgroundColor: "#000", padding: 2, borderRadius: 40 }}>
                  <Pressable onPress={() => pickImage(setLogo)}>
                    {!logo &&
                      <Icon
                        name="image-outline"
                        size={50}
                        color={"#fff"}
                        type="material-community"

                      />
                    }
                    {logo && <Image source={{ uri: logo }} style={{ width: 50, height: 50, borderRadius: 30 }} />}
                  </Pressable>
                </View>
              </View>
            </View>
            <TextInput
              placeholder='Enter name of Restaurant'
              value={name}
              onChangeText={(text) => setName(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='Address of Restaurant'
              value={address}
              onChangeText={(text) => setAddress(text)}
              multiline
              numberOfLines={4}
              style={globalStyle.inputBoxArea}
            />
            <TextInput
              placeholder='Description of Restaurant'
              value={description}
              onChangeText={(text) => setDescription(text)}
              multiline
              numberOfLines={4}
              style={globalStyle.inputBoxArea}
            />
            <TextInput
              placeholder='Enter email address of Restaurant'
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={globalStyle.inputBox}

            />
            <TextInput
              placeholder='Enter Pin code'
              value={pincode}
              onChangeText={(text) => setPincode(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='location latitude'
              value={latitude}
              onChangeText={(text) => setLatitude(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='location longitude'
              value={longitude}
              onChangeText={(text) => setLongitude(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='licenses'
              value={licenses}
              onChangeText={(text) => setLicenses(text)}
              style={globalStyle.inputBox}
            />
            <TextInput
              placeholder='branch'
              value={branch}
              onChangeText={(text) => setBranch(text)}
              style={globalStyle.inputBox}
            />
            <Button title="Add Restaurant " onPress={handelSubmit} radius={'lg'} containerStyle={{ marginVertical: 8 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style='auto' />
    </View>
  )
}

export default EditRestaurant

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,

  },
})