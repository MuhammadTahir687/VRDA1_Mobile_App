import React from "react";
import {Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, ImageBackground} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../../../../Style_Sheet/Colors";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import DoubleText from "../../../../utilis/DoubleText";
import ProfileView from "../../../../utilis/ProfileView";

const BankDetail = ({navigation,route}) => {
    var name=route.params.tittle
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
            <ProfileView screen_title={name} role={"Designer"} username={"Mr. Syed Ahmed Jahan"} onPress={()=>navigation.goBack()} onPressForUpdate={()=>{navigation.navigate("UpdateBank")}}>
                        <View>
                        <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10}}>{name}</Text>
                            <DoubleText text1={"Bank Name"} text2={"ALLIED Bank Limited"}/>
                            <DoubleText text1={"Branch Name"} text2={"Firdos Market"}/>
                            <DoubleText text1={"Account Number"} text2={"15975346582854"}/>
                            <DoubleText text1={"Primary Email"} text2={"talha.akbar366@gmail.com"}/>
                            <DoubleText text1={"Phone #1"} text2={"+26862313451483431"}/>
                            <DoubleText text1={"Joined"} text2={"15-04-21"}/>
                            <Text></Text>
                        </View>
            </ProfileView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default BankDetail;
