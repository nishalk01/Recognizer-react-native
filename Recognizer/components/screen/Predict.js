import * as tf from '@tensorflow/tfjs'
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import {Alert} from 'react-native'

export const Predict_tensor=async (img_base64,model_obj)=>{
    const imgBuffer = tf.util.encodeString(img_base64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer)  
    const imageTensor = decodeJpeg(raw);
    const prediction = await model_obj.classify(imageTensor);
    Alert.alert(prediction[0].className)
    return prediction
  }