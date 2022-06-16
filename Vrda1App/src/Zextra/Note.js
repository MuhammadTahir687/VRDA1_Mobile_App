import React from "react";
import {Text, View, SafeAreaView} from "react-native";
import Colors from "../Style_Sheet/Colors"

const Notes = () => {
    return (
        <SafeAreaView>
            <View style={{backgroundColor:"rgba(0,0,0,0.24)",padding:5,borderRadius:5,marginTop:5}}>
            <Text style={{fontSize:15,fontWeight:"bold"}}>Note:</Text>
            <View style={{flexDirection:"row",backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold"}}>Files Allowed:</Text>
            <Text style={{fontSize:12}}> .jpg, .png, .gif, .txt, .doc, .xlx, .pdf</Text>
            </View>
            <View style={{flexDirection:"row",backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5,alignItems:"center"}}>
            <Text style={{fontWeight:"bold"}}>Max file size:</Text>
            <Text style={{fontSize:12}}> 8MB allowed</Text>
            </View>
            </View>
        </SafeAreaView>
    )
}
export default Notes;
