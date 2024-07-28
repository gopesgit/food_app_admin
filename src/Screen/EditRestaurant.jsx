import { KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, TextInput, View, Image, Pressable, ToastAndroid, Platform, Alert } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { Button, Icon } from '@rneui/base';
import { checkFormData, insertData, pickImage, updateData } from '../common/someCommonFunction';
import { API_RESTAURANT } from '../common/apiURL';
import { OperationContext } from '../context/operationContext';
import { AuthContext } from '../context/authContex';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const EditRestaurant = ({ route, setModalVisible }) => {
  const { allFunction } = useContext(OperationContext);
  const { user } = useContext(AuthContext);
  const { item } = route.params;
  let restaurant=item;
  //console.log(restaurant);
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
  const [licensesUrl, setLicensesUrl] = useState('');
  const [branchOptions] = useState([
    { label: 'Main Branch', value: 'main' },
    { label: 'Secondary Branch-1', value: 'secondary-1' },
    { label: 'Secondary Branch-2', value: 'secondary-2' },
    { label: 'Secondary Branch-3', value: 'secondary-3' },
    { label: 'Other Branch', value: 'other' },
  ]);
  const navigation = useNavigation();
  
  // Extract restaurant data from route params
  //const { restaurantId } = route.params; // Ensure `restaurantId` is being passed correctly

  useEffect(() => {
    // Fetch the restaurant details on component mount
    const fetchRestaurantDetails = async () => {
      try {
        // Replace with actual API call to fetch restaurant details
        
        setName(restaurant.name);
        setStreetAddress(restaurant.street_address);
        setCity(restaurant.city);
        setState(restaurant.state);
        setPostalCode(restaurant.postal_code);
        setCountry(restaurant.country);
        setDescription(restaurant.description);
        setLatitude(restaurant.latitude.toString());
        setLongitude(restaurant.longitude.toString());
        setEmail(restaurant.email);
        setLicenses(restaurant.licenses);
        setBranch(restaurant.branch);
        setLicensesUrl(restaurant.licenses_url);
        // Set image and logo URIs if available
        setImage(restaurant.image_url);
        setLogo(restaurant.logo_url);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };
fetchRestaurantDetails();
   
  }, []);

  const handleSubmit = async () => {
    const message = 'Restaurant update successful!';
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
    formdata.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg'
    });
    formdata.append('logo', {
      uri: logo,
      type: 'image/jpeg',
      name: 'logo.jpg'
    });
    Object.keys(data).forEach(key => {
      formdata.append(key, data[key]);
    });
    formdata.append("closed", 1);
    formdata.append("active", 1);
    formdata.append("available_for_delivery", 1);
    formdata.append('_method', 'put');

    try {
      setLoading(true);
      await updateData(formdata, `${API_RESTAURANT}/${restaurant.id}`, message);
      setName('');
      setStreetAddress('');
      setCity('');
      setState('');
      setPostalCode('');
      setCountry('');
      setDescription('');
      setBranch('');
      setEmail('');
      setLatitude('');
      setLicenses('');
      setLongitude('');
      setImage(null);
      setLogo(null);
      setLicensesUrl('');
      allFunction();
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
      ToastAndroid.showWithGravity('Error submitting data', ToastAndroid.LONG, ToastAndroid.TOP);
    } finally {
      setLoading(false);
    }
  };

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
      setLatitude(coords.latitude.toString());
      setLongitude(coords.longitude.toString());
      const addressParts = location[0].formattedAddress.split(',').map(part => part.trim());
      const addressWithoutCode = addressParts.slice(1).join(', ');
      setStreetAddress(addressWithoutCode);
      setPostalCode(location[0].postalCode);
      setCountry(location[0].country);
      setCity(location[0].city);
      setState(location[0].region);
    } catch (error) {
      console.error('Error fetching location:', error);
      Alert.alert('Location Error', 'Failed to fetch current location.');
    }
  };

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
              placeholder='Licenses'
              value={licenses}
              onChangeText={setLicenses}
              style={styles.inputBox}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={branch}
                onValueChange={(itemValue) => setBranch(itemValue)}
                style={styles.picker}
              >
                {branchOptions.map((option, index) => (
                  <Picker.Item key={index} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
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
              title={loading ? "Submitting..." : "Update Restaurant"}
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

export default EditRestaurant;

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
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#ff5722',
    borderRadius: 8,
  },
});
