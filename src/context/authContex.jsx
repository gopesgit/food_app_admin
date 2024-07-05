import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext("")
export const AuthProvider = ({ children }) => {
    //define auth state
    const [user, setUser] = useState({token:null})
    useEffect(() => {
        getLocalStorageData()
    }, [])
    const getLocalStorageData = async () => {
        let data = await AsyncStorage.getItem('auth')
        console.log("fdf=>",data);
        let logindata = JSON.parse(data)
        if (logindata) {
        setUser(logindata)       
        }
    }
    return (<AuthContext.Provider value={{ user, setUser }}>
        {children}
    </AuthContext.Provider>)

}