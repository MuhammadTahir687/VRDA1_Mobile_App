import React,{useState} from "react";
import {View, Text, SafeAreaView, FlatList, TouchableOpacity, Image} from "react-native";
import CountDown from 'react-native-countdown-component';
import Colors from "../../../Style_Sheet/Colors";
import Dialog from "react-native-dialog";
const Activity_Feeds=()=>{
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
        <TouchableOpacity onPress={()=>{setVisible(true)}} style={{ backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, paddingVertical: 10,marginHorizontal:10 ,paddingHorizontal:10}}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 16, color: Colors.white }}>{item.title}</Text>
            </View>
            <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Activity Date: {item.id}</Text>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Description:</Dialog.Title>
                <Dialog.Description>Do you want to delete this account? You cannot undo this action.</Dialog.Description>
                <Dialog.Button label="Cancel" onPress={()=>{setVisible(false)}} />
                {/*<Dialog.Button label="Delete" onPress={handleDelete} />*/}
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
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}
export default Activity_Feeds;
