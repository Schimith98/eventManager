import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import EventPage from '../pages/EventPage';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="EventPage" component={EventPage} />
    </Stack.Navigator>
  );
};

export default Routes;
