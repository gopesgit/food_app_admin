import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screen/HomeScreen';
import AddRestaurant from '../Screen/AddRestaurant';
import EditRestaurant from '../Screen/EditRestaurant';
import AddFoodItem from '../Screen/AddFoodItem';
import RestaurantScreen from '../Screen/RestaurantScreen';
import EditFoodItem from '../Screen/EditFoodItem';
import OrderScreen from '../Screen/OrderScreen';
const HomeStack = createStackNavigator();
const HomeStackNavigation = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen
                name="HomeScreen"
                component={HomeScreen}
            />
            <HomeStack.Screen
                name="Add-Restaurant"
                component={AddRestaurant}
            />
            <HomeStack.Screen
                name="Edit-Restaurant"
                component={EditRestaurant}
            />
            <HomeStack.Screen
                name="Add-Food"
                component={AddFoodItem}
            />
             <HomeStack.Screen
                name="Restaurant-Screen"
                component={RestaurantScreen}
            />
             <HomeStack.Screen
                name="Edit-Food"
                component={EditFoodItem}
            />
             <HomeStack.Screen
                name="Order-List"
                component={OrderScreen}
            />

        </HomeStack.Navigator>


    )
}

export default HomeStackNavigation