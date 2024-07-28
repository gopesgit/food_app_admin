import axios from "axios";
import { API_USER } from "./apiURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import * as ImagePicker from 'expo-image-picker';
export const pickImage = async (data) => {
 
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
export const insertData = async (formdata, APIURL,message="") => {
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
    console.error('Error:', error.response ? error.response.data : error.message);
    ToastAndroid.showWithGravity('Something worng! ', ToastAndroid.LONG, ToastAndroid.TOP)
  }
}

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
export const updateData = async (formdata, APIURL,message="") => {
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
    console.error('Error:', error.response ? error.response.data : error.message);
    ToastAndroid.showWithGravity('Something worng! ', ToastAndroid.LONG, ToastAndroid.TOP)
  }
}

