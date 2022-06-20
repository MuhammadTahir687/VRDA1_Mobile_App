import React, { useState, useEffect } from "react";
import { View, Text, TextInput, SafeAreaView, ScrollView, Linking } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from '../../../Style_Sheet/style';
import { FormInput } from "../../../utilis/Text_input";
import Notes from "../../../Zextra/Note";
import TPNotes from "../../../Zextra/TPNote";
import TNPNotes from "../../../Zextra/TNPNotes";
import Loader from "../../../utilis/Loader";
import { ForgotTransactionPassword } from '../../../utilis/Api/Api_controller';
import { get_data } from "../../../utilis/AsyncStorage/Controller";
import Toast from "react-native-simple-toast";

const UpdateTransactionPassword = ({ navigation, route }) => {
    const [isloading, setLoading] = useState(false);
    const [showbtn, setShowbtn] = useState(false);
    const [linkedURL, setLinkedURL] = useState(null);
    const [userDetail, setUserDetail] = useState("")
   

    useEffect(async () => {
        let User_DATA = await get_data("User_DATA")
        setUserDetail(User_DATA)
    }, [])

    const Submitt = async () => {
        setLoading(true)
        let response = await sendProcessWithdraw(body)
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
                    value=""
                    onChangeText={(text) => { }}
                />
                <Text style={styles.inputlabel}>Confirm Password:</Text>
                <FormInput
                    containerStyle={{ backgroundColor: "white", marginHorizontal: 10, borderRadius: 5 }}
                    placeholder="Enter Confirm Password"
                    value=""
                    onChangeText={(text) => { }}
                />

                <View style={styles.TPbutton, { marginTop: 10 }}>
                    <TouchableOpacity style={{ alignSelf: "flex-start", backgroundColor: "gray", padding: 10, borderRadius: 5, overflow: "hidden", marginHorizontal: 10 }}>
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