import React, { useState } from "react";
import { View, Text, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from '../../../Style_Sheet/style';
import { FormInput } from "../../../utilis/Text_input";
import Notes from "../../../Zextra/Note";
import TPNotes from "../../../Zextra/TPNote";
import TNPNotes from "../../../Zextra/TNPNotes";
import Loader from "../../../utilis/Loader";


const TransactionPassword = ({navigation,route}) => {
    var data=route.params.data;
    var screen=route.params.screen;

    console.log("Screen Name =======",data)

    const [view, setView] = useState(false);
    const [isloading,setLoading]=useState(false);
    const [showbtn,setShowbtn]=useState(false)

    const Proceed=async ()=>{

        if(screen =="withdraw_wallet"){
           alert(JSON.stringify(data))
           setLoading(false)
            let response = await sendProcessWithdraw(data)
            if (response !== "Error") {
                if (response.data.status == true) {
                    Toast.show(response.data.message, Toast.LONG);
                    await setLoading(false);
                    
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
        else {
          alert("Nothing")
        }
         
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
             <Loader animating={isloading}/>
            {view == true ? <View style={styles.tpcontainer}  >

                <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                    <Text style={styles.inputlabel}>Password:</Text>
                    <FormInput
                        containerStyle={{ backgroundColor: "white", marginHorizontal: 10, borderRadius: 5 }}
                        placeholder="Enter Password"
                        onChangeText={(text) => {  }}
                    />
                    <View style={{ marginVertical: 20, marginHorizontal: 7 }}>
                        <TPNotes 
                        inst1={"Buying Vreit is used for purchasing packages or C2C transfer only"}
                        inst2={"Buying Vreit can’t be withdraw by bank or usdt."}
                        />
                    </View>
                    <View style={styles.TPbutton}>
                        <TouchableOpacity onPress={()=>Proceed()} style={{ backgroundColor: "gray", padding: 10, borderRadius: 5 }}>
                            <Text style={{color:"white"}}>Proceed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{setView(false)}} style={{ borderColor: "gray", padding: 10, borderRadius: 5, overflow: "hidden", borderWidth: 1 }}>
                            <Text>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

                : <View style={styles.tpcontainer}>
                    <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
                    <View style={{ marginVertical: 20, marginHorizontal: 7 }}>
                            <TNPNotes/>
                        </View>
                        <Text style={styles.inputlabel}>New Password:</Text>
                        <FormInput
                            containerStyle={{ backgroundColor: "white", marginHorizontal: 10, borderRadius: 5 }}
                            placeholder="Enter New Password"
                            value=""
                            onChangeText={(text) => {  }}
                        />
                        <Text style={styles.inputlabel}>Confirm Password:</Text>
                        <FormInput
                            containerStyle={{ backgroundColor: "white", marginHorizontal: 10, borderRadius: 5 }}
                            placeholder="Enter Confirm Password"
                            value=""
                            onChangeText={(text) => {  }}
                        />
                        
                        <View style={styles.TPbutton,{marginTop:10}}>
                            <TouchableOpacity style={{ alignSelf:"flex-start",backgroundColor: "gray", padding: 10, borderRadius: 5, overflow: "hidden",marginHorizontal:10 }}>
                                <Text style={{color:"white"}}>Set Password</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>}


        </SafeAreaView>
    )
}
export default TransactionPassword;