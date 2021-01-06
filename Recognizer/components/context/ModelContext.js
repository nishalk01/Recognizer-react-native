import React, { createContext, useState,useCallback, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs'
import * as mobilenet from '@tensorflow-models/mobilenet';



export const ModelContext=createContext();


const ModelContextProvider=(props)=>{
    const [model_obj,setModel]=useState(null);
    useEffect(() => {
        (async () => {
          await tf.ready()
          const model_ = await mobilenet.load();
          setModel(model_) 
        })();
      }, []);

      return(
          <ModelContext.Provider value={{ model_obj }}>
              {props.children}
          </ModelContext.Provider>
      )


}

export default ModelContextProvider;