import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { API_FOOD_CATEGORIE, API_RESTAURANT } from "../common/apiURL";
import axios from "axios";
import { AuthContext } from "./authContex";

export const OperationContext = createContext("")
const getData = async (API_URL) => {
    try {
        const response = await axios.get(API_URL);       
        return response.data
    } catch (error) {
        console.log(error);        
    }
}

export const OperationProvider = ({ children }) => {
    //define auth state
    const {user}=useContext(AuthContext);
    const [restaurant, setRestaurant] = useState()
    const [foodcategorie,setFoodCat]=useState()    
    console.log(user);
    useEffect(() => {
        getRestaurantList()
        getFoodCateList()
    }, [])
    const getRestaurantList = async () => {
        setRestaurant();
        //console.log("Operation=> ", await getData(API_RESTAURANT))        
        setRestaurant((await  getData(API_RESTAURANT)).filter((item)=>item.user_id===user.email))

    }
    const getFoodCateList = async () => {
        setFoodCat();
        //console.log("Operation=> ", await getData(API_RESTAURANT));
        setFoodCat(await  getData(API_FOOD_CATEGORIE))
    }

    return (<OperationContext.Provider value={{ restaurant, setRestaurant,foodcategorie,setFoodCat }}>
        {children}
    </OperationContext.Provider>)

}