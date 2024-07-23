import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homescreen from './screens/Homescreen/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Homescreen}
          options={{
            orientation: 'landscape',
            headerShown: false,
            navigationBarHidden: true,
            statusBarHidden: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
