import React,{useEffect,useState,useContext} from 'react';
import {TouchableOpacity,View,Text,StyleSheet,ActivityIndicator} from 'react-native'
import {Camera} from 'expo-camera';

import {ModelContext} from '../context/ModelContext';
import {Predict_tensor} from './Predict';

let camera;
const CameraPage=()=>{
  const {model_obj} = useContext(ModelContext)
  const [hasPermission, setHasPermission] = useState(null);
  const [type,setType]=useState(Camera.Constants.Type.back);
  const [capturedPhoto,setCapturedPhoto]=useState(null);
  const [showLoading,setShowLoading]=useState(false)


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
        }, []);

    const TakePicture=async ()=>{
      setShowLoading(true)
      const photo = await camera.takePictureAsync({ base64:true,quality:0.01 })
      const prediction= Predict_tensor(photo.base64,model_obj);
      setShowLoading(false)

    }
  
  
    if (hasPermission === null) {
     return <View />;
    }
    if (hasPermission === false) {
     return <Text>No access to camera</Text>;
    }
  return(
    <View style={styles.container}>
      
      <Camera  
      style={styles.camera} 
      type={type}
      ref={(r) => {
        camera = r
      }}
      >
            <View  style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                setType(
                  type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
                )
              }}
              
              >
                <Text style={styles.text}
                onPress={TakePicture}
                >{showLoading?(<ActivityIndicator size="large" color="#0000ff" />):("Take photo")}</Text>
              </TouchableOpacity>
            </View>
          </Camera>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row-reverse',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default CameraPage;