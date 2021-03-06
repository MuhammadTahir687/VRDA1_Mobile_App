import React, { useEffect, useState } from "react";
import {View, Text, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import CountDown from "react-native-countdown-component";
import Colors from "../../../Style_Sheet/Colors";
import Dialog from "react-native-dialog";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DoubleText from "../../../utilis/DoubleText";
import { getcommissionlogs } from "../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../utilis/Loader";
import Dialogs from "../../../utilis/Dialog";

const Commission_Logs=({navigation})=>{
    const [visible, setVisible] = useState(false);
    const [isloading,setLoading]=useState(false);
    const [data,setData]=useState("");
    const [ids,setIds]=useState(0);
    const [time,setTime]=useState(0);
    const [showTime, setShowTime] = useState(false)
    // useEffect(() => {
    //   let chic = []
    //   for (const value of Object.values(data.data.logs)) {
    //     chic.push(value)
    //   }
    //   setdata(chic)
    // },[])
    useEffect(async ()=>{
        await getData();
    },[]);

    const getData=async ()=>{
        setLoading(true)
        setShowTime(false)
        let response = await getcommissionlogs();
        if (response !== "Error") {
            let a=18000;
            let b=response.data.next_second;
            let c=parseFloat(b) - parseFloat(a);
            if (response.data.status === true && response.data.email_status==true) {
                let chic = []
                for (const value of Object.values(response.data.logs)) {
                    chic.push(value)
                }
                setData(chic)
                setTime(c);
                setLoading(false);
                setShowTime(true)
            }
            else if(response.data.status == true && response.data.email_status==false){
                const data=response.data.user;
                navigation.reset({index: 0,routes: [{ name: "Bad Email",params:{data} }]});
                setLoading(false)
            }
            else {
                Toast.show("Something Went Wrong !", Toast.LONG);
                setLoading(false);
            }
        }else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }

    const renderItem=({item,index})=>(
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>{setVisible(true),setIds(item)}}
            style={{backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,marginHorizontal:5,marginVertical:2}}>
            <View style={{flexDirection:"row"}}>
                <Text style={{ fontSize: 14, color: Colors.white }}>{index+1}. </Text>
                <Text style={{ fontSize: 14, color: Colors.white }}>Transactions ({item.transactions})</Text>
            </View>
            {/* <Text style={{ fontSize: 14, color: Colors.white }}>Total ({item.interval})</Text> */}
            {/*<Text style={{ fontSize: 14, color: Colors.white }}>Status ({item.id}%)</Text>*/}
            <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}> Closing Date: {item.closing_date}</Text>
        </TouchableOpacity>
    )
    return(
        <SafeAreaView style={{flex:1}}>
            <Loader animating={isloading}/>
            <Text style={{textAlign:"center",fontWeight:"bold"}}>Next Commissions</Text>
            {showTime &&
            <CountDown
                until={time}
                // onFinish={() => alert('finished')}
                // onPress={() => alert('hello')}
                size={22}
            />
            }
            <FlatList
                data={data}
                renderItem={renderItem}
                style={{ flex: 1, }}
                contentContainerStyle={{ marginVertical: 20,paddingBottom:20, }}
            />
            <Dialogs visible={visible} onPress={()=>{setVisible(false)}} title={"Description"}>
                {/* <DoubleText text1={"Transactions"} text2={ids.transactions?ids.transactions:"0.00"}/>
                <DoubleText text1={"Total"} text2={ids.total?parseFloat(ids.total).toFixed(2):"0.00"}/> */}
                <DoubleText text1={"70%"} text2={ids.percent_70?parseFloat(ids.percent_70).toFixed(2):"0.00"}/>
                <DoubleText text1={"30%"} text2={ids.percent_30?parseFloat(ids.percent_30).toFixed(2):"0.00"}/>
                <DoubleText text1={"Interval"} text2={ids.interval?parseFloat(ids.interval).toFixed(2):"0.00"}/>
                <DoubleText text1={"Closing Date"} text2={ids.closing_date?ids.closing_date.slice(0,10):"0.00"}/>
                <DoubleText text1={""} text2={ids.closing_date?ids.closing_date.slice(11,19):null}/>
                {/*    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start',margin:3,paddingHorizontal:17.5}}>*/}
                {/*        <Text style={{ width: '50%',fontWeight:"bold"}}>Status</Text>*/}
                {/*        <Progress.Bar width={deviceWidth / 3.6} progress={0.1} color={Colors.primary} backgroundColor={Colors.secondary} borderColor={Colors.secondary} marginVertical={5}/>*/}
                {/*        <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: 12}}> 37%</Text>*/}
                {/*    </View>*/}
                {/*<Dialog.Description>Do you want to delete this account? You cannot undo this action.</Dialog.Description>*/}
            </Dialogs>
        </SafeAreaView>
    )
}
export default Commission_Logs;
