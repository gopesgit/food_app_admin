import axios from "axios";
import { API_USER } from "./apiURL";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
export const login = async (data,setUser) => {  
  console.log(data);     
    try {       
        const response = await axios.get(API_USER, {params: data});
        console.log('Response:', response.data);
        await AsyncStorage.setItem('auth', JSON.stringify(response.data))
        setUser(response.data)
    } catch (error) {   
      console.log(error);            
       ToastAndroid.showWithGravity(error.response.data.message,ToastAndroid.LONG,ToastAndroid.TOP)
             
    }
}