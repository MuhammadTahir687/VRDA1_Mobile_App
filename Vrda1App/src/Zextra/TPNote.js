import React from "react";
import {Text, View, SafeAreaView} from "react-native";
import Colors from "../Style_Sheet/Colors"

const TPNotes = ({inst1,inst2}) => {
    return (
        <SafeAreaView>
            <View style={{backgroundColor:"rgba(0,0,0,0.24)",padding:5,borderRadius:5,margin:5}}>
            <Text style={{fontSize:15,fontWeight:"bold"}}>Note:</Text>
            {inst1 &&  <View style={{backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
           <Text style={{fontWeight:"bold",padding: 5,}} > Buying Vreit is used for purchasing packages or C2C transfer only.</Text>
            </View>}
            {inst2 && <View style={{flexDirection:"row",backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
              <Text style={{fontWeight:"bold",padding: 5,}}>Buying Vreit can’t be withdraw by bank or usdt.</Text>
            </View>}
            <View style={{flexDirection:"row",backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold",padding: 5,}}>This transaction is not reversible.</Text>
            </View>
            <View style={{flexDirection:"row",backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold",padding: 5,}}>Incase of any wrong transfer or buying, the company will not be responsible.</Text>
            </View>
            <View style={{flexDirection:"row",backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold",padding: 5,}}>Make sure all the transactions are carried out with your consent.</Text>
            </View>
            <View style={{flexDirection:"row",backgroundColor:Colors.white,margin:3,borderRadius:5,paddingHorizontal:5}}>
            <Text style={{fontWeight:"bold",padding: 5,}}>Agree to terms and conditions.</Text>
            </View>
            </View>
        </SafeAreaView>
    )
}
export default TPNotes;
