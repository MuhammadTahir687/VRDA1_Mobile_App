import React, { useEffect, useState } from "react";
import { Text, RefreshControl, TextInput, TouchableOpacity, View, SafeAreaView, ImageBackground, ScrollView } from "react-native";
import Colors from "../../../Style_Sheet/Colors";
import DoubleText from "../../../utilis/DoubleText";
import ProfileView from "../../../utilis/ProfileView";
import Loader from "../../../utilis/Loader";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from '../../../Style_Sheet/style';
import { ChangePasswordValidation } from "../../../utilis/validation";
import { parseSync } from "@babel/core";
import {ChangePasswordApi} from '../../../utilis/Api/Api_controller'
import Toast from "react-native-simple-toast";

const ChangePassword = ({ navigation, route }) => {
    var data = route.params.data;
    var user =route.params.user;
    var name = route.params.tittle;
    var title = route.params.title;
    var firstname = route.params.firstname;
    var lastname = route.params.lastname;
    console.log("UserID======",user.id)
    const [apiData, setApiData] = useState("");
    const [isloading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [newpassword,setNewpassword]=useState("");
    const [confirmpassword,setConfirmpassword]=useState("");
    const [oldpassword,setOldpassword]=useState("");
    const[newpassworderror,setNewpassworderror]=useState("");
    const[oldpassworderror,setOldpassworderror]=useState("");
    const[confirmpassworderror,setConfirmpassworderror]=useState("");


    const Submit=async () => {
        if (oldpassword === '') {
            setOldpassworderror("Enter Old Password")
        }
        else if(newpassword === '') {
            setNewpassworderror("Enter New Password")
        }
        else if (confirmpassword === '') {
          setConfirmpassworderror("Enter New Password")
        }
        else if (newpassword.length < 8) {
            setNewpassworderror("Password must be atleast 8 alphabets")
        }
        else if (newpassword !== confirmpassword) {
            setConfirmpassworderror("Password Not match")
        }
        else {
        
            const body = new FormData();
            body.append('user_id', user.id);
            body.append("old_password", oldpassword);
            body.append("new_password",newpassword);
            body.append("c_new_password",confirmpassword)
            setLoading(true)
            let response = await ChangePasswordApi(body)
            if (response !== "Error") {
                if (response.data.status == true) {
                    Toast.show("Update Successful", Toast.LONG);
                    await setLoading(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }]
                   })
                }else {
                    Toast.show(response.message, Toast.LONG);
                    setLoading(false);
                }
            }else {
                Toast.show("Network Error: There is something wrong!", Toast.LONG);
                setLoading(false);
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require("../../../Assets/splash.png")} style={{ flex: 1 }}>
                <Loader animating={isloading} />
                <ScrollView>
                    <ProfileView source={{ uri: data.picture }} screen_title={name} username={title + " "} firstname={firstname + " "} lastname={lastname} update={"Bank Detail"} onPress={() => navigation.goBack()}
                    >
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.primary, paddingHorizontal: 10, bottom: 10 }}>{name}:</Text>
                            <View style={styles.pinputcontainer}>
                                <Ionicons name="lock-closed" />
                                <TextInput
                                    style={styles.pinput}
                                    placeholder="Old Password"
                                    value={oldpassword}
                                    onChangeText={(text)=>{setOldpassword(text),setOldpassworderror("")}}
                                    secureTextEntry={true}
                                />
                            </View>
                           {oldpassworderror !="" && <Text style={{color:"red",marginHorizontal:10}}>{oldpassworderror}</Text>}
                            <View style={styles.pinputcontainer}>
                                <Ionicons name="lock-closed" />
                                <TextInput
                                    style={styles.pinput}
                                    placeholder="New Password"
                                    value={newpassword}
                                    onChangeText={(text)=>{setNewpassword(text),setNewpassworderror("")}}
                                    secureTextEntry={true}
                                />
                            </View>
                            {newpassworderror !="" && <Text style={{color:"red",marginHorizontal:10}}>{newpassworderror}</Text>}
                            <View style={styles.pinputcontainer}>
                                <Ionicons name="lock-closed" />
                                <TextInput
                                    style={styles.pinput}
                                    placeholder="Confirm Password"
                                    value={confirmpassword}
                                    onChangeText={(text)=>{setConfirmpassword(text),setConfirmpassworderror("")}}
                                    secureTextEntry={true}
                                />
                            </View>
                           {confirmpassworderror !="" && <Text style={{color:"red",marginHorizontal:10}}>{confirmpassworderror}</Text>}
                            <TouchableOpacity onPress={()=>{Submit()}} style={{flex:1,backgroundColor:"grey",alignSelf:"center",padding:10,margin:10,borderRadius:10}}>
                                <Text style={{color:"white"}}>Change Password</Text>
                            </TouchableOpacity>
                        </View>
                    </ProfileView>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}
export default ChangePassword;
