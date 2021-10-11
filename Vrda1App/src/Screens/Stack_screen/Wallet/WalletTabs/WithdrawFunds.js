import React, {useEffect, useState} from "react";
import {View, Text, SafeAreaView, ScrollView, RefreshControl} from "react-native";
import {Btn} from "../../../../utilis/Btn";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import {FormInput} from "../../../../utilis/Text_input";
import CheckBox from "../../../../utilis/Checkbox";
import {getwithdrawfunds,sendProcessWithdraw} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../../utilis/Loader";
import Dropdown from "../../../../utilis/Picker/Picker";
import {processWithdrawValidation} from "../../../../utilis/validation";

const WithdrawFunds=()=>{
    const [detail,setDetail]=useState("");
    const [isloading,setLoading]=useState(false);
    const [errors,setErrors]=useState("");
    const [amount,setAmount]=useState("");
    const [index, setIndex] = useState(0);
    const [apiData,setApiData]=useState("");
    const [refreshing,setRefreshing]=useState(false)
    const [checked,setChecked]=useState(false);
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
    const onRefresh = async () => {
        await getData();
    }
    const Submit = async () => {
        let validate = processWithdrawValidation(amount,selectedValue,detail)
        if (validate.valid === false) {
            setErrors(validate.errors)
        } else {
            setErrors("")
            let body = {payment_type: selectedValue, amount: amount,details: detail,user_id:"3"};
            setLoading(true)
            let response = await sendProcessWithdraw(body)
            if (response !== "Error") {
                if (response.data.status == true) {
                    alert("ddd")
                    setLoading(false);
                }else {
                    Toast.show(response.data.data, Toast.LONG);
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
            <ScrollView
                refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={onRefresh} />
            }
            >
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
                    <DoubleText text1={"Earning (+)"} text2={apiData.earning?"$"+parseFloat(apiData.earning).toFixed(1):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,padding:6}}/>
                    <DoubleText text1={"Transfer (-)"} text2={apiData.sent?"$"+parseFloat(apiData.sent).toFixed(1):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,backgroundColor:"rgba(152,148,148,0.63)",padding:6}}/>
                    <DoubleText text1={"Received (+)"} text2={apiData.receieved?"$"+parseFloat(apiData.receieved).toFixed(1):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,padding:6}}/>
                    <DoubleText text1={"Pin Purchased (-)"} text2={apiData.spent?"$"+parseFloat(apiData.spent).toFixed(1):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,backgroundColor:"rgba(152,148,148,0.63)",padding:6}}/>
                    <DoubleText text1={"Withdraw (-)"} text2={apiData.withdraw?"$"+parseFloat(apiData.withdraw).toFixed(1):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,padding:6}}/>
                    <DoubleText text1={"Vreit (+)"} text2={apiData.vreit?"$"+parseFloat(apiData.vreit).toFixed(1):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,backgroundColor:"rgba(152,148,148,0.63)",padding:6}}/>
                    <DoubleText text1={"Available (=)"} text2={apiData.available?"$"+parseFloat(apiData.available).toFixed(1):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,padding:6}}/>
                </View>
                :
                <View style={{margin:20}}>
                    <Text style={{fontWeight:"bold"}}>Process Withdraw</Text>
                    <FormInput
                        placeholder={"Minimum Amount is 500"}
                        placeholderTextColor={Colors.secondary}
                        value={amount}
                        color={Colors.primary}
                        keyboardType={'phone-pad'}
                        onChangeText={(text) => { setAmount(text),setErrors("") }}
                        error={errors === "Please Enter Amount" ? "Please Enter Amount" : errors === "Minimum Amount is 500" ? "Minimum Amount is 500":null}
                    />
                    <View style={{borderBottomWidth:1,borderColor:Colors.secondary}}>
                        <Dropdown onValueChange={(text)=>{setSelectedValue(text),setErrors("")}} PickerData={Item}/>
                    </View>
                    {errors === "Please Select Value" &&
                    <Text style={{ color: "red",fontSize:12 }}>{errors === "Please Select Value" ? "Please Select Value" : null}</Text>
                    }
                    <Text style={{padding:10,fontWeight:"bold",color:Colors.primary}}>Withdraw Details:</Text>
                    <FormInput
                        placeholder={"Withdraw Details"}
                        placeholderTextColor={Colors.secondary}
                        value={detail}
                        onChangeText={(text) => { setErrors(""), setDetail(text) }}
                        error={errors === "Please Enter Details" ? "Please Enter Details" : null }
                    />
                    <View style={{backgroundColor:"rgba(255,0,0,0.21)",paddingHorizontal:20,paddingVertical:10,borderRadius:10,marginTop:10}}>
                        <Text style={{fontWeight:"500",color:"red"}}>5% service charges will be applicable</Text>
                        <Text style={{fontWeight:"500",color:"red"}}>7 working days required</Text>
                    </View>
                    <CheckBox
                        style={{margin:10}}
                        textStyle={{fontWeight:"bold"}}
                        size={20}
                        selected={checked}
                        onPress={() => setChecked(!checked)}
                        text={"Terms of condition"}/>
                    <Btn disabled={checked == true ? false : true}  onPress={()=>Submit()} text_style={{color:Colors.white}} text={"Process Withdraw"} containerStyle={{width:160,borderRadius:20,padding:10,backgroundColor:checked ===true?Colors.primary:Colors.secondary,alignSelf:"center",bottom:20,marginTop:40,}}/>
                </View>
            }
            </ScrollView>
        </SafeAreaView>
    )
}
export default WithdrawFunds;
