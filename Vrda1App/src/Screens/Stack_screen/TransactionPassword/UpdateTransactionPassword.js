import React, { useState, useEffect } from "react";
import { View, Text, TextInput, SafeAreaView, ScrollView, Linking } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from '../../../Style_Sheet/style';
import { FormInput } from "../../../utilis/Text_input";
import Notes from "../../../Zextra/Note";
import TPNotes from "../../../Zextra/TPNote";
import TNPNotes from "../../../Zextra/TNPNotes";
import Loader from "../../../utilis/Loader";
import { ForgotTransactionPassword,UpdaeTransactionPost } from '../../../utilis/Api/Api_controller';
import { get_data } from "../../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-community/async-storage";

const UpdateTransactionPassword = ({ navigation, route }) => {

    const token=route.params.data;
    const [isloading, setLoading] = useState(false);
    const [userDetail, setUserDetail] = useState("");
    const [password,setPassword]=useState("");
    const [confirmpassword,setConfirmpassword]=useState("");
    const[newpassworderror,setNewpassworderror]=useState("");
    const[confirmpassworderror,setConfirmpassworderror]=useState("");

   

    useEffect(async () => {
        let User_DATA = await get_data("User_DATA")
        setUserDetail(User_DATA)
    }, [])

    const logout = () => {
        console.log("logout");
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys)).then(() => navigation.reset({ index: 0, routes: [{ name: "Login" }], }));
    }

    const Submitt = async () => {
        let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if(password==""){
            setNewpassworderror("Enter New Password")
        }
        else if(regex.test(password)===false){
            setNewpassworderror("Password is not valid")
        }
        else if(confirmpassword==""){
            setConfirmpassworderror("Enter Confirm Password")
        }
        else if(password != confirmpassword){
            setConfirmpassworderror("Password Not match")
        }
        else{
            setLoading(true)
            let body={token:token,password:password,password_confirmation:confirmpassword}
            let response = await UpdaeTransactionPost(body)
            if (response !== "Error") {
                if (response.data.status == true) {
                    Toast.show(response.data.message, Toast.LONG);
                    await setLoading(false);
                    await logout()
    
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

return (
    <SafeAreaView style={{ flex: 1 }}>
        <Loader animating={isloading} />
        <ScrollView>
        <View style={styles.tpcontainer}>
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                <View style={{ marginVertical: 10, marginHorizontal: 7 }}>
                    <TNPNotes />
                </View>
                <Text style={styles.inputlabel}>Email:</Text>
                <View>
                </View>
                 <TextInput
                        placeholder="Email"
                        style={{marginHorizontal:10,borderBottomWidth:1,backgroundColor:"#DBCCCD82",borderTopLeftRadius:5,borderTopRightRadius:5}}
                        editable={false}
                        value={userDetail.email}
                    />
                <Text style={styles.inputlabel}>New Password:</Text>
                <FormInput
                    containerStyle={{ backgroundColor: "white", marginHorizontal: 10, borderRadius: 5 }}
                    placeholder="Enter New Password"
                    value={password}
                    secureTextEntry={true}
                    onChangeText={(text) => { setPassword(text)}}
                />
                {newpassworderror !="" && <Text style={{color:"red",marginHorizontal:10}}>{newpassworderror}</Text>}
                <Text style={styles.inputlabel}>Confirm Password:</Text>
                <FormInput
                    containerStyle={{ backgroundColor: "white", marginHorizontal: 10, borderRadius: 5 }}
                    placeholder="Enter Confirm Password"
                    value={confirmpassword}
                    secureTextEntry={true}
                    onChangeText={(text) => {setConfirmpassword(text)}}
                />
                {confirmpassworderror !="" && <Text style={{color:"red",marginHorizontal:10}}>{confirmpassworderror}</Text>}

                <View style={styles.TPbutton, { marginTop: 10 }}>
                    <TouchableOpacity onPress={()=>{Submitt()}} style={{ alignSelf: "flex-start", backgroundColor: "gray", padding: 10, borderRadius: 5, overflow: "hidden", marginHorizontal: 10 }}>
                        <Text style={{ color: "white" }}>Update Password</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
        </ScrollView>


    </SafeAreaView>
)
}
export default UpdateTransactionPassword;