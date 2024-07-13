import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Icon } from '@rneui/base'
import { AuthContext } from '../context/authContex'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Header = () => {
    const { user,setUser } = useContext(AuthContext)
    const logout=async()=>{
        setUser({token:null})
        await AsyncStorage.removeItem('auth');
        
    }
  return (
    <View style={{ marginRight: 10, flexDirection: 'row',gap:10 }}>
      <Icon name="logout" size={28} color={'#000'} onPress={()=>logout()} />        
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})