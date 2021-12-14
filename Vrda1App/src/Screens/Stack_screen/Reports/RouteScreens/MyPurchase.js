import React, {useEffect, useState} from "react";
import {FlatList, RefreshControl, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import Loader from "../../../../utilis/Loader";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import Dialogs from "../../../../utilis/Dialog";
import {getMyPurchase} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";

const MyPurchase = () => {
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
        let response = await getMyPurchase();
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
            // onPress={() => { setOpacity(item.closing_date); changeLayout() }}
            activeOpacity={0.8}
            onPress={()=>{setVisible(true),setIds(item)}}
            style={{backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,marginHorizontal:5,marginVertical:2}}>
            <View style={{flexDirection:"row"}}>
                <Text style={{ fontSize: 14, color: Colors.white }}>{index+1}. </Text>
                <View>
                    <Text style={{ fontSize: 14, color: Colors.white }}>Ref. Code ({item.code?item.code:null})</Text>
                    <Text style={{ fontSize: 14, color: Colors.white }}>Price ({item.package_price?item.package_price:"0"})</Text>
                </View>
            </View>
            <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Closing Date: {item.created_at?item.created_at:null}</Text>
        </TouchableOpacity>
    )
  return(
      <SafeAreaView style={{flex:1}}>
          {data?null:
              <Loader animating={isloading}/>}
          <Text style={{textAlign:"center",fontWeight:"bold"}}>My Purchase</Text>
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
              <DoubleText text1={"Ref.Code"} text2={ids.code?ids.code:null}/>
              <DoubleText text1={"Price"} text2={ids.package_price?"$"+ids.package_price:"0"}/>
              <DoubleText text1={"Business Volume"} text2={ids.package_business_volume?ids.package_business_volume:"0"}/>
              <DoubleText text1={"VREIT Points"} text2={ids.tokens_assigned?ids.tokens_assigned:"0"}/>
              <DoubleText text1={"VREIT Bonus"} text2={ids.extra_tokens_assigned?ids.extra_tokens_assigned:"0"}/>
              <DoubleText text1={"VREIT Point Price"} text2={ids.per_token_price?ids.per_token_price:"0"}/>
              <DoubleText text1={"Package"} text2={ids.package_name?ids.package_name:null}/>
              <DoubleText text1={"Date"} text2={ids.created_at?ids.created_at.slice(0,10):null}/>
              <DoubleText text1={""} text2={ids.created_at?ids.created_at.slice(11,19):null}/>
          </Dialogs>
      </SafeAreaView>
  )
}
export default MyPurchase;
