
import React from 'react';
import {SafeAreaView,Text,StyleSheet,Button , View, ActivityIndicator} from 'react-native'
import { useState, useEffect,useContext } from 'react';
import {  Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';


import {ModelContext} from '../context/ModelContext';
import {Predict_tensor} from './Predict';


const MainPage=({navigation,route})=>{
    const [image, setImage] = useState(null);
    const [isready,setIsReady]=useState(false);
    // const [model_obj,setModel]=useState(null);   
    const  { model_obj } =useContext(ModelContext);

    // const Predict_tensor=async (img_base64,model_obj)=>{
    //   const imgBuffer = tf.util.encodeString(img_base64, 'base64').buffer;
    //   const raw = new Uint8Array(imgBuffer)  
    //   const imageTensor = decodeJpeg(raw);
    //   const prediction = await model_obj.classify(imageTensor);
    //   console.log(prediction)
    // }
  
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }  
        // await tf.ready()
        // setIsReady(true)
        // const model = await mobilenet.load();
        // setModel(model)
        
      })();
    }, []);
   
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64:true,
        quality: 1,
      });
  
  
      if (!result.cancelled) {
        setImage(result.uri);
        try{
          const uri = result.uri
          const prediction=Predict_tensor(result.base64,model_obj);
        }
        catch(e){
          console.error(e)
          
        }
        
      }
    };
  
    // const model = await mobilenet.load();
    // console.log(model)
    return(
        <SafeAreaView style={styles.container}>
      <Button
        color="blue"
        title="Take photo"
        onPress={() =>  {
        
        navigation.navigate("CameraPage");

    }
    }
      />
       <View style={styles.button}></View>
       
        <Button title="Import Photo"  color="red" onPress={pickImage} />
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
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