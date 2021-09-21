import React from "react";
import {Text, View, SafeAreaView, TouchableOpacity} from "react-native";
import Colors from "../Style_Sheet/Colors";
import Entypo from "react-native-vector-icons/Entypo";

const ProfileBtn = ({title,onPress}) => {
    return (
        <SafeAreaView>
            <TouchableOpacity onPress={onPress} style={{backgroundColor:Colors.secondary , marginVertical:5,flexDirection:"row",justifyContent:"space-between",padding:10,alignItems:"center",borderRadius:10}}>
                <Entypo color={Colors.white}  size={15} name={"user"}/>
                <Text style={{color:Colors.white}}>{title}</Text>
                <Entypo color={Colors.white}  size={15} name={"chevron-with-circle-right"}/>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default ProfileBtn;
