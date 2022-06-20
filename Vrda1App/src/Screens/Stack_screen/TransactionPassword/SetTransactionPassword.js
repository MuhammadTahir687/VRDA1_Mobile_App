import React, { useState, useEffect } from "react";
import { View, Text, TextInput, SafeAreaView, ScrollView, Linking } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from '../../../Style_Sheet/style';
import { FormInput } from "../../../utilis/Text_input";
import Notes from "../../../Zextra/Note";
import TPNotes from "../../../Zextra/TPNote";
import TNPNotes from "../../../Zextra/TNPNotes";
import Loader from "../../../utilis/Loader";
import { SetNewTransactionPassword } from '../../../utilis/Api/Api_controller';
import { get_data } from "../../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";

const SetTransactionPassword = ({ navigation, route }) => {

    var screen = route.params.screen;
    const [isloading, setLoading] = useState(false);
    const [showbtn, setShowbtn] = useState(false);
    const [linkedURL, setLinkedURL] = useState(null);
    const [userDetail, setUserDetail] = useState("")
    const [newpassword,setNewPassword]=useState("");
    const [confirmpassword,setConfirmPassword]=useState("");
    const[newpassworderror,setNewpassworderror]=useState("");
    const[confirmpassworderror,setConfirmpassworderror]=useState("");

   

    useEffect(async () => {
        let User_DATA = await get_data("User_DATA")
        setUserDetail(User_DATA)
    }, [])

    const Submitt = async () => {
        let regex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if(newpassword === '') {
            setNewpassworderror("Enter New Password")
        }
        else if(regex.test(newpassword)===false){
            setNewpassworderror("Password is not valid")
        }
        else if (confirmpassword === '') {
          setConfirmpassworderror("Enter Confirm Password")
        }
        else{

        
        setLoading(true)
        const body ={new_password:newpassword,confirm_new_password:confirmpassword}
        let response = await SetNewTransactionPassword(body)
        if (response !== "Error") {
            if (response.data.status == true) {
                Toast.show(response.data.message, Toast.LONG);
                navigation.navigate(screen)
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
                <TextInput
                        placeholder="New Password"
                        style={styles.transactioninput}
                        secureTextEntry={true}
                        value={newpassword}
                        onChangeText={(text)=>{setNewPassword(text),setNewpassworderror("")}}
                    />
               {newpassworderror !="" && <Text style={{color:"red",marginHorizontal:10}}>{newpassworderror}</Text>}

                <Text style={styles.inputlabel}>Confirm Password:</Text>
                <TextInput
                        placeholder="Confirm Password"
                        style={styles.transactioninput}
                        secureTextEntry={true}
                        value={confirmpassword}
                        onChangeText={(text)=>{setConfirmPassword(text),setConfirmpassworderror("")}}
                    />
                {confirmpassworderror !="" && <Text style={{color:"red",marginHorizontal:10}}>{confirmpassworderror}</Text>}

                <View style={styles.TPbutton, { marginTop: 10 }}>
                    <TouchableOpacity onPress={()=>{Submitt()}} style={{ alignSelf: "flex-start", backgroundColor: "gray", padding: 10, borderRadius: 5, overflow: "hidden", marginHorizontal: 10 }}>
                        <Text style={{ color: "white" }}>Set Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </ScrollView>


    </SafeAreaView>
)
}
export default SetTransactionPassword;