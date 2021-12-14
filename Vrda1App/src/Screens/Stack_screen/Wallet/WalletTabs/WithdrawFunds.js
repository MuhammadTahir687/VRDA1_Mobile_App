import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, ScrollView, RefreshControl} from "react-native";
import {Btn} from "../../../../utilis/Btn";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import {FormInput} from "../../../../utilis/Text_input";
import CheckBox from "../../../../utilis/Checkbox";
import {getwithdrawfunds, sendProcessWithdraw, sendWithdrawFunds_Charges} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../../utilis/Loader";
import Dropdown from "../../../../utilis/Picker/Picker";
import {processWithdrawValidation} from "../../../../utilis/validation";

const WithdrawFunds=({navigation})=>{
    const [detail,setDetail]=useState("");
    const [isloading,setLoading]=useState(false);
    const [errors,setErrors]=useState("");
    const [amount,setAmount]=useState("");
    const [index, setIndex] = useState(0);
    const [apiData,setApiData]=useState("");
    const [refreshing,setRefreshing]=useState(false)
    const [checked,setChecked]=useState(false);
    const [serviceCharges,setServiceCharges]=useState("5");
    const [selectedValue, setSelectedValue] = useState("");
    const buttons = [{name: 'Wallet', id: 0}, {name: 'Process Withdraw', id: 1},]
    const Item = [{ label: 'Bank', value: 'bank' },{ label: 'USDT', value: 'usdt' },{ label: 'BTC', value: 'btc' }]

    useEffect(async ()=>{
        await getData();
    },[]);

    const getData=async ()=>{
        setLoading(true)
        let response = await getwithdrawfunds();
        if (response !== "Error") {
            if (response.data.status === true) {
            setApiData(response.data.data);
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
    const gettingDetails=async ({text})=>{
        setLoading(true)
        let body = {payment_type: text,};
        let response = await sendWithdrawFunds_Charges(body);
        if (response !== "Error") {
            setServiceCharges(response.data.percentage);
            setLoading(false);
        }else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }

    const onRefresh = async () => {
        await getData();
    }
    const Submit = async () => {
        let validate = processWithdrawValidation(amount,selectedValue,detail)
        if (validate.valid === false) {
            setErrors(validate.errors)
        } else {
            setErrors("")
            let body = {payment_type: selectedValue, amount: amount,details: detail,user_id:apiData.user_id};
            setLoading(true)
            let response = await sendProcessWithdraw(body)
            if (response !== "Error") {
                if (response.data.status == true) {
                    Toast.show(response.data.message, Toast.LONG);
                    await setLoading(false);
                    await setDetail("");
                    await setAmount("");
                    await setChecked(false);
                    await onRefresh();
                }else if(response.data.status == false)      {
                    Toast.show("Request "+response.data.data, Toast.LONG);
                    setLoading(false);
                }
                else {
                    Toast.show("Something Went Wrong ", Toast.LONG);
                    setLoading(false);
                }
            }else {
                Toast.show("Network Error: There is something wrong!", Toast.LONG);
                setLoading(false);
            }
        }
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <Loader animating={isloading}/>
            <ScrollView refreshControl={ <RefreshControl refreshing={false} onRefresh={onRefresh} /> } >
            <Text style={{textAlign:"center",fontSize:18,fontWeight:"bold",textDecorationLine:"underline",color:Colors.secondary,margin:10}}>Withdraw Funds</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 15, }}>
                {buttons.map((item, indexs) => (
                    <Btn onPress={() => { setIndex(indexs);
                        // getData(indexs)
                    }} containerStyle={{ backgroundColor: index == indexs ? Colors.primary : Colors.white, paddingVertical: 10, paddingHorizontal: 10, flex: 1, borderRadius: 5, marginLeft: 3, borderWidth: 1, borderColor:Colors.primary }} text= {item.name} text_style={{color:index == indexs?Colors.white:Colors.primary}} />
                ))}
            </View>
            {index == 0?
                <View style={{marginVertical:20,justifyContent:"space-evenly"}}>
                    <DoubleText text1={"Earning (+)"} text2={apiData.earning?"$"+parseFloat(apiData.earning).toFixed(2):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)"}}/>
                    <DoubleText text1={"Transfer (-)"} text2={apiData.sent?"$"+parseFloat(apiData.sent).toFixed(2):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6}}/>
                    <DoubleText text1={"Received (+)"} text2={apiData.receieved?"$"+parseFloat(apiData.receieved).toFixed(2):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)"}}/>
                    <DoubleText text1={"Pin Purchased (-)"} text2={apiData.spent?"$"+parseFloat(apiData.spent).toFixed(2):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6}}/>
                    <DoubleText text1={"Withdraw (-)"} text2={apiData.withdraw?"$"+parseFloat(apiData.withdraw).toFixed(2):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)"}}/>
                    <DoubleText text1={"Vreit (+)"} text2={apiData.vreit?"$"+parseFloat(apiData.vreit).toFixed(2):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6}}/>
                    <DoubleText text1={"Available (=)"} text2={apiData.available?"$"+parseFloat(apiData.available).toFixed(2):"$0"} textstyle1={{color:Colors.white}} textstyle={{textAlign:"center",color:Colors.white}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgb(51,51,51)",}}/>
                </View>
                :
                <View style={{margin:20}}>
                    <Text style={{fontWeight:"bold"}}>Process Withdraw</Text>
                    <FormInput
                        placeholder={selectedValue==="bank"?"Minimum Amount is 500":"Minimum Amount is 200"}
                        placeholderTextColor={"rgba(178,176,176,0.72)"}
                        value={amount}
                        color={Colors.primary}
                        keyboardType={'phone-pad'}
                        onChangeText={(text) => { setAmount(text),setErrors("") }}
                        error={errors === "Please Enter Amount" ? "Please Enter Amount" : errors === "Minimum Amount is 500" ? "Minimum Amount is 500": errors === "Maximum Amount is 5000" ? "Maximum Amount is 5000" :errors === "Minimum Amount is 200"?"Minimum Amount is 200": null}
                    />
                    <View style={{borderBottomWidth:1,borderColor:Colors.secondary}}>
                        <Dropdown onValueChange={(text)=>{gettingDetails({text}),setSelectedValue(text),setErrors("")}} PickerData={Item}/>
                    </View>
                    {errors === "Please Select Value" &&
                    <Text style={{ color: "red",fontSize:12 }}>{errors === "Please Select Value" ? "Please Select Value" : null}</Text>
                    }
                    <Text style={{padding:10,fontWeight:"bold",color:Colors.primary}}>Withdraw Details:</Text>
                    <FormInput
                        placeholder={"Withdraw Details"}
                        placeholderTextColor={"rgba(178,176,176,0.72)"}
                        value={detail}
                        onChangeText={(text) => { setErrors(""), setDetail(text) }}
                        error={errors === "Please Enter Details" ? "Please Enter Details" : null }
                    />
                    <View style={{backgroundColor:"rgba(255,0,0,0.21)",paddingHorizontal:20,paddingVertical:10,borderRadius:10,marginTop:10}}>
                        <Text style={{fontWeight:"500",color:"red"}}>{serviceCharges?serviceCharges:"5"}% service charges will be applicable</Text>
                        <Text style={{fontWeight:"500",color:"red"}}>7 working days required</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                    <CheckBox
                        style={{margin:10}}
                        textStyle={{fontWeight:"bold"}}
                        size={20}
                        selected={checked}
                        onPress={() => setChecked(!checked)}
                        text={"I accept"}/>
                        <Text onPress={()=>{setSelectedValue("");navigation.navigate("TermsAndCondition")}} style={{right:10,color:"#53a0b7",fontWeight:"bold",textDecorationLine:"underline",fontSize:12,alignSelf:"center"}}>Terms & Conditions</Text>
                    </View>
                    <Btn disabled={checked == true ? false : true}  onPress={()=>Submit()} text_style={{color:Colors.white}} text={"Process Withdraw"} containerStyle={{width:160,borderRadius:20,padding:10,backgroundColor:checked ===true?Colors.primary:Colors.secondary,alignSelf:"center",bottom:20,marginTop:40,}}/>
                </View>
            }
            </ScrollView>
        </SafeAreaView>
    )
}
export default WithdrawFunds;
