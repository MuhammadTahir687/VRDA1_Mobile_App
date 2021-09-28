import React from "react";
import {Text, View, SafeAreaView} from "react-native";
import Colors from "../Style_Sheet/Colors";

const Alert = ({value}) => {
    return (
        <SafeAreaView>
            <View style={{backgroundColor:"#e7abab",padding:10,borderWidth:1,borderColor:"red",borderLeftWidth:5,marginVertical:10}}>
                <Text style={{color:Colors.white,fontSize:14}}>You do not have sufficient funds in {value} to buy a package.</Text>
            </View>
        </SafeAreaView>
    )
}
export default Alert;
