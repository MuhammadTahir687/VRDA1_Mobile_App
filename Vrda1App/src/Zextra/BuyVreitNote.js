import React from "react";
import {Text, View, SafeAreaView} from "react-native";
import Colors from "../Style_Sheet/Colors"

const BuyVreitNotes = ({title,inst1,inst2,inst3}) => {
    return (
        <SafeAreaView>
            <View style={{backgroundColor:"rgba(0,0,0,0.24)",padding:5,borderRadius:5,margin:5}}>
            <Text style={{fontSize:15,fontWeight:"bold"}}>{title}</Text>
          { inst1 && <View style={{backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold",paddingVertical: 5,}} >{inst1}</Text>
            </View>}
            { inst2 && <View style={{backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold",paddingVertical: 5,}} >{inst2}</Text>
            </View>}
            { inst3 && <View style={{backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold",paddingVertical: 5,}} >{inst3}</Text>
            </View>}
            </View>
        </SafeAreaView>
    )
}
export default BuyVreitNotes;
