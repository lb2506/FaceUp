import React from "react";
import { Text, View, StyleSheet} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { Card, Badge } from 'react-native-elements';

function GalleryScreen(props) {

    const photosList = props.photosUrlList.map((url, i) => {
        return (
            <Card key={i}>
              <Card.Image
                style={{ width: '100%', height: 170, marginBottom: 10 }}
                source={{ uri: url }}
              />
              <Badge status="success" value="homme"/>
              <Badge status="success" value="70 ans"/>
              <Badge status="success" value="barbe"/>
              <Badge status="success" value="joyeux !"/>
              <Badge status="success" value="cheveux gris"/>
            </Card>
          );
        });


    return (
        <View style={{marginTop:50}}>
            <ScrollView>
                <View style={{ flex: 1, backgroundColor:'#F2F2F2'}}>
                    <Text style={{fontSize:30, fontWeight:'bold', textAlign:'center', marginBottom:10}}>Léo's Gallery</Text>

                        {photosList}

                </View>
            </ScrollView>
        </View>
    );
}


function mapDispatchToState(state) {
    return {
        photosUrlList: state.photosUrlList
      }
    }

export default connect(
    mapDispatchToState,
    null
 )(GalleryScreen);