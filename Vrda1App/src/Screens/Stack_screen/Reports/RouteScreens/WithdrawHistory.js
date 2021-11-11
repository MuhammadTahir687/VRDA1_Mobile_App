import React, {useEffect, useState} from "react";
import {FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {getWithdrawHistory} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Colors from "../../../../Style_Sheet/Colors";
import Loader from "../../../../utilis/Loader";
import Dialogs from "../../../../utilis/Dialog";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DoubleText from "../../../../utilis/DoubleText";

const WithdrawHistory = () => {
    const [isloading,setLoading]=useState(false);
    const [visible,setVisible]=useState(false);
    const [refreshing,setRefreshing]=useState(false);
    const [data,setData]=useState("");
    const [ids,setIds]=useState("");

    useEffect(async ()=>{
        await getData();
    },[])

    const getData=async ()=>{
        setLoading(true)
        let response = await getWithdrawHistory();
        if (response !== "Error") {
            if (response.data.status === true) {
                setData(response.data.data);
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
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>{setVisible(true),setIds(item)}}
            style={{backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,marginHorizontal:5,marginVertical:2}}>
            <Text style={{ fontSize: 14, color: Colors.white }}>Ref. Code ({item.code?item.code:null})</Text>
            <Text style={{ fontSize: 14, color: Colors.white }}>Amount ({item.amount?"$"+item.amount:null})</Text>
            <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Closing Date: {item.created_at?item.created_at:null}</Text>
        </TouchableOpacity>
    )
    return(
        <SafeAreaView style={{flex:1}}>
            {data?null:
                <Loader animating={isloading}/>}
            <Text style={{textAlign:"center",fontWeight:"bold"}}>Withdraw History</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                style={{ flex: 1, }}
                contentContainerStyle={{ marginVertical: 20,paddingBottom:20, }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh} />
                }
            />
            <Dialogs visible={visible} onPress={()=>{setVisible(false)}} title={"Notes For Admin"} description={ids.admin_feedback?ids.admin_feedback:"Not Available"}>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:12,alignItems:"center",marginTop:10}}>
                    <TouchableOpacity style={{backgroundColor: Colors.primary,borderRadius: 25,flexDirection:"row",padding:7,justifyContent:"center",width:70, }}>
                        <EvilIcons color={Colors.white} size={22} name={"user"}/>
                        {/*<Text style={{color:Colors.white,fontSize:12}}>user {res.user_id} </Text>*/}
                    </TouchableOpacity>
                    <AntDesign color={Colors.primary}  size={20} name={"closecircle"} onPress={()=>{setVisible(false)}}/>
                </View>
                <View>
                    <DoubleText text1={"Ref. Code"} text2={ids.code?ids.code:"Not Available"}/>
                    <DoubleText text1={"Amount"} text2={ids.amount?"$"+ids.amount:"Not Available"}/>
                    <DoubleText text1={"Status"} text2={ids.status?ids.status:"Not Available"} textstyle={{backgroundColor:ids.status=="Pending"?"#ffd500":ids.status=="Rejected"?"#ff0000":ids.status=="Done"?"#1cff00":null,borderRadius:2,paddingLeft:5,width:60,color:ids.status=="Rejected"?Colors.white:null}}/>
                    <DoubleText text1={"Date"} text2={ids.created_at?ids.created_at:"Not Available"}/>
                </View>
            </Dialogs>
        </SafeAreaView>
    )
}
export default WithdrawHistory
