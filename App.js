import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
import Login from './components/Login';

  const Stack = createNativeStackNavigator();

  const MyStack = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ title: 'LogIn' }}
        />
      <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Welcome To Your Diary' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
export default MyStack;
