import React, { useState } from "react";
import {FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import flex from "native-base/src/theme/components/flex";
import Colors from "../../../Style_Sheet/Colors";

const DATA = [
    {
        id: "1",
        title: "My Purchase",
    },
    {
        id: "2",
        title: "Ownership Purchase",
    },
    {
        id: "3",
        title: "Team Sale",
    },{
        id: "4",
        title: "Purchase Request",
    },{
        id: "5",
        title: "Transfer History",
    },{
        id: "6",
        title: "Receiving History",
    },
];


const Reports = () => {
    const Submit = async ({item}) => {
        if (item.id==1){
           alert("ddsssssss")
        }
        else {
            alert("ddd")
        }

    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>{Submit({item});}} style={{backgroundColor:"transparent",padding:10,alignItems:"center",flex:1,justifyContent:"center"}}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
        )
    const renderItem1 = ({ item }) => (
        <View>
        {item.id ==1?
        <TouchableOpacity style={{backgroundColor:"transparent",padding:10,flex:1,}}>

            <Text>ff</Text>
        </TouchableOpacity>
                :<Text>fff</Text>}
        </View>
            )
    return (
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 0.915,backgroundColor:"red"}}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem1}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <View style={{flex: 0.085}}>
                    <FlatList
                        horizontal={true}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </SafeAreaView>
    );
};

export default Reports;
