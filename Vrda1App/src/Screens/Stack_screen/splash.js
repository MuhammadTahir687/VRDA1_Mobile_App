import React, { useEffect } from "react";
import { Dimensions,ImageBackground,Image,View } from "react-native";
import {get_data} from "../../utilis/AsyncStorage/Controller";
import NetInfo from "@react-native-community/netinfo";


const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width

const Splash = ({navigation}) => {
    useEffect(async () => {
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                setTimeout(async () => {
                    await get_async()
                }, 3000);
            }
            else {
                alert("Network error")
            }
        });

    }, []);

    const get_async = async () => {
        let result = await get_data("ACCOUNT_DATA")
        if (result == null || result == undefined) {
            navigation.replace("Login");
        } else {
            navigation.replace("Drawers");
        }
    }
  // useEffect(async () => {
  //       setTimeout(async () => {
  //           navigation.replace("Login");
  //       }, 3000);
  //   });

  return (
    <ImageBackground style={{ height: height, width: width, flex: 1 }} source={require("../../Assets/splash.png")}>
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Image style={{height:90,width:280}} source={require("../../Assets/vrda1.png")}/>
        </View>
      </ImageBackground>
    );
};
export default Splash;
