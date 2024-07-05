import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../Screen/HomeScreen'
import AddExpenseType from '../Screen/AddExpenseType'
import AddIncomeType from '../Screen/AddIncomeType'
import AddCRDRType from '../Screen/AddCRDRType'
const HomeDra=createDrawerNavigator()
const HomeDrawer = () => {
  return (
   <HomeDra.Navigator>
    <HomeDra.Screen 
    name='Home'
    component={HomeScreen}
    />
    {/* <HomeDra.Screen 
    name='Expense Type'
    component={AddExpenseType}
    /> */}
    {/* <HomeDra.Screen 
    name='Income'
    component={AddIncomeType}
    /> */}
    <HomeDra.Screen 
    name='Add Fund Type'
    component={AddCRDRType}
    options={{title:"Fund"}}
    />
   </HomeDra.Navigator>
  )
}

export default HomeDrawer