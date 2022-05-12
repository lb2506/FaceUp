import React, {useState, useEffect, useRef} from "react";
import { View, Text } from "react-native";
import { Camera } from 'expo-camera';
import { Button, Overlay } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { useIsFocused } from '@react-navigation/native';

import {connect} from 'react-redux';

function SnapScreen(props) {
    const isFocused = useIsFocused();
    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

    var cameraRef = useRef(null);
    const [visible, setVisible] = useState(false);


    useEffect(() => {
      
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
      
    }, []);

    if (hasPermission && isFocused) {
        return (
            <View style={{ flex: 1 }}>
                <Overlay isVisible={visible}  width="auto" height="auto">
                    <Text>Loading</Text>
                </Overlay>
                <Camera style={{ flex: 1 }} type={type} ref={ref => (cameraRef = ref)} flashMode={flash} />
                <View style={{backgroundColor:'#111224', alignItems:'center', paddingVertical:10, display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                    <Button buttonStyle={{backgroundColor:'transparent'}} icon={<MaterialCommunityIcons name="camera-flip" size={34} color="#fff" />} onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                        }}/>
                    <Button buttonStyle={{ type: 'solid', height:70, width:70, borderRadius:100, backgroundColor:'#fff', borderColor:'#009788', borderWidth:'4px'}} onPress={async () => {
                        setVisible(true);

                        if (cameraRef) {
                            let photo = await cameraRef.takePictureAsync( {quality: 0.7, base64: true, exif: true});

                            var data = new FormData();

                            data.append('photo', {
                                uri: photo.uri,
                                type: 'image/jpeg',
                                name: 'avatar.jpg',
                                });

                            var rawResponse = await fetch('http://192.168.0.22:3000/upload', { // déclarer le ftech en varialbe pour pouvoir récupérer la réponse
                                method: 'POST',
                                body: data,
                            })
                            var response = await rawResponse.json(); // on stock la réponse dans une variable
                            if (response.result) { // si la réponse est ok
                            setVisible(false) // on cache l'overlay
                            props.onTakePictureClick(response.url); // on envoie l'url de la photo à la fonction onTakePictureClick dans le store
                            }
                        } 
                        
                        }}/>
                    <TouchableOpacity onPress={() => { 
                        setFlash(
                            flash === Camera.Constants.FlashMode.torch
                              ? Camera.Constants.FlashMode.off
                              : Camera.Constants.FlashMode.torch
                          );
                        }}>
                        <Ionicons name="ios-flash" size={34} color="#fff" />
                    </TouchableOpacity>
                </View>
          </View>
        ) 
      }
      else {
        
        return <View style={{ flex: 1 }}>
                    <Text>No access to camera</Text>
                </View>
      }
}

function mapDispatchToProps(dispatch) {
    return {
      onTakePictureClick: function(url) {
          dispatch( {type: 'photoUrlList', url } )
      }
    }
   }

export default connect(
    null,
    mapDispatchToProps
 )(SnapScreen);