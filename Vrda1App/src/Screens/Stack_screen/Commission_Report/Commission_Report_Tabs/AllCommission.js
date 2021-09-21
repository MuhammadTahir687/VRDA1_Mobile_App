import React, {useState} from "react";
import {Text, View, SafeAreaView, TouchableOpacity, FlatList} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import Dialog from "react-native-dialog";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DoubleText from "../../../../utilis/DoubleText";

const AllCommission = () => {
    const [visible, setVisible] = useState(false);
    const Data=[
        {id: '1', title: 'C2C Vreit Points Received',},
        {id: '2', title: 'UniLevel Commission',},
        {id: '3', title: 'Weekly Commission',},
    ]
    const renderItem=({item})=>(
        <TouchableOpacity onPress={()=>{setVisible(true)}} style={{height:105,width:"46%", backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,margin:"2%" }}>
            <Text style={{ fontSize: 14, color: Colors.white }}>Ref.Code ({item.id})</Text>
            <Text style={{ fontSize: 14, color: Colors.white }}>Amount ({item.id})</Text>
            <Text style={{ fontSize: 14, color: Colors.white }}>Status ({item.id}%)</Text>
            <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Activity Date: {item.id}</Text>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Description:</Dialog.Title>
                <Text style={{fontSize:13,textAlign:"center",paddingHorizontal:10 }}>BV:100 - Commission on: 100 - Direct Bonus without JS:10%</Text>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:12}}>
                    <TouchableOpacity style={{backgroundColor: Colors.primary,borderRadius: 25,flexDirection:"row",padding:7,justifyContent:"center",width:70, }}>
                        <EvilIcons color={Colors.white}  size={22} name={"user"}/>
                        <Text style={{color:Colors.white,fontSize:12}}>user {item.id}</Text>
                    </TouchableOpacity>
                    <AntDesign color={Colors.primary}  size={20} name={"closecircle"} onPress={()=>{setVisible(false)}}/>
                </View>
                <DoubleText text1={"Ref.Code"} text2={"7"}/>
                <DoubleText text1={"Receiver"} text2={"15000"}/>
                <DoubleText text1={"Generator"} text2={"7"}/>
                <DoubleText text1={"Side"} text2={"7"}/>
                <DoubleText text1={"Type"} text2={"7"}/>
                <DoubleText text1={"Amount"} text2={"7"}/>
                <DoubleText text1={"Status"} text2={"7"}/>
                <DoubleText text1={"Closing"} text2={"7"}/>
                <DoubleText text1={"Date"} text2={"7"}/>
            </Dialog.Container>
        </TouchableOpacity>
    )
    return (
        <SafeAreaView style={{flex:1}}>
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
export default AllCommission;
