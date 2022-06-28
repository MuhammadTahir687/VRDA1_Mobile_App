import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, ScrollView, RefreshControl} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import {FormInput} from "../../../../utilis/Text_input";
import {Btn} from "../../../../utilis/Btn";
import {getVreitWithdrawl, sendVreitWithdrawl} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import DoubleText from "../../../../utilis/DoubleText";
import {VreitWithdrawlValidation} from "../../../../utilis/validation";
import Loader from "../../../../utilis/Loader";

const Vreit_withdrawal = () => {
    const [detail,setDetail]=useState("");
    const [isloading,setLoading]=useState(false);
    const [errors,setErrors]=useState("");
    const [amount,setAmount]=useState("");
    const [userDetail, setUserDetail] = useState("");
    const [apiData,setApiData]=useState("");
    const [refreshing,setRefreshing]=useState(false);
    const [transactiontype,setTransactiontype]=useState("");

    useEffect(async ()=>{ await getData(); },[]);

    const getData=async ()=>{
        setLoading(true)
        let response = await getVreitWithdrawl();
        if (response !== "Error") {
            if (response.data.status === true) {
                console.log("vret amount",response.data.remain.vreit_withdrawal_amount)
                setApiData(response.data.remain);
                setUserDetail(response.data.data.user)
                setRefreshing(!refreshing)
                setLoading(false);
            }
           else if (response.data.status == true && response.data.transaction_password == false) {
                navigation.navigate("SetTransactionPassword",{screen:"Withdrawal"})
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
        await getData();
    }
    const Submit = async () => {
        let validate = VreitWithdrawlValidation(amount,apiData.vreit_withdrawal_amount)
        if (validate.valid === false) {
            setErrors(validate.errors)
        } else {
            setErrors("")

            const withdrawal = apiData.withdrawal.amount;
            const seeded = apiData.seeded.amount;
            const merge = apiData.vreit_withdrawal_amount;


            console.log("WITHDRAWL = ",withdrawal,"seeded=",seeded,"merge",merge)


            if (parseFloat(withdrawal) > 0 && parseFloat(amount) > parseFloat(withdrawal)) {
                setTransactiontype("merge")
                console.log('merge');
            } else if(parseFloat(amount) <= parseFloat(withdrawal)) {
                setTransactiontype("withdrawal")
                 console.log('withdrawal');
            } else if(parseFloat(amount) <= parseFloat(seeded)) {
                setTransactiontype("seeded")
                console.log('seeded');
            } else {
                console.log('none');
            }
            let body = { amount: amount, details: detail, swapped_type:transactiontype,withdrawal:withdrawal,seeded:seeded,merge:merge };
            console.log("Body=====",body)
            navigation.navigate('TransactionPassword',{data:body,screen:"VreitWithdrawl"})
            // setLoading(true)
            // var response = await sendVreitWithdrawl(body)
            // if (response !== "Error") {
            //     if (response.data.status == true) {
            //         Toast.show(response.data.message, Toast.LONG);
            //         setLoading(false);
            //         await setAmount("");
            //         await setDetail("");
            //     }else {
            //         Toast.show(response.data.message, Toast.LONG);
            //         setLoading(false);
            //     }
            // }else {
            //     Toast.show("Network Error: There is something wrong!", Toast.LONG);
            //     setLoading(false);
            // }
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <Loader animating={isloading}/>
            <Text style={{textAlign:"center",fontSize:18,fontWeight:"bold",textDecorationLine:"underline",color:Colors.secondary,margin:10}}>VREIT Points Withdrawal</Text>
            <ScrollView style={{flex: 1, paddingVertical: 10}}>
                <View refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh}/>}>
                    <View style={{margin: 15}}>
                        <View style={{flex: 1, backgroundColor: Colors.white, borderRadius: 10, elevation: 10, borderWidth: 1, paddingVertical: 5}}>
                            <DoubleText text1={"Total Vreit Points:"} text2={apiData.vreit_withdrawal_points ? parseFloat(apiData.vreit_withdrawal_points).toFixed(2) : "0"}/>
                            <DoubleText text1={"Total Vreit Amount:"} text2={apiData.vreit_withdrawal_amount ? "$" + parseFloat(apiData.vreit_withdrawal_amount).toFixed(2) : '0'}/>
                        </View>
                        { apiData.vreit_withdrawal_points === 0 ?
                            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"red",marginTop:"50%",padding:10,borderRadius:8}}>
                                <Text style={{color:Colors.white,textAlign:"center"}}>You must shift the VREIT points first in Vreit Wallet.</Text>
                            </View>
                            :<View style={{flex: 1, backgroundColor: "#d4d0d0", marginVertical: 10, borderRadius: 5}}>
                                <Text style={{backgroundColor: "black", color: "white", paddingLeft: 10, paddingVertical: 10, fontWeight: "bold", borderTopLeftRadius: 5, borderTopRightRadius: 5}}>Swap into Fieat Currency</Text>
                                <View style={{flex: 1, marginVertical: 10, borderWidth: 1, borderColor: "black", borderRadius: 5, marginHorizontal: 10}}>
                                    <Text style={{flex: 1, backgroundColor: Colors.secondary, color: "white", paddingLeft: 10, fontWeight: "bold", paddingVertical: 5}}>Holder Name</Text>
                                    <Text style={{flex: 1, backgroundColor: "transparent", color: "black", paddingLeft: 10, fontWeight: "bold", paddingVertical: 5}}>{userDetail.name ? userDetail.name : null}</Text>
                                </View>
                                <View style={{flex: 1, margin: 10, borderWidth: 1, borderColor: Colors.primary, borderRadius: 5, padding: 5}}>
                                    <FormInput
                                        containerStyle={{backgroundColor: "white", margin: 2, borderRadius: 5}}
                                        placeholder="Enter Ammount for Transfer"
                                        keyboardType={"numeric"}
                                        value={amount}
                                        onChangeText={(text) => {setAmount(text), setErrors("")}}
                                    />
                                    <Text style={{color: "red", fontSize: 12, marginHorizontal: 5}}>{errors === "Please Enter Amount" ? "Please Enter Amount" : null || errors === "Amount Exceeded" ? "Amount Exceeded" : null}</Text>
                                    <FormInput
                                        containerStyle={{backgroundColor: "white", margin: 2, borderRadius: 5,}}
                                        placeholder="Notes"
                                        multiline={true}
                                        numberOfLines={3}
                                        valuw={detail}
                                        onChangeText={(text) => {setDetail(text), setErrors('')}}
                                    />
                                    <Text style={{color: "red", fontWeight: "bold", borderRadius: 5, padding: 8, margin: 2}}>2% swap charges will be applicable.</Text>
                                    <Btn onPress={() => {Submit()}} containerStyle={{flex: 1, backgroundColor: "black", borderRadius: 5, marginHorizontal: 6}} text_style={{color: "white", paddingVertical: 10, fontWeight: "bold"}} text={"Transfer To Web Wallet"}/>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Vreit_withdrawal;
