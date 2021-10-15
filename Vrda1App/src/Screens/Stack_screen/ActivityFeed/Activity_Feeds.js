import React,{useState, useEffect} from "react";
import {View, Text, SafeAreaView, FlatList, TouchableOpacity,RefreshControl } from "react-native";
import Colors from "../../../Style_Sheet/Colors";
import Dialogs from "../../../utilis/Dialog";
import {getactivityfeed, } from "../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../utilis/Loader";

const Activity_Feeds=()=>{

    const [visible, setVisible] = useState(false);
    const [res,setRes]=useState("");
    const [isloading,setLoading]=useState(false);
    const [apiData,setApiData]=useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(async ()=>{
        await getData();
    },[])

    const getData=async ()=>{
        setLoading(true)
        let response = await getactivityfeed();
        if (response !== "Error") {
            if (response.data.status === true) {
                setApiData(response.data.data.data);
                setRefreshing(!refreshing)
                setLoading(false);
            }else {
                Toast.show("Something Went Wrong !", Toast.LONG);
                setLoading(false);
            }
        }else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }
    const onRefresh = async () => {
        await getData();
    }
    const renderItem=({item})=>(
        <TouchableOpacity onPress={()=>{setVisible(true),setRes(item)}} style={{ backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, paddingVertical: 10,marginHorizontal:10 ,paddingHorizontal:10}}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 16, color: Colors.white }}>{item.heading}</Text>
            </View>
            <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Activity Date: {item.date}</Text>
        </TouchableOpacity>
    )

    return(
        <SafeAreaView style={{flex:1}}>
            <Loader animating={isloading}/>
            <FlatList
                data={apiData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh} />
                }
            />
            <Dialogs visible={visible} title={res.heading} description={res.detail} onPress={()=>{setVisible(false)}}/>
        </SafeAreaView>
    )
}
export default Activity_Feeds;
