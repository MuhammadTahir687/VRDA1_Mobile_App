import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, TouchableOpacity, FlatList, RefreshControl} from "react-native";
import {
    getPurchaseRequest,
    getTeamSale,
    LoginApi,
    sendDeletePackageRequest
} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Colors from "../../../../Style_Sheet/Colors";
import Loader from "../../../../utilis/Loader";
import Dialogs from "../../../../utilis/Dialog";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DoubleText from "../../../../utilis/DoubleText";
import {save_data} from "../../../../utilis/AsyncStorage/Controller";
import RBSheet from "react-native-raw-bottom-sheet";

const PurchaseRequest = () => {
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
        let response = await getPurchaseRequest();
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

    const renderItem=({item,index})=>(
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>{setVisible(true),setIds(item)}}
            style={{backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,marginHorizontal:5,marginVertical:2}}>
            {/*<Text>dddd</Text>*/}
            <View style={{flexDirection:"row"}}>
                <Text style={{ fontSize: 14, color: Colors.white }}>{index+1}. </Text>
                <View>
                    <Text style={{ fontSize: 14, color: Colors.white }}>Request Type ({item.submission_type?item.submission_type:null})</Text>
                    {/*<Text style={{ fontSize: 14, color: Colors.white }}>Package Name ({item.package.title})</Text>*/}
                    <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Closing Date: {item.created_at?item.created_at:null}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
    const Cancel=async ()=>{
        let body = {request_id: ids.id};
        console.log("Body======",body)
        setLoading(true)
        let response = await sendDeletePackageRequest(body)
        console.log("response=======",response.data)
        if (response !== "Error") {
            if (response.data.status == true) {
                await setLoading(false);
                await setVisible(false)
                await onRefresh();
                Toast.show(response.data.message, Toast.LONG);
            }else {
                Toast.show("Invalid Email or Password !", Toast.LONG);
                setLoading(false);
            }
        }else {
            alert(JSON.stringify(response))
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }
    return(
        <SafeAreaView style={{flex:1}}>
            {data?null:
                <Loader animating={isloading}/>}
            <Text style={{textAlign:"center",fontWeight:"bold"}}>Purchase Request</Text>
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
            <Dialogs visible={visible} onPress={()=>{setVisible(false)}} title={"Description"}>
                <DoubleText text1={"Request Type"} text2={ids.submission_type?ids.submission_type:"Not Available"}/>
                {/*<DoubleText text1={"Package Name"} text2={ids.package.title?ids.package.title:"Not Available"}/>*/}
                <DoubleText text1={"User Notes"} text2={ids.user_details?ids.user_details:"Not Available"}/>
                <DoubleText text1={"Admin Notes"} text2={ids.admin_feedback?ids.admin_feedback:"Not Available"}/>
                <DoubleText text1={"Status"} text2={ids.status?ids.status==="pending"?
                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                        <Text>{ids.status}</Text>
                        <TouchableOpacity onPress={()=>{Cancel()}} style={{backgroundColor:"#f84f4f",marginLeft:5}}>
                            <Text style={{color:Colors.white,textAlign:"center",padding:5}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    :ids.status:"Not Available"}/>
                <DoubleText text1={"Created Date"} text2={ids.created_at?ids.created_at.slice(0,10):"Not Available"}/>
                <DoubleText text1={""} text2={ids.created_at?ids.created_at.slice(11,19):""}/>
                <DoubleText text1={"Action Date"} text2={ids.updated_at?ids.updated_at.slice(0,10):"Not Available"}/>
                <DoubleText text1={""} text2={ids.updated_at?ids.updated_at.slice(11,19):""}/>
            </Dialogs>
        </SafeAreaView>
    )
}
export default PurchaseRequest;
