
import React from 'react';
import {SafeAreaView,Text,StyleSheet,Button , View} from 'react-native'
import { useState, useEffect } from 'react';
import {  Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


import * as mobilenet from '@tensorflow-models/mobilenet';
import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';

// Load mobilenet.
const load_mod=async()=>{
    console.log("passed")
    const model = await mobilenet.load();
    console.log(model)
}


const MainPage=({navigation})=>{
    const [image, setImage] = useState(null);

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };


    return(
        <SafeAreaView style={styles.container}>
      <Button
        color="blue"
        title="Take photo"
        onPress={() => {
        console.log('Simple Button pressed')
        load_mod()
    }
    }
      />
       <View style={styles.button}></View>
        <Button title="Import Photo"  color="red" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </SafeAreaView>
    )
   
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      alignItems: 'center',
      justifyContent: 'center',
    },
    button:{
       paddingTop:100,
        color:"red"
    }
  });
  
export default MainPage;