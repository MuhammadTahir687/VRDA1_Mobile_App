import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, ScrollView, RefreshControl} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import Dropdown from "../../../../utilis/Picker/Picker";
import {FormInput} from "../../../../utilis/Text_input";
import {Btn} from "../../../../utilis/Btn";
import {getVreitWithdrawl, sendVreitWithdrawl} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import DoubleText from "../../../../utilis/DoubleText";
import {VreitWithdrawlValidation} from "../../../../utilis/validation";
import Loader from "../../../../utilis/Loader";

const Vreit_withdrawal = () => {
    const Item = [{ label: 'Vreit Amount', value: 'vreit_amount' },{ label: 'Vreit Points', value: 'vreit_points' }]
    const [selectedValue, setSelectedValue] = useState("");
    const [detail,setDetail]=useState("");
    const [isloading,setLoading]=useState(false);
    const [errors,setErrors]=useState("");
    const [amount,setAmount]=useState("");
    const [userDetail, setUserDetail] = useState("");
    const [apiData,setApiData]=useState("");
    const [refreshing,setRefreshing]=useState(false)

    useEffect(async ()=>{ await getData(); },[]);

    const getData=async ()=>{
        setLoading(true)
        let response = await getVreitWithdrawl();
        if (response !== "Error") {
            if (response.data.status === true) {
                setApiData(response.data.data);
                setUserDetail(response.data.data.user)
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
    const Submit = async () => {
        let validate = VreitWithdrawlValidation(amount,apiData.vreit_amount)
        if (validate.valid === false) {
            setErrors(validate.errors)
        } else {
            setErrors("")
            let body = {user_id: userDetail.id,transfer_type:selectedValue,amount:amount,details:detail};
            // setLoading(true)
            var response = await sendVreitWithdrawl(body)
            if (response !== "Error") {
                if (response.data.status == true) {
                    Toast.show(response.data.message, Toast.LONG);
                    setLoading(false);
                    await setAmount("");
                    await setDetail("");
                }else {
                    Toast.show(response.data.message, Toast.LONG);
                    setLoading(false);
                }
            }else {
                Toast.show("Network Error: There is something wrong!", Toast.LONG);
                setLoading(false);
            }
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <Loader animating={isloading}/>
            <Text style={{textAlign:"center",fontSize:18,fontWeight:"bold",textDecorationLine:"underline",color:Colors.secondary,margin:10}}>VREIT Points Withdrawal</Text>
            <View style={{marginHorizontal:5}}>
                <Text style={{marginHorizontal:10,fontWeight:"bold",color:Colors.secondary}}>Vreit</Text>
                <View style={{borderBottomWidth:1,borderRadius:10,borderColor:Colors.secondary}}>
                    <Dropdown onValueChange={(text)=>{setSelectedValue(text)}} PickerData={Item}/>
                </View>
            </View>
                {selectedValue !== "vreit_points"?
                    <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
                        <View style={{margin:15}}>
                            <View style={{flex:1,flexDirection:"row",backgroundColor:Colors.white,borderRadius:10,elevation:10,borderWidth:1,paddingVertical:5}}>
                                <DoubleText text1={"Total Vreit Amount:"} text2={apiData.vreit_amount?"$"+parseFloat(apiData.vreit_amount).toFixed(2):null} textstyle={{textAlign:"center"}} textstyle1={{textAlign:"center"}}/>
                            </View>
                            <View style={{flex:1,backgroundColor:"#d4d0d0",marginVertical:10,borderRadius:5}}>
                                <Text style={{backgroundColor:"black",color:"white",paddingLeft:10,paddingVertical:10,fontWeight:"bold",borderTopLeftRadius:5,borderTopRightRadius:5}}>Swap into Fieat Currency</Text>
                                <View style={{flex:1,marginVertical:10,borderWidth:1,borderColor:"black",borderRadius:5,marginHorizontal:10}}>
                                    <Text style={{flex:1,backgroundColor:Colors.secondary,color:"white",paddingLeft:10,fontWeight:"bold",paddingVertical:5}}>Holder Name</Text>
                                    <Text style={{flex:1,backgroundColor:"transparent",color:"black",paddingLeft:10,fontWeight:"bold",paddingVertical:5}}>{userDetail.name?userDetail.name:null}</Text>
                                </View>
                                <View style={{flex:1,margin:10,borderWidth:1,borderColor:Colors.primary,borderRadius:5,padding:5}}>
                                    <FormInput
                                        containerStyle={{backgroundColor:"white",margin:2,borderRadius:5}}
                                        placeholder="Enter Ammount for Transfer"
                                        keyboardType={"numeric"}
                                        onChangeText={(text)=>{setAmount(text),setErrors("")}}
                                    />
                                    <Text style={{color:"red",fontSize:12,marginHorizontal:5}}>{errors === "Please Enter Amount" ? "Please Enter Amount" :null || errors === "Amount Exceeded"?"Amount Exceeded":null}</Text>
                                    <FormInput
                                        containerStyle={{backgroundColor:"white",margin:2,borderRadius:5,}}
                                        placeholder="Notes"
                                        multiline={true}
                                        numberOfLines={3}
                                        onChangeText={(text)=>{setDetail(text),setErrors('')}}
                                    />
                                    <Text style={{color:"red",fontWeight:"bold",borderRadius:5,padding:8,margin:2}}>2% swap charges will be applicable.</Text>
                                    <Btn onPress={()=>{Submit()}} containerStyle={{flex:1,backgroundColor:"black",borderRadius:5,marginHorizontal:6}} text_style={{color:"white",paddingVertical:10,fontWeight:"bold"}} text={"Transfer To Web Wallet"}/>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    :<View style={{margin:15,flex:1}}>
                        <View style={{flexDirection:"row",backgroundColor:Colors.white,borderRadius:10,elevation:10,borderWidth:1,padding:5}}>
                            <DoubleText text1={"Total Vreit Points:"} text2={apiData.vreit_points?"$"+parseFloat(apiData.vreit_points).toFixed(2):null} textstyle={{textAlign:"center"}} textstyle1={{textAlign:"center"}}/>
                        </View>
                        <View style={{justifyContent:"center",alignItems:"center",flex:1,}}>
                            <Text style={{color:Colors.lightgray,fontWeight:"bold",fontSize:25}}>Coming Soon</Text>
                        </View>
                    </View>
                }
        </SafeAreaView>
    )
}
export default Vreit_withdrawal;
