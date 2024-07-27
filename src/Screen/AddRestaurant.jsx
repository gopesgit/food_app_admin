import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, TextInput, View, Image, Pressable, ToastAndroid, Platform } from 'react-native';
import React, { useContext, useState } from 'react';
import { globalStyle } from '../common/style';
import { Button, Icon } from '@rneui/base';
import { checkFormData, insertData, pickImage } from '../common/someCommonFunction';
import { API_RESTAURANT } from '../common/apiURL';
import { OperationContext } from '../context/operationContext';
import { AuthContext } from '../context/authContex';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
const AddRestaurant = ({ setModalVisible }) => {
  const { allFunction } = useContext(OperationContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [email, setEmail] = useState(user.email);
  const [licenses, setLicenses] = useState('');
  const [branch, setBranch] = useState('');
  const [licensesUrl, setLicensesUrl] = useState('To be added');
  const navigation = useNavigation();
  const handleSubmit = async () => {
    const data = { 
      name, 
      street_address: streetAddress,
      city,
      state,
      postal_code: postalCode,
      country,
      description, 
      latitude, 
      longitude, 
      email, 
      licenses, 
      branch, 
      licenses_url: licensesUrl
    };
    const requiredFields = ['name', 'street_address', 'city', 'state', 'postal_code', 'country', 'description', 'latitude', 'longitude', 'email', 'licenses', 'branch', 'licenses_url'];


    if (!checkFormData(data, requiredFields) || !image || !logo) {
      ToastAndroid.showWithGravity('Missing or empty field', ToastAndroid.LONG, ToastAndroid.TOP);
      return;
    }

    let formdata = new FormData();
    // formdata.append('image', {
    //   uri: image,
    //   type: 'image/jpeg',
    //   name: 'photo.jpg'
    // });
    // formdata.append('logo', {
    //   uri: logo,
    //   type: 'image/jpeg',
    //   name: 'logo.jpg'
    // });
    formdata.append('user_id', user.email);
    Object.keys(data).forEach(key => {
      formdata.append(key, data[key]);
    });
   formdata.append("closed",false);
   formdata.append("active",true);//this will change
   formdata.append("available_for_delivery",true);
    console.log("available_for_delivery",formdata);
    // try {
    //   setLoading(true);
    //   //await insertData(formdata, API_RESTAURANT);
    //   // setName('');
    //   // setStreetAddress('');
    //   // setCity('');
    //   // setState('');
    //   // setPostalCode('');
    //   // setCountry('');
    //   // setDescription('');
    //   // setBranch('');
    //   // setEmail('');
    //   // setLatitude('');
    //   // setLicenses('');
    //   // setLongitude('');
    //   // setImage(null);
    //   // setLogo(null);
    //   // setLicensesUrl('');
    //   // allFunction();
    //   // navigation.navigate("HomeScreen")
     
    //   ToastAndroid.showWithGravity('Data submitted successfully', ToastAndroid.LONG, ToastAndroid.TOP);
    // } catch (error) {
    //   ToastAndroid.showWithGravity('Error submitting data', ToastAndroid.LONG, ToastAndroid.TOP);
    //   setLoading(false);
    // }
  };
  //complte work
  const fetchCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Location Permission', 'Permission to access location was denied.');
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      const location = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      setLatitude(coords.latitude)
      setLongitude(coords.longitude)
      const addressParts = location[0].formattedAddress.split(',').map(part => part.trim());
      const addressWithoutCode = addressParts.slice(1).join(', ');
      setStreetAddress(addressWithoutCode);
      setPostalCode(location[0].postalCode);
      setCountry(location[0].country);
      setCity(location[0].city)
      setState(location[0].region)
      //console.log(location);
    } catch (error) {
      console.error('Error fetching location:', error);
      Alert.alert('Location Error', 'Failed to fetch current location.');
    }
  };
  console.log(latitude);
  console.log(longitude)
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.avoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <View style={styles.imageContainer}>
              <Pressable onPress={() => pickImage(setImage)} style={styles.imagePressable}>
                {!image && <Icon name="file-image-plus" size={180} color="#ddd" type="material-community" />}
                {image && <Image source={{ uri: image }} style={styles.image} />}
              </Pressable>
              <Pressable onPress={() => pickImage(setLogo)} style={styles.logoPressable}>
                {!logo && <Icon name="image-outline" size={40} color="#fff" type="material-community" />}
                {logo && <Image source={{ uri: logo }} style={styles.logo} />}
              </Pressable>
            </View>
            <TextInput
              placeholder='Enter name of Restaurant'
              value={name}
              onChangeText={setName}
              style={styles.inputBox}
            />
            <TextInput
              placeholder='Street Address of Restaurant'
              value={streetAddress}
              onChangeText={setStreetAddress}
              style={styles.inputBox}
              multiline
            />
            <TextInput
              placeholder='City'
              value={city}
              onChangeText={setCity}
              style={styles.inputBox}
            />
            <TextInput
              placeholder='State'
              value={state}
              onChangeText={setState}
              style={styles.inputBox}
            />
            <TextInput
              placeholder='Postal Code'
              value={postalCode}
              onChangeText={setPostalCode}
              style={styles.inputBox}
            />
            <TextInput
              placeholder='Country'
              value={country}
              onChangeText={setCountry}
              style={styles.inputBox}
            />
            <TextInput
              placeholder='Description of Restaurant'
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={styles.inputBoxArea}
            />
            <TextInput
              placeholder='Enter email address of Restaurant'
              value={email}
              onChangeText={setEmail}
              style={styles.inputBox}
            />
            <TextInput
              placeholder='Enter Pin code'
              value={postalCode}
              onChangeText={setPostalCode}
              style={styles.inputBox}
            />
            <TextInput
              placeholder='Licenses'
              value={licenses}
              onChangeText={setLicenses}
              style={styles.inputBox}
            />
            <TextInput
              placeholder='Branch'
              value={branch}
              onChangeText={setBranch}
              style={styles.inputBox}
            />
            <TextInput
              placeholder='Licenses URL'
              value={licensesUrl}
              onChangeText={setLicensesUrl}
              style={styles.inputBox}
            />
            <Button
              title={loading ? "Getting Location..." : "Get Location"}
              onPress={fetchCurrentLocation}
              radius='lg'
              containerStyle={styles.buttonContainer}
              loading={loading}
              disabled={loading}
              buttonStyle={styles.button}
            />
            <Button
              title={loading ? "Submitting..." : "Add Restaurant"}
              onPress={handleSubmit}
              radius='lg'
              containerStyle={styles.buttonContainer}
              loading={loading}
              disabled={loading}
              buttonStyle={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style='auto' />
    </View>
  );
};

export default AddRestaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 16,
  },
  avoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  formContainer: {
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePressable: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 12,
  },
  logoPressable: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  inputBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  inputBoxArea: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#ff5722',
    borderRadius: 8,
  },
});
