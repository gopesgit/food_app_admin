
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigation from './AuthNavigation'
import { AuthProvider } from '../context/authContex'

const RootNavigation = () => {
  return (
    <NavigationContainer>   
      <AuthProvider>
        <AuthNavigation />    
        </AuthProvider>  
    </NavigationContainer>
  )
}

export default RootNavigation