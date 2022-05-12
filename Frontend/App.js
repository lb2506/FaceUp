import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import SnapScreen from './screens/SnapScreen';
import GalleryScreen from './screens/GalleryScreen'; 

import { MaterialIcons } from '@expo/vector-icons';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import photosUrlList from './reducers/photoUrlList';

const store = createStore(combineReducers({photosUrlList}));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function tabNavigator() {
  return (
    <Tab.Navigator

    screenOptions={({route})=>({
      tabBarIcon: ({color})=>{
        let iconName;
        if(route.name === 'Gallery'){
          iconName = 'photo-library';
        } else if(route.name === 'Snap'){
          iconName = 'photo-camera';
        } 
        return <MaterialIcons name={iconName} size={24} color={color} />
      }
    })}

    tabBarOptions={{
      activeTintColor: '#009788',
      inactiveTintColor: '#fff',
      style: {
        backgroundColor: '#111224',
        borderTopWidth: 0,
      },
    }}>

      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Snap" component={SnapScreen} />
      
    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TabNavigator" component={tabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
   );
}
