import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, Picker, RefreshControl, ScrollView} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import {Btn} from "../../../../utilis/Btn";
import DoubleText from "../../../../utilis/DoubleText";
import {FormInput} from "../../../../utilis/Text_input";
import CheckBox from "../../../../utilis/Checkbox";
import {gettransferfunds} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../../utilis/Loader";
import Dropdown from "../../../../utilis/Picker/Picker";

const TransferFunds = () => {
    const [detail,setDetail]=useState("");
    const [isloading,setLoading]=useState(false);
    const [errors,setErrors]=useState("");
    const [amount,setAmount]=useState("");
    const [index, setIndex] = useState(0);
    const [apiData,setApiData]=useState("");
    const [refreshing,setRefreshing]=useState(false)
    const [checked,setChecked]=useState(false);
    const [available,setAvailable]=useState("");
    const [selectedValue, setSelectedValue] = useState("Please Select");
    const buttons = [{name: 'Wallet', id: 0}, {name: 'Process Withdraw', id: 1},]

    useEffect(async ()=>{
        await getData();
    },[]);

    const getData=async ()=>{
        setLoading(true)
        let response = await gettransferfunds();
        if (response !== "Error") {
            if (response.data.status === true) {
                setApiData(response.data.data);
                setAvailable(response.data.data.available)
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

    const numberArray = ["1","2","3","4"];
    // useEffect(async () => {
    //     await getData(index)
    // }, [])
    // const getData = async (type) => {
    //     alert("hello")
    // }
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
            <Text style={{textAlign:"center",fontSize:18,fontWeight:"bold",textDecorationLine:"underline",color:Colors.secondary,margin:10}}>Transfer Funds</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 15, }}>
                {buttons.map((item, indexs) => (
                    <Btn onPress={() => { setIndex(indexs);
                        // getData(indexs)
                    }} containerStyle={{ backgroundColor: index == indexs ? Colors.primary : Colors.white, paddingVertical: 10, paddingHorizontal: 10, flex: 1, borderRadius: 5, marginLeft: 3, borderWidth: 1, borderColor:Colors.primary }} text= {item.name} text_style={{color:index == indexs?Colors.white:Colors.primary}} />
                ))}
            </View>
            {index == 0?
                <View style={{marginVertical:20,justifyContent:"space-evenly"}}>
                    <DoubleText text1={"Earning (+)"} text2={"$"+parseFloat(available.earning).toFixed(2)} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)"}}/>
                    <DoubleText text1={"Transfer (-)"} text2={"$"+parseFloat(available.sent).toFixed(2)} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6}}/>
                    <DoubleText text1={"Received (+)"} text2={"$"+parseFloat(available.receieved).toFixed(2)} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)"}}/>
                    <DoubleText text1={"Pin Purchased (-)"} text2={"$"+parseFloat(available.spent).toFixed(2)} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6}}/>
                    <DoubleText text1={"Withdraw (-)"} text2={"$"+parseFloat(available.withdraw).toFixed(2)} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)",}}/>
                    <DoubleText text1={"Vreit (+)"} text2={"$"+parseFloat(available.vreit).toFixed(2)} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6}}/>
                    <DoubleText text1={"Available (=)"} text2={"$"+parseFloat(available.available).toFixed(2)} textstyle={{textAlign:"center",color:Colors.white}} textstyle1={{color:Colors.white}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgb(51,51,51)",}}/>
                </View>
                :
                <View style={{margin:20}}>
                    <Text style={{fontWeight:"bold"}}>Proceed With</Text>
                    <View style={{borderBottomWidth:1,borderColor:Colors.secondary}}>
                        <Dropdown onValueChange={(text)=>{setSelectedValue(text)}} PickerData={apiData.childs}/>

                        {/*<Picker*/}
                        {/*    mode={"dropdown"}*/}
                        {/*    selectedValue={selectedValue}*/}
                        {/*    style={{ height: 50, width:"100%"}}*/}
                        {/*    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>*/}
                        {/*    {numberArray.length > 0 ? numberArray.map(item =><Picker.Item label={item} value={item} /> ):''}*/}
                        {/*    <Picker.Item label="Please Select" value={"Please Select"} testID={"4"} color={"rgba(152,148,148,0.63)"} />*/}
                        {/*</Picker>*/}
                    </View>
                    <FormInput
                        containerStyle={{marginTop:5}}
                        placeholder={"In Amount 100 ..."}
                        placeholderTextColor={Colors.secondary}
                        iconName_s="user"
                        icon_color={Colors.secondary}
                        value={amount}
                        color={Colors.primary}
                        onChangeText={(text) => { setErrors(""), setAmount(text) }}
                        error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                    />
                    {/*<Text>{selectedValue}</Text>*/}
                    <Text style={{padding:10,fontWeight:"bold",color:Colors.secondary}}>Withdraw Details:</Text>
                    <FormInput
                        value={detail}
                        onChangeText={(text) => { setErrors(""), setDetail(text) }}
                        error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                    />
                    <CheckBox
                        style={{margin:10}}
                        textStyle={{fontWeight:"bold"}}
                        size={20}
                        selected={checked}
                        onPress={() => setChecked(!checked)}
                        text={"Terms of condition"}/>
                    <Btn text_style={{color:Colors.white}} text={"Process Transfer"} containerStyle={{width:160,borderRadius:20,padding:10,backgroundColor:Colors.primary,alignSelf:"center",bottom:20,marginTop:40,}}/>
                </View>
            }
            </ScrollView>
        </SafeAreaView>
    )
}
export default TransferFunds;
