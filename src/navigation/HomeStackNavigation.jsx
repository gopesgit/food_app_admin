import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../Screen/HomeScreen';
import AddRestaurant from '../Screen/AddRestaurant';
import EditRestaurant from '../Screen/EditRestaurant';
import AddFoodItem from '../Screen/AddFoodItem';
import RestaurantScreen from '../Screen/RestaurantScreen';
import EditFoodItem from '../Screen/EditFoodItem';
import OrderScreen from '../Screen/OrderScreen';
import DeliveryFeeScreen from '../Screen/DeliveryFeeScreen';
import AddDeliveryFeeScreen from '../Screen/AddDeliveryFeeScreen';
import EditDeliveryFeeScreen from '../Screen/EditDeliveryFeeScreen ';
import CouponScreen from '../Screen/CouponScreen';
import CouponForm from '../Screen/CouponForm';
import AddFoodCatagorie from '../Screen/AddFoodCatagorie';
import EditCategoryScreen from '../Screen/EditCategoryScreen';
import DeliveryOrderScreen from '../Screen/DeliveryOrderScreen';
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
            <HomeStack.Screen
                name="Delivery-Order-List"
                component={DeliveryOrderScreen}
            />
            <HomeStack.Screen
                name="DeliveryFeeScreen"
                component={DeliveryFeeScreen}
            />
            <HomeStack.Screen
                name="AddDeliveryFeeScreen"
                component={AddDeliveryFeeScreen}
            />
            <HomeStack.Screen
                name="EditDeliveryFeeScreen"
                component={EditDeliveryFeeScreen}
            />
             <HomeStack.Screen
                name="Coupon-Screen"
                component={CouponScreen}
            />
             <HomeStack.Screen
                name="Coupon-Form"
                component={CouponForm}
            />
            <HomeStack.Screen
                name="AddFoodCatagorie"
                component={AddFoodCatagorie}
            />
            <HomeStack.Screen
                name="EditCategoryScreen"
                component={EditCategoryScreen}
            />

        </HomeStack.Navigator>


    )
}

export default HomeStackNavigation