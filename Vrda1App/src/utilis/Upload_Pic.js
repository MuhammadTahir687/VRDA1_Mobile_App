import React from "react";
import {Text, View, SafeAreaView, Image, TouchableOpacity} from "react-native";
import Colors from "../Style_Sheet/Colors";

const UploadPic = ({name,source,onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={{justifyContent:"center",alignItems:"center",flex:1}}>
            <View style={{alignSelf:"center",alignItems:"center",justifyContent:"center",backgroundColor:"white",borderRadius:45,flex:1}}>
                <Image source={source}  style={{width:50,height:50,borderRadius:25,borderWidth:1,borderColor:Colors.white}}/>
            </View>
            <Text style={{color:Colors.white,marginTop:5,fontSize:11}}>{name}</Text>
        </TouchableOpacity>
    )
}
export default UploadPic;
