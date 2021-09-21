import React from "react";
import {Text, View, SafeAreaView, ScrollView,ImageBackground} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import ProfileView from "../../../../utilis/ProfileView";
const Detail = ({navigation,route}) => {
    var name=route.params.tittle
    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require("../../../../Assets/splash.png")} style={{flex:1}}>
            <ProfileView screen_title={name} role={"Designer"} username={"Mr. Syed Ahmed Jahan"} onPress={()=>navigation.goBack()} onPressForUpdate={()=>{navigation.navigate("UpdateProfile")}}>
            {name=="Personal Detail"?
                <View style={{height:300,}}>
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10}}>{name}</Text>
                    <ScrollView>
                <DoubleText text1={"Username"} text2={"ojukuqse"}/>
                <DoubleText text1={"Joined"} text2={"15-04-21"}/>
                <DoubleText text1={"Identity"} text2={"N/A"}/>
                <DoubleText text1={"Primary Email"} text2={"talha.akbar366@gmail.com"}/>
                <DoubleText text1={"Phone #1"} text2={"+26862313451483431"}/><DoubleText text1={"Username"} text2={"ojukuqse"}/>
                <DoubleText text1={"Joined"} text2={"15-04-21"}/>
                <DoubleText text1={"Identity"} text2={"N/A"}/>
                <DoubleText text1={"Primary Email"} text2={"talha.akbar366@gmail.com"}/>
                <DoubleText text1={"Phone #1"} text2={"+26862313451483431"}/><DoubleText text1={"Username"} text2={"ojukuqse"}/>
                <DoubleText text1={"Joined"} text2={"15-04-21"}/>
                <DoubleText text1={"Identity"} text2={"N/A"}/>
                <DoubleText text1={"Primary Email"} text2={"talha.akbar366@gmail.com"}/>
                <DoubleText text1={"Phone #1"} text2={"+26862313451483431"}/><DoubleText text1={"Username"} text2={"ojukuqse"}/>
                <DoubleText text1={"Joined"} text2={"15-04-21"}/>
                <DoubleText text1={"Identity"} text2={"N/A"}/>
                <DoubleText text1={"Primary Email"} text2={"talha.akbar366@gmail.com"}/>
                <DoubleText text1={"Phone #1"} text2={"+26862313451483431"}/>
                    <Text></Text>
                    </ScrollView>
                </View>
                :
                <View>
                <Text style={{fontSize:16,fontWeight:"bold", color:Colors.primary,paddingHorizontal:10}}>{name}</Text>
                <DoubleText text1={"Country"} text2={"Pakistan"}/>
                <DoubleText text1={"City"} text2={"Lagos"}/>
                <DoubleText text1={"Identity"} text2={"N/A"}/>
                <DoubleText text1={"Passport"} text2={"N/A"}/>
                <DoubleText text1={"Next to Kin"} text2={"N/A"}/>
                    <Text></Text>
                </View>
            }
            </ProfileView>
            </ImageBackground>
</SafeAreaView>
    )
}
export default Detail;
