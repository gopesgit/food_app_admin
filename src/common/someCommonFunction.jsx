import axios from "axios";
import { API_USER } from "./apiURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export const login = async (data, setUser) => {
  try {
    console.log(data);
    const response = await axios.get(API_USER, { params: data });
    console.log('Response:', response.data);
    await AsyncStorage.setItem('auth', JSON.stringify(response.data))
    setUser(response.data)
  } catch (error) {
    console.log(error);
    ToastAndroid.showWithGravity(error.response.data.message, ToastAndroid.LONG, ToastAndroid.TOP)
  }
}

export const checkFormData=(data,requiredFields)=>{
  for (let key of requiredFields) {
    if (!data[key]) {
        //console.log(`Missing or empty field: ${key}`);
        ToastAndroid.showWithGravity(`Missing or empty field: ${key}`, ToastAndroid.LONG, ToastAndroid.TOP)
        return false; // Return false if any required field is falsy
    }
}
return true;
}
export const insertData = async (formdata, APIURL,message) => {
  console.log(APIURL);
  console.log(formdata);
  try {
    let response = await axios.post(
     APIURL,
      formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    //console.log('Upload successful! ', response);
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.TOP)
    return response
  } catch (error) {
    console.error('Something worng! ', error);
    ToastAndroid.showWithGravity('Something worng! ', ToastAndroid.LONG, ToastAndroid.TOP)
  }
}
export const deleteData = async (id, APIURL) => {
  console.log(APIURL);
  console.log(id);
  try {
    let response = await axios.delete(`${APIURL}/${id}`);
    console.log('Upload successful! ', response);
    ToastAndroid.showWithGravity('Delete Data', ToastAndroid.LONG, ToastAndroid.TOP)
  } catch (error) {
    console.error('Upload failed! ', error);
    ToastAndroid.showWithGravity('Data not add', ToastAndroid.LONG, ToastAndroid.TOP)
  }
}
export const pickImage = async (data) => {
  //console.log(data);
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    data(result.assets[0].uri);
  }
};
export const getData = async (API_URL) => {
  try {
    const response = await axios.get(API_URL);
    if (response.status === 200) {
      return response.data; // Return the data if request is successful
    } else {
      return null; // Return null if request is not successful
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    //throw error; // Re-throw the error to handle it outside of this function if needed
  }
};