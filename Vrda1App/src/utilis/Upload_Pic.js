import React from "react";
import {Text, View, SafeAreaView, Image, TouchableOpacity} from "react-native";
import Colors from "../Style_Sheet/Colors";

const UploadPic = ({name,image}) => {
    return (
        <SafeAreaView>
        <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}}>
            <View style={{alignSelf:"center",alignItems:"center",justifyContent:"center",padding:8,backgroundColor:"white",borderRadius:45}}>
                <Image source={image}  style={{width:32.5,height:32.5}}/>
            </View>
            <Text style={{color:Colors.white,marginTop:5}}>{name}</Text>
        </TouchableOpacity>
        </SafeAreaView>
    )
}
export default UploadPic;
