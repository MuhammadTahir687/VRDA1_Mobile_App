import React from "react";
import {Text, View, SafeAreaView, Dimensions} from "react-native";
import Colors from "../Style_Sheet/Colors";
import * as Progress from 'react-native-progress';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const PBar = ({heading,Require,value,Remaining,progressValue}) => {
    return (
        <SafeAreaView>
            <View style={{backgroundColor:Colors.white,borderRadius:15,elevation:6,shadowOpacity:0.1,shadowOffset:({height:0,width:0}),padding:25,marginVertical:10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>{heading}</Text>
                    <Text style={{fontSize: 10}}>{progressValue}%</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Progress.Bar width={deviceWidth / 1.55} progress={value} color={Colors.primary} backgroundColor={Colors.secondary} borderColor={Colors.secondary} marginVertical={5}/>
                    <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: 16}}> {progressValue}%</Text>
                </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 10}}>Remaining Points {Remaining}</Text>
                        <Text style={{fontSize: 10}}>Require {Require} </Text>
                    </View>
            </View>
        </SafeAreaView>
    )
}
export default PBar;
