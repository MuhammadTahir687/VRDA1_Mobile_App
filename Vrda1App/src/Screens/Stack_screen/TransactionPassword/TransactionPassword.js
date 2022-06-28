import React, { useState, useEffect } from "react";
import { View, Text, TextInput, SafeAreaView, ScrollView, Linking } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from '../../../Style_Sheet/style';
import { FormInput } from "../../../utilis/Text_input";
import Notes from "../../../Zextra/Note";
import TPNotes from "../../../Zextra/TPNote";
import TNPNotes from "../../../Zextra/TNPNotes";
import Loader from "../../../utilis/Loader";
import { ForgotTransactionPassword,BuyDaMeta1Post,sendVreitWithdrawl,sendVreitShiftedBtn,sendVreitC2Csubmit,BuyVreitPost,LogTransaction,sendProcessWithdraw,sendProcessTransferBtn } from '../../../utilis/Api/Api_controller';
import { get_data } from "../../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";

const TransactionPassword = ({ navigation, route }) => {
    var data = route.params.data;
    var screen = route.params.screen;

    console.log("Data =======", data)

    const [view, setview] = useState(false);
    const [isloading, setLoading] = useState(false);
    const [showbtn, setShowbtn] = useState(false);
    const [linkedURL, setLinkedURL] = useState(null);
    const [password,setPassword]=useState("");
    const[newpassworderror,setNewpassworderror]=useState("");

    useEffect(() => {
        const getUrlAsync = async () => {
            const initialUrl = await Linking.getInitialURL();
            console.log("initial url ========",initialUrl)
            if(initialUrl !=null){
              const routeName = initialUrl.split('?');
              const token=initialUrl.split('/');
                console.log("Token",token)
              if(routeName[1] == "transaction")
              {
                  navigation.navigate('UpdateTransactionPassword',{data:token[4]})
              }
            }
            else{
            }
            setLinkedURL(decodeURI(initialUrl));
        };
        getUrlAsync();
    }, []);

    useEffect(() => {
        const callback = ({ url }) => { const routeName = url.split('?');const token=initialUrl.split('/');setLinkedURL(decodeURI(url)), navigation.navigate('UpdateTransactionPassword',{data:token[4]}),console.log("url",url)};
        Linking.addEventListener('url', callback);
        
        return () => {
            Linking.removeAllListeners('url', callback);
        };
    }, []);
    const resetURL = () => initialUrl=null;
      console.log(resetURL)



    const Proceed = async () => {

        if (password === "") {
            setNewpassworderror("Enter Password")
        }
        else {
            let body = { transaction_password: password }
            let response = await LogTransaction(body)
            if (response !== "Error") {
                if (response.data.status == true) {

                    // API Condition Handling Start
                    setLoading(true)
                    if (screen == 'dameta1') {
                        var resp = await BuyDaMeta1Post(data)
                    }
                    if (screen == 'BuyVreit') {
                        const body = new FormData();
                        body.append("payment_type", data.payment_type);
                        body.append("wallet_amount", data.wallet_amount);
                        { data.imageSourceData && body.append("receipt_file", { uri: data.receipt_file, name: "photo.jpg", type: `image/jpg`, }) }
                        body.append("vreit_points", data.vreit_points);
                        console.log("Body ==========", body)
                        var resp = await BuyVreitPost(body)
                    }
                    if(screen == "withdraw_funds"){
                        var resp = await sendProcessWithdraw(data)
                    }
                    if(screen == "transfer_funds"){
                        var resp = await sendProcessTransferBtn(data)
                    }
                    if(screen == "VreitWithdrawl"){
                        var resp = await sendVreitWithdrawl(data)
                    }
                    if(screen == "VreitTransferc2c"){
                        var resp = await sendVreitC2Csubmit(data)
                    }
                    if(screen == "ShiftVreit"){
                        var resp = await sendVreitShiftedBtn(data)
                    }

                    if (resp !== "Error") {
                        if (resp.data.status == true) {
                            console.log(resp.data)
                            Toast.show(resp.data.message, Toast.LONG);


                            setPassword("")
                            await setLoading(false);

                        } else if (resp.data.status == false) {
                            Toast.show(resp.data.message, Toast.LONG);
                            setLoading(false);
                        }
                        else {
                            Toast.show("Something Went Wrong ", Toast.LONG);
                            setLoading(false);
                        }
                    } else {
                        Toast.show("Network Error: There is something wrong!", Toast.LONG);
                        setLoading(false);
                    }

                    // API Condition Handling end

                } else if (response.data.status == false) {
                    Toast.show("Request " + response.data.message, Toast.LONG);
                    setLoading(false);
                }
                else {
                    Toast.show("Something Went Wrong ", Toast.LONG);
                    setLoading(false);
                }
            } else {
                Toast.show("Network Error: There is something wrong!", Toast.LONG);
                setLoading(false);
            }
        }

    }

    const Forgot_Transaction_Password = async () => {
        let User_DATA = await get_data("User_DATA")
        const body = { email: User_DATA.email };

        setLoading(true)
        let response = await ForgotTransactionPassword(body)
        if (response !== "Error") {
            if (response.data.status == true) {
                Toast.show(response.data.message, Toast.LONG);
                await setLoading(false);

            } else if (response.data.status == false) {
                Toast.show("Request " + response.data.data, Toast.LONG);
                setLoading(false);
            }
            else {
                Toast.show("Something Went Wrong ", Toast.LONG);
                setLoading(false);
            }
        } else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader animating={isloading} />
            <View style={styles.tpcontainer}  >

                <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                    <Text style={styles.inputlabel}>Password:</Text>
                    <TextInput
                        placeholder="Password"
                        style={styles.transactioninput}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text)=>{setPassword(text),setNewpassworderror("")}}
                    />
               {newpassworderror !="" && <Text style={{color:"red",marginHorizontal:10}}>{newpassworderror}</Text>}

                    <View style={{ marginVertical: 20, marginHorizontal: 7 }}>
                      
                     { screen == "BuyVreit" ? <TPNotes
                            inst1={"Buying Vreit is used for purchasing packages or C2C transfer only"}
                            inst2={"Buying Vreit can’t be withdraw by bank or usdt."}
                        />
                        :
                        <TPNotes/>}
                    </View>
                    <View style={styles.TPbutton}>
                        <TouchableOpacity onPress={() => Proceed()} style={{ backgroundColor: "gray", padding: 10, borderRadius: 5 }}>
                            <Text style={{ color: "white" }}>Proceed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { Forgot_Transaction_Password() }} style={{ borderColor: "gray", padding: 10, borderRadius: 5, overflow: "hidden", borderWidth: 1 }}>
                            <Text>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>



        </SafeAreaView>
    )
}
export default TransactionPassword;