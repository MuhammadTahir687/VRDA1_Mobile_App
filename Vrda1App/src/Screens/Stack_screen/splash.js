import React, { useEffect } from "react";
import { Dimensions,ImageBackground,Image,View } from "react-native";

const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const Splash = ({navigation}) => {
  useEffect(async () => {
        setTimeout(async () => {
            navigation.replace("Login");
        }, 3000);
    });
  
  return (
    <ImageBackground style={{ height: height, width: width, flex: 1 }} source={require("../../Assets/splash.png")}>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Image style={{height:90,width:280}} source={require("../../Assets/vrda1.png")}/>
        </View>
      </ImageBackground>
    );
};
export default Splash;