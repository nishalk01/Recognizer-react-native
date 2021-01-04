import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';


// custom imports
import MainPage from './components/screen/Main';


const Stack=createStackNavigator();


// total two screen select options and either from storage or from camera
export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator >
         <Stack.Screen name="MainPage"  component={MainPage}  />
        
         </Stack.Navigator>
    </NavigationContainer>
  );
}

