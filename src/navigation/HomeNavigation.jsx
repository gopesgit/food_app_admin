
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/base'
import Header from '../componet/Header'
import HomeScreen from '../Screen/HomeScreen'

import AddFoodItem from '../Screen/AddFoodItem'
import { OperationProvider } from '../context/operationContext'
import AddFoodCatagorie from '../Screen/AddFoodCatagorie'
import HomeStackNavigation from './HomeStackNavigation'
const TabNavi = createBottomTabNavigator()
const HomeNavigation = () => {
  return (
    <OperationProvider>
      <TabNavi.Navigator
        screenOptions={{
          headerRight: () => <Header />
        }}
      >
        <TabNavi.Screen
          name="HomeTab"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" size={size} color={color} />
            ),
            headerShown: true,
          }}

          component={HomeStackNavigation}
        />
        <TabNavi.Screen
          options={{
            title: "Add Food Catagorie",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <Icon name="transform" size={size} color={color} />
            ),
          }}
          name="Add Food Catagorie"
          component={AddFoodCatagorie}
        />

        
      </TabNavi.Navigator>
    </OperationProvider>
  )
}

export default HomeNavigation