import React, { useEffect, useState } from "react";
import {View, Text, FlatList, SafeAreaView, TouchableOpacity, Dimensions,LayoutAnimation} from "react-native";
import CountDown from "react-native-countdown-component";
import Colors from "../../../Style_Sheet/Colors";
import Dialog from "react-native-dialog";
import * as Progress from 'react-native-progress';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DoubleText from "../../../utilis/DoubleText";
import { getcommissionlogs } from "../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const Commission_Logs=()=>{
    const [visible, setVisible] = useState(false);
  const [isloading,setLoading]=useState(false);
  const [data,setData]=useState("");
  const [opacity, setOpacity] = useState("");
  const [expand, setExpand] = useState(false);
  const [ids,setIds]=useState(0);
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
    let response = await getcommissionlogs();
    if (response !== "Error") {
      if (response.data.status === true) {
        let chic = []
          for (const value of Object.values(response.data.data.logs)) {
            chic.push(value)
          }
          setData(chic)
        // var res=response.data.data;
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
  let changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpand(!expand);
  };
    const renderItem=({item})=>(
        <TouchableOpacity
          // onPress={() => { setOpacity(item.closing_date); changeLayout() }}
          activeOpacity={0.8}
          onPress={()=>{setVisible(true),setIds(item)}}
          style={{backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,borderBottomRightRadius: item.id === opacity && expand ? 0 : 17, borderBottomLeftRadius: item.id === opacity && expand ? 0 : 17, }}>
                <Text style={{ fontSize: 14, color: Colors.white }}>Transactions ({item.transactions})</Text>
            {/*<Text style={{ fontSize: 14, color: Colors.white }}>Total ({item.id})</Text>*/}
            {/*<Text style={{ fontSize: 14, color: Colors.white }}>Status ({item.id}%)</Text>*/}
            <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Closing Date: {item.closing_date}</Text>
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
                data={data}
                renderItem={renderItem}
                style={{ flex: 1, }}
                contentContainerStyle={{ marginVertical: 20,paddingBottom:20 }}
            />
          <Dialog.Container visible={visible}>
            <View style={{flexDirection:"row",justifyContent:"space-between",marginHorizontal:12}}>
            <TouchableOpacity style={{backgroundColor: Colors.primary,borderRadius: 25,flexDirection:"row",padding:7,justifyContent:"center",width:70, }}>
                <EvilIcons color={Colors.white}  size={22} name={"user"}/>
                <Text style={{color:Colors.white,fontSize:12}}>user {ids.transactions}</Text>
            </TouchableOpacity>
                <AntDesign color={Colors.primary}  size={20} name={"closecircle"} onPress={()=>{setVisible(false)}}/>
            </View>
            <DoubleText text1={"Transactions"} text2={ids.transactions}/>
            <DoubleText text1={"Total"} text2={ids.total}/>
            <DoubleText text1={"70%"} text2={ids}/>
            {/*<DoubleText text1={"30% ("+item.id+")"} text2={"7"}/>*/}
            {/*<DoubleText text1={"Closing Date"} text2={"7"}/>*/}
            {/*    <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start',margin:3,paddingHorizontal:17.5}}>*/}
            {/*        <Text style={{ width: '50%',fontWeight:"bold"}}>Status</Text>*/}
            {/*        <Progress.Bar width={deviceWidth / 3.6} progress={0.1} color={Colors.primary} backgroundColor={Colors.secondary} borderColor={Colors.secondary} marginVertical={5}/>*/}
            {/*        <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: 12}}> 37%</Text>*/}
            {/*    </View>*/}
            {/*<Dialog.Description>Do you want to delete this account? You cannot undo this action.</Dialog.Description>*/}
            {/*<Dialog.Button label="Cancel" onPress={()=>{setVisible(false)}} />*/}
          </Dialog.Container>
        </SafeAreaView>
    )
}
export default Commission_Logs;
