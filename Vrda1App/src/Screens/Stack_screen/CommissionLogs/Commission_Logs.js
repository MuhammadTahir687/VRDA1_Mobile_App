import React, {useState} from "react";
import {View, Text, FlatList, SafeAreaView, TouchableOpacity, Dimensions} from "react-native";
import CountDown from "react-native-countdown-component";
import Colors from "../../../Style_Sheet/Colors";
import Dialog from "react-native-dialog";
import * as Progress from 'react-native-progress';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DoubleText from "../../../utilis/DoubleText";

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const Commission_Logs=()=>{
    const [visible, setVisible] = useState(false);
    const Data=[
        {
            id: '1',
            title: 'C2C Vreit Points Received',
        },
        {
            id: '2',
            title: 'UniLevel Commission',
        },
        {
            id: '3',
            title: 'Weekly Commission',
        },
    ]
    const renderItem=({item})=>(
        <TouchableOpacity onPress={()=>{setVisible(true)}} style={{height:105,width:"46%", backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,margin:"2%" }}>
                <Text style={{ fontSize: 14, color: Colors.white }}>Transactions ({item.id})</Text>
            <Text style={{ fontSize: 14, color: Colors.white }}>Total ({item.id})</Text>
            <Text style={{ fontSize: 14, color: Colors.white }}>Status ({item.id}%)</Text>
            <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Activity Date: {item.id}</Text>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Description:</Dialog.Title>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:12}}>
                <TouchableOpacity style={{backgroundColor: Colors.primary,borderRadius: 25,flexDirection:"row",padding:7,justifyContent:"center",width:70, }}>
                    <EvilIcons color={Colors.white}  size={22} name={"user"}/>
                    <Text style={{color:Colors.white,fontSize:12}}>user {item.id}</Text>
                </TouchableOpacity>
                    <AntDesign color={Colors.primary}  size={20} name={"closecircle"} onPress={()=>{setVisible(false)}}/>
                </View>
                <DoubleText text1={"Transaction"} text2={"7"}/>
                <DoubleText text1={"Total ("+item.id+")"} text2={"15000"}/>
                <DoubleText text1={"70% ("+item.id+")"} text2={"7"}/>
                <DoubleText text1={"30% ("+item.id+")"} text2={"7"}/>
                <DoubleText text1={"Closing Date"} text2={"7"}/>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start',margin:3,paddingHorizontal:17.5}}>
                        <Text style={{ width: '50%',fontWeight:"bold"}}>Status</Text>
                        <Progress.Bar width={deviceWidth / 3.6} progress={0.1} color={Colors.primary} backgroundColor={Colors.secondary} borderColor={Colors.secondary} marginVertical={5}/>
                        <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: 12}}> 37%</Text>
                    </View>

                {/*<Dialog.Description>Do you want to delete this account? You cannot undo this action.</Dialog.Description>*/}
                {/*<Dialog.Button label="Cancel" onPress={()=>{setVisible(false)}} />*/}
            </Dialog.Container>
        </TouchableOpacity>
    )
    return(
        <SafeAreaView style={{flex:1}}>
            <Text style={{textAlign:"center",fontWeight:"bold"}}>Next Commissions</Text>
            <CountDown
                until={60 * 10 + 30}
                onFinish={() => alert('finished')}
                onPress={() => alert('hello')}
                size={20}
            />
            <FlatList
                data={Data}
                renderItem={renderItem}
                numColumns={2}
                style={{ flex: 1 }}
                contentContainerStyle={{ marginVertical: 20 }}
            />
        </SafeAreaView>
    )
}
export default Commission_Logs;
