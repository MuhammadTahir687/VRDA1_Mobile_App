import React, {useEffect, useState} from "react";
import {FlatList, RefreshControl, SafeAreaView, Text, ScrollView,TouchableOpacity, View} from "react-native";
import Loader from "../../../../utilis/Loader";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import Dialogs from "../../../../utilis/Dialog";
import {getMyPurchase} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";

const MyPurchase = ({navigation}) => {
    const [isloading,setLoading]=useState(false);
    const [visible,setVisible]=useState(false);
    const [refreshing,setRefreshing]=useState(false);
    const [data,setData]=useState("");
    const [ids,setIds]=useState("");
    const [btn, setBtn] = useState(0);

    const Button = [{id: 1, title: "Admin"}, {id: 2, title: "Package"}, {id: 3, title: "Wallet"}, {id: 4, title: "Vreit"}]


    useEffect(async ()=>{
        await getData(btn);
    },[])

    const getData=async (type)=>{
        var data;
        setLoading(true)
        type==0 ? data="admin_pins" : type==1 ? data="package_pins" : type==2 ? data="wallet_pins" : type==3 ? data="vreit_pins"  : null;

        let response = await getMyPurchase();
        if (response !== "Error") {
            if (response.data.status === true && response.data.email_status==true) {
                // setData(response.data.admin_pins);
                // setRefreshing(!refreshing)
                // setLoading(false);

                if (type == 0){ setData(response.data.admin_pins);
                }else if (type == 1){ setData(response.data.package_pins);
                }else if (type == 2){ setData(response.data.wallet_pins);
                }else if (type == 3){ setData(response.data.vreit_pins);
                }else { return null;
                }
                setRefreshing(!refreshing)
                await setLoading(false)
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
    const onRefresh = async () => {
        await getData(btn);
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
          <View>
          <ScrollView style={{flexGrow:1}} horizontal={true}>
                <View style={{flex:0.2,flexDirection: "row",marginVertical:10,}}>
                    {Button.map((item, index) => (
                        <TouchableOpacity
                            key={index} onPress={() => { setBtn(index); getData(index); }}
                            style={{height: 30, borderWidth: 1, width: 100, alignItems: "center", justifyContent: "center", marginHorizontal: 5, borderRadius:5,backgroundColor:(index==btn)?"black":"white"}}>
                            <Text style={{color:index === btn?"white":"black"}}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
          </View>
      
          <FlatList
              data={data}
              renderItem={renderItem}
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
