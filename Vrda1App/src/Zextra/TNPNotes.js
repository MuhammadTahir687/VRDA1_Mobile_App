import React from "react";
import {Text, View, SafeAreaView} from "react-native";
import Colors from "../Style_Sheet/Colors"

const TNPNotes = () => {
    return (
        <SafeAreaView>
            <View style={{backgroundColor:"rgba(0,0,0,0.24)",padding:5,borderRadius:5,margin:5}}>
            <Text style={{fontSize:15,fontWeight:"bold"}}>Note:</Text>
            <View style={{backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold",padding: 5,}} >At least one upper case English letter, [A-Z].</Text>
            </View>
            <View style={{flexDirection:"row",backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold",padding: 5,}}>At least one lower case English letter, [a-z].</Text>
            </View>
            <View style={{flexDirection:"row",backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold",padding: 5,}}>At least one digit, [0-9].</Text>
            </View>
            <View style={{flexDirection:"row",backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold",padding: 5,}}>At least one special character, [#?!@$%^&*-].</Text>
            </View>
            <View style={{flexDirection:"row",backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold",padding: 5,}}>Minimum eight in length, [8].</Text>
            </View>
            </View>
        </SafeAreaView>
    )
}
export default TNPNotes;
