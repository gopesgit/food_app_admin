import { createStackNavigator } from '@react-navigation/stack'
import Login from '../Screen/Login';
import Register from '../Screen/Register';
import { useContext } from 'react';
import { AuthContext } from '../context/authContex';
import HomeNavigation from './HomeNavigation';
import HomeStackNavigation from './HomeStackNavigation';
const AuthStack = createStackNavigator();
const AuthNavigation = () => {
  const { user } = useContext(AuthContext)
  //console.log("Auth",user);
  const login = user.token == null ? false : true
  console.log("logininfo", login);
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {login ?      
        <AuthStack.Screen
          name="HomeNavigation"
         component={HomeNavigation}
        />
        :
        <>
          <AuthStack.Screen
            name="Login"
            component={Login}
          />
          <AuthStack.Screen
            name="Register"
            component={Register}
          />
        </>}


    </AuthStack.Navigator>


  )
}

export default AuthNavigation