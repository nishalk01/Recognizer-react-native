import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';




// custom imports
import MainPage from './components/screen/Main';
import CameraPage from './components/screen/CameraPage';
import ModelContextProvider from './components/context/ModelContext';

const Stack=createStackNavigator();



  
export default function App() {
  return (
    <ModelContextProvider>
    <NavigationContainer>
       <Stack.Navigator >
         <Stack.Screen name="MainPage"  component={MainPage}  />
         <Stack.Screen name="CameraPage"  options={{headerShown: false}} component={CameraPage}/>
       </Stack.Navigator>
    </NavigationContainer>
    </ModelContextProvider>
  );
}

