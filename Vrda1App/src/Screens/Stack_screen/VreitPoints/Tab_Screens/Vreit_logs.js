import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, ScrollView, TouchableOpacity, FlatList, RefreshControl} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DoubleText from "../../../../utilis/DoubleText";
import {getVreitLogs} from "../../../../utilis/Api/Api_controller";
import Loader from "../../../../utilis/Loader";
import Dialogs from "../../../../utilis/Dialog";

const Vreit_Logs = () => {
    const [visible, setVisible] = useState(false);
    const [isloading,setLoading]=useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [value,setValue]=useState(0);
    const [ids,setIds]=useState(0);
    const [btn, setBtn] = useState(0);
    const [apiRes,setApiRes]=useState([]);
    const Button = [{id: 1, title: "Shifted"}, {id: 2, title: "Swapped"}, {id: 3, title: "Wallet"}, {id: 4, title: "Purchased"}, {id: 5, title: "Transfer"}, {id: 6, title: "Recieved"},{id: 7, title: "Buy Vreits"}]

    useEffect(async () => { await getData(btn) }, []);

    const getData = async (type) => {
        var data;
        setLoading(true)
        type==0 ? data="shifted" : type==1 ? data="swapped" : type==2 ? data="wallet" : type==3 ? data="purchased" : type==4 ? data="transfer" : type==5 ? data="received" : type==6 ? data="buy_vreit" :null;
        let resp =await getVreitLogs(data)
        if (resp !== "Error") {
            if (type == 0){ setApiRes(resp.data.data.shifted);
            }else if (type == 1){ setApiRes(resp.data.data.swapped);
            }else if (type == 2){ setApiRes(resp.data.data.wallet);
            }else if (type == 3){ setApiRes(resp.data.data.purchased);
            }else if (type == 4){ setApiRes(resp.data.data.transfer);
            }else if (type == 5){ setApiRes(resp.data.data.received);
            }else if (type == 6){ setApiRes(resp.data.data.buy_vreit);
            }else { return null;
            }
            setRefreshing(!refreshing)
            await setLoading(false)
        } else {
            alert("Hold On: too many Hits")
            setLoading(false)
        }
    }

    const onRefresh = async () => { await getData(btn) }

    const renderItemShifted=({item})=>(
        <TouchableOpacity onPress={()=>{setVisible(true),setIds(item),setValue(0)}} style={{flexDirection:"row",backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,marginHorizontal:5,marginVertical:2}}>
            <Text style={{color:Colors.white,fontSize:14,paddingHorizontal:4}}>{item.sr}.</Text>
            <View>
                <Text style={{ fontSize: 14, color: Colors.white }}>Code ({item.code})</Text>
                <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Shifted At: {item.shifted_at}</Text>
            </View>
        </TouchableOpacity>
    )
    const renderItemSwapped=({item})=>(
        <TouchableOpacity onPress={()=>{setVisible(true),setIds(item),setValue(1)}} style={{flexDirection:"row",backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,marginHorizontal:5,marginVertical:2}}>
            <Text style={{color:Colors.white,fontSize:14,paddingHorizontal:4}}>{item.sr}.</Text>
            <View>
                <Text style={{ fontSize: 14, color: Colors.white }}>Code ({item.code})</Text>
                <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Swapped At: {item.swapped_at}</Text>
            </View>
         </TouchableOpacity>
    )
    const renderItemWallet=({item})=>(
        <TouchableOpacity onPress={()=>{setVisible(true),setIds(item),setValue(2)}} style={{flexDirection:"row",backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,marginHorizontal:5,marginVertical:2}}>
            <Text style={{color:Colors.white,fontSize:14,paddingHorizontal:4}}>{item.sr}.</Text>
            <View>
                <Text style={{ fontSize: 14, color: Colors.white }}>Code ({item.code})</Text>
                <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Shifted At: {item.shifted_at}</Text>
            </View>
        </TouchableOpacity>
    )
    const renderItemPurchased=({item})=>(
        <TouchableOpacity onPress={()=>{setVisible(true),setIds(item),setValue(3)}} style={{flexDirection:"row",backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,marginHorizontal:5,marginVertical:2}}>
            <Text style={{color:Colors.white,fontSize:14,paddingHorizontal:4}}>{item.sr}.</Text>
            <View>
                <Text style={{ fontSize: 14, color: Colors.white }}>Code ({item.code})</Text>
                <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Purchased At: {item.purchased_at}</Text>
            </View>
        </TouchableOpacity>
    )
    const renderItemTransfer=({item})=>(
        <TouchableOpacity onPress={()=>{setVisible(true),setIds(item),setValue(4)}} style={{flexDirection:"row",backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,marginHorizontal:5,marginVertical:2}}>
            <Text style={{color:Colors.white,fontSize:14,paddingHorizontal:4}}>{item.sr}.</Text>
            <View>
                <Text style={{ fontSize: 14, color: Colors.white }}>Code ({item.code})</Text>
                <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Transfer At: {item.transfer_at}</Text>
            </View>
        </TouchableOpacity>
    )
    const renderItemReceived=({item})=>(
        <TouchableOpacity onPress={()=>{setVisible(true),setIds(item),setValue(5)}} style={{flexDirection:"row",backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,marginHorizontal:5,marginVertical:2}}>
            <Text style={{color:Colors.white,fontSize:14,paddingHorizontal:4}}>{item.sr}.</Text>
            <View>
                <Text style={{ fontSize: 14, color: Colors.white }}>Code ({item.code})</Text>
                <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Received At: {item.received_at}</Text>
            </View>
        </TouchableOpacity>
    )
    const renderItemBuyVreit=({item})=>(
        <TouchableOpacity onPress={()=>{setVisible(true),setIds(item),setValue(6)}} style={{flexDirection:"row",backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,marginHorizontal:5,marginVertical:2}}>
            <Text style={{color:Colors.white,fontSize:14,paddingHorizontal:4}}>{item.sr}.</Text>
            <View>
                <Text style={{ fontSize: 14, color: Colors.white }}>Code ({item.code})</Text>
                <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Buy At: {item.buy_at}</Text>
            </View>
        </TouchableOpacity>
    )
    return (
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flexGrow:1}} horizontal={true}>
                <View style={{flex:1,flexDirection: "row",marginVertical:10,}}>
                    {Button.map((item, index) => (
                        <TouchableOpacity
                            key={index} onPress={() => { setBtn(index); getData(index); }}
                            style={{height: 30, borderWidth: 1, width: 80, alignItems: "center", justifyContent: "center", marginHorizontal: 5, borderRadius:5,backgroundColor:(index==btn)?"black":"white"}}>
                            <Text style={{color:index === btn?"white":"black"}}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
                <View style={{flex:100}}>
                    <Loader animating={isloading}/>
                    <FlatList data={apiRes} renderItem={btn == 0?renderItemShifted:btn ==1?renderItemSwapped:btn ==2?renderItemWallet:btn ==3?renderItemPurchased:btn ==4?renderItemTransfer:btn ==5?renderItemReceived:btn==6?renderItemBuyVreit:null} refreshControl={
                        <RefreshControl refreshing={false} onRefresh={onRefresh} />
                    }/>
                </View>
            <Dialogs visible={visible} onPress={()=>{setVisible(false)}} title={"Details"} description1={value==0?null:value==1?null:value==2?null:value==3?null:value==4?ids.feedback?ids.feedback:null:value==5?null:null} description={value==0?null:value==1?ids.details?ids.details:null:value==2?null:value==3?ids.details?ids.details:null:value==4?ids.details?ids.details:null:value==5?ids.details?ids.details:null:null}>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:12}}>
                    <TouchableOpacity style={{backgroundColor: Colors.primary,borderRadius: 25,flexDirection:"row",padding:7,justifyContent:"center",width:70, }}>
                        <EvilIcons color={Colors.white}  size={22} name={"user"}/>
                        {/*<Text style={{color:Colors.white,fontSize:12}}>user {ids.transactions?ids.transactions:null}</Text>*/}
                    </TouchableOpacity>
                    {/*<AntDesign color={Colors.primary}  size={20} name={"closecircle"} onPress={()=>{setVisible(false)}}/>*/}
                </View>
                {value == 0 ?
                    <View>
                        <DoubleText text1={"Code"} text2={ids.code?ids.code:null}/>
                        <DoubleText text1={"Quarter Date"} text2={ids.quarter_date?ids.quarter_date:null}/>
                        <DoubleText text1={"Points"} text2={ids.vreit_points?parseFloat(ids.vreit_points).toFixed(2):null}/>
                        <DoubleText text1={"Token Price"} text2={ids.vreit_price?"$"+parseFloat(ids.vreit_price).toFixed(4):null}/>
                        <DoubleText text1={"Est Amount"} text2={ids.vreit_amount?"$"+parseFloat(ids.vreit_amount).toFixed(2):null}/>
                        <DoubleText text1={"Shifted At"} text2={ids.shifted_at?ids.shifted_at.slice(0,10):null}/>
                        <DoubleText text1={""} text2={ids.shifted_at?ids.shifted_at.slice(11,19):null}/>
                    </View>
                    :value == 1 ?
                        <View>
                            <DoubleText text1={"Code"} text2={ids.code?ids.code:null}/>
                            <DoubleText text1={"Points"} text2={ids.vreit_points?parseFloat(ids.vreit_points).toFixed(2):null}/>
                            <DoubleText text1={"Token Price"} text2={ids.vreit_price?"$"+parseFloat(ids.vreit_price).toFixed(4):null}/>
                            <DoubleText text1={"Est Amount"} text2={ids.vreit_amount?"$"+parseFloat(ids.vreit_amount).toFixed(2):null}/>
                            <DoubleText text1={"Type"} text2={ids.type?ids.type:null}/>
                            <DoubleText text1={"Action By"} text2={ids.action_by_name?ids.action_by_name:null}/>
                            <DoubleText text1={"Feedback"} text2={ids.admin_feed?ids.admin_feed:null}/>
                            <DoubleText text1={"Swapped At"} text2={ids.swapped_at?ids.swapped_at.slice(0,10):null}/>
                            <DoubleText text1={""} text2={ids.swapped_at?ids.swapped_at.slice(11,19):null}/>
                        </View>
                        :value == 2 ? null:
                            value == 3 ?
                                <View>
                                    <DoubleText text1={"Code"} text2={ids.code?ids.code:null}/>
                                    <DoubleText text1={"Package"} text2={ids.package_name?ids.package_name:null}/>
                                    <DoubleText text1={"Points"} text2={ids.vreit_points?parseFloat(ids.vreit_points).toFixed(2):null}/>
                                    <DoubleText text1={"Token Price"} text2={ids.vreit_price?"$"+parseFloat(ids.vreit_price).toFixed(4):null}/>
                                    <DoubleText text1={"Est Amount"} text2={ids.vreit_amount?"$"+parseFloat(ids.vreit_amount).toFixed(2):null}/>
                                    <DoubleText text1={"Status"} text2={ids.status?ids.status+" ("+ids.purchase_via.slice(4)+")":null}/>
                                    <DoubleText text1={"Purchased At"} text2={ids.purchased_at?ids.purchased_at.slice(0,10):null}/>
                                    <DoubleText text1={""} text2={ids.purchased_at?ids.purchased_at.slice(11,19):null}/>
                                </View>
                                :value == 4 ?
                                    <View>
                                        <DoubleText text1={"Receiver"} text2={ids.c2c_receiver?ids.c2c_receiver:null}/>
                                        <DoubleText text1={"Code"} text2={ids.code?ids.code:null}/>
                                        <DoubleText text1={"Points"} text2={ids.vreit_points?parseFloat(ids.vreit_points).toFixed(2):null}/>
                                        <DoubleText text1={"Token Price"} text2={ids.vreit_price?"$"+parseFloat(ids.vreit_price).toFixed(4):null}/>
                                        <DoubleText text1={"Est Amount"} text2={ids.vreit_amount?"$"+parseFloat(ids.vreit_amount).toFixed(2):null}/>
                                        <DoubleText text1={"Status"} text2={ids.status?ids.status+" ("+ids.transfer_via.slice(4)+")":null}/>
                                        <DoubleText text1={"Transfer At"} text2={ids.transfer_at?ids.transfer_at.slice(0,10):null}/>
                                        <DoubleText text1={""} text2={ids.transfer_at?ids.transfer_at.slice(11,19):null}/>
                                    </View>
                                    :value == 5 ?
                                        <View>
                                            <DoubleText text1={"Sender"} text2={ids.user_name?ids.user_name:null}/>
                                            <DoubleText text1={"Code"} text2={ids.code?ids.code:null}/>
                                            <DoubleText text1={"Points"} text2={ids.vreit_points?parseFloat(ids.vreit_points).toFixed(2):null}/>
                                            <DoubleText text1={"Token Price"} text2={ids.vreit_price?"$"+parseFloat(ids.vreit_price).toFixed(4):null}/>
                                            <DoubleText text1={"Est Amount"} text2={ids.vreit_amount?"$"+parseFloat(ids.vreit_amount).toFixed(2):null}/>
                                            <DoubleText text1={"Received At"} text2={ids.received_at?ids.received_at.slice(0,10):null}/>
                                            <DoubleText text1={""} text2={ids.received_at?ids.received_at.slice(11,19):null}/>
                                        </View>
                                       : value == 6 ?
                                        <View>
                                            <DoubleText text1={"Type"} text2={ids.type?ids.type:null}/>
                                            <DoubleText text1={"Code"} text2={ids.code?ids.code:null}/>
                                            <DoubleText text1={"Points"} text2={ids.vreit_points?parseFloat(ids.vreit_points).toFixed(2):null}/>
                                            <DoubleText text1={"Rate"} text2={ids.vreit_rate?"$"+parseFloat(ids.vreit_rate).toFixed(4):null}/>
                                            <DoubleText text1={"Amount"} text2={ids.vreit_amount?"$"+parseFloat(ids.vreit_amount).toFixed(2):null}/>
                                            <DoubleText text1={"Status"} text2={ids.status?ids.status:null} textstyle={{color:ids.status=="rejected"?"red":ids.status=="accepted"?"green":ds.status=="pending"?"Purple":"black",textTransform:"capitalize"}}/>
                                            <DoubleText text1={"Detail"} text2={ids.description?ids.description:null}/>
                                            <DoubleText text1={"Feedback"} text2={ids.admin_feed?ids.admin_feed:null}/>
                                            <DoubleText text1={"Buy At"} text2={ids.buy_at?ids.buy_at.slice(0,10):null}/>
                                            <DoubleText text1={""} text2={ids.buy_at?ids.buy_at.slice(11,19):null}/>
                                        </View>
                                        :null
                }
                </Dialogs>
        </SafeAreaView>
    )
}
export default Vreit_Logs;
