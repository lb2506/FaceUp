import React from "react";
import {ImageBackground, View } from "react-native";
import { Button, Input } from "react-native-elements";

import { Ionicons } from '@expo/vector-icons'; 

export default function HomeScreen(props) {
    return (
        <ImageBackground source={require('../assets/home.jpg')} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{alignItems:'center'}}>
                <Input
                        placeholder="UserName"
                        leftIcon={ <Ionicons name="person" size={24} color="#009788" />}
                        inputContainerStyle={{ width: '70%' }}

                        />
                <Button buttonStyle={{backgroundColor: '#009788', type: 'solid', marginTop:20}} title="Go to Gallery" onPress={() => {props.navigation.navigate('TabNavigator')} }/>
            </View>
        </ImageBackground>
    );
}