
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from '@rneui/base'
import Header from '../componet/Header'
import HomeScreen from '../Screen/HomeScreen'

import AddFoodItem from '../Screen/AddFoodItem'
import { OperationProvider } from '../context/operationContext'
import AddFoodCatagorie from '../Screen/AddFoodCatagorie'
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

          component={HomeScreen}
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

        <TabNavi.Screen
          options={{
            title: "Fund",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <Icon name="currency-rupee" size={size} color={color} />
            ),
          }}
          name="Add Fund Type"
          component={AddFoodItem}
        />
      </TabNavi.Navigator>
    </OperationProvider>
  )
}

export default HomeNavigation