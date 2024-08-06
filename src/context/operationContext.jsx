import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { API_FOOD_CATEGORIE, API_ORDER, API_ORDER_LIST, API_RESTAURANT, API_RESTAURANT_OWNER } from "../common/apiURL";
import axios from "axios";
import { AuthContext } from "./authContex";

const getData = async (API_URL) => {
  //console.log(API_URL);
    try {
        const response = await axios.get(API_URL);       
        return response.data
    } catch (error) {
      
        //console.log(error);        
    }
}
export const OperationContext = createContext("")
export const OperationProvider = ({ children }) => {
    //define auth state
    const {user}=useContext(AuthContext);
    const [restaurant, setRestaurant] = useState([])
    const [foodcategorie,setFoodCat]=useState([])
    const [order,setOrder]=useState([])    
    //console.log(user);
    useEffect(() => {
       allFunction()
    }, [])
    const allFunction=()=>{
        getRestaurantList()
        getFoodCateList()
        //getOrderList()
    }
    const getRestaurantList = async () => {
        setRestaurant([]);
        //console.log("Operation=> ",await getData(API_RESTAURANT_OWNER+user.email))             
        setRestaurant((await  getData(API_RESTAURANT_OWNER+user.email)).filter((item)=>item.user_id===user.email))
        return (await  getData(API_RESTAURANT_OWNER+user.email)).filter((item)=>item.user_id===user.email)
    }
    const getFoodCateList = async () => {
        setFoodCat([]);
        //console.log("Operation=> ", await getData(API_RESTAURANT));
        setFoodCat(await  getData(API_FOOD_CATEGORIE))
    }
    const getOrderList = async () => {
        setOrder([]);
        console.log("Operation=> ", await getData(API_ORDER));
        setOrder(await  getData(API_ORDER))

    }
    const fetchOrderList = async (id) => {
        try {        
          const orderlistPending = await getData(API_ORDER_LIST +id);  
          //console.log("o==>",orderlistPending);        
          if (orderlistPending && orderlistPending.length > 0) {
            console.log("From:",orderlistPending);            
            return orderlistPending.filter((item)=>item.status_restaurant!=='cancel'&&item.status_restaurant!=='delivery'); // Return the fetched data
          } else {
            return []; 
            console.log('Order list is empty or undefined');
            return []; // Return an empty array if the list is empty or undefined
          }

        } catch (error) {
          console.error('Error fetching order list:', error);
        }
      };

    return (<OperationContext.Provider value={{ restaurant, setRestaurant,foodcategorie,setFoodCat,allFunction,fetchOrderList,order,getOrderList,getRestaurantList }}>
        {children}
    </OperationContext.Provider>)

}