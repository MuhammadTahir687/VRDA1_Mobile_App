import React from "react";
import {Text, View, SafeAreaView, Dimensions} from "react-native";
import Colors from "../Style_Sheet/Colors";
import * as Progress from 'react-native-progress';

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;

const   PBar = ({heading,Require,value,Remaining,progressValue,text,textStyle}) => {
    return (
        <SafeAreaView>
            <View style={{backgroundColor:Colors.white,borderRadius:15,elevation:6,shadowOpacity:0.1,shadowOffset:({height:0,width:0}),padding:20,marginVertical:10}}>
                {text && <Text style={textStyle}>{text}</Text>}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>{heading}</Text>
                    <Text style={{fontSize: 10,padding:4,backgroundColor:value*100==100?"rgba(46,236,2,0.89)":value*100>=60?"#5741c4":value*100>=30?"#eac404":"#e80202",borderRadius:5,color:Colors.white,fontWeight:"bold"}}>{progressValue}%</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Progress.Bar width={deviceWidth / 1.55} progress={value} color={value*100==100?"rgba(46,236,2,0.89)":value*100>=60?"#5741c4":value*100>=30?"#eac404":"#e80202"} marginVertical={5}/>
                    <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: 16}}> {progressValue}%</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    {value * 100 == 100 ?
                        <Text style={{fontSize: 10,padding:4,backgroundColor:"rgba(46,236,2,0.89)",borderRadius:3,color:Colors.white,fontWeight:"bold"}}>Completed</Text>
                        : <Text style={{fontSize: 10}}>Remaining Points {Remaining}</Text>
                    }
                    <Text style={{fontSize: 10}}>Require {Require} </Text>
                </View>

            </View>
        </SafeAreaView>
    )
}
export default PBar;
