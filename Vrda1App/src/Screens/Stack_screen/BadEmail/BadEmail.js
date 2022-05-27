import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, RefreshControl, Linking } from "react-native";
import Colors from "../../../Style_Sheet/Colors";
import Dialogs from "../../../utilis/Dialog";
import { getactivityfeed, sendBad_NewEmail, } from "../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../utilis/Loader";
import styles from '../../../Style_Sheet/style';
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { call } from "react-native-reanimated";


const Bad_Email = ({navigation,route}) => {
    const data=route.params.data;
    const [visible, setVisible] = useState(false);
    const [res, setRes] = useState("");
    const [isloading, setLoading] = useState(false);
    const [apiData, setApiData] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [emailerror, setEmailerror] = useState('');
    const [linkedURL, setLinkedURL] = useState(null);
    const [newmail,setNewmail]=useState("")

    useEffect(() => {
        const getUrlAsync = async () => {
            const initialUrl = await Linking.getInitialURL();
            if(initialUrl !=null){
                navigation.reset({index: 0,routes: [{ name: "Login" }],});
            }
            else{
            }
            setLinkedURL(decodeURI(initialUrl));
        };
        getUrlAsync();
    }, []);

    useEffect(() => {
        const callback = ({ url }) => {setLinkedURL(decodeURI(url)),  navigation.reset({index: 0,routes: [{ name: "Login" }],});alert("Email Verified")};
        Linking.addEventListener('url', callback);
        
        return () => {
            Linking.removeAllListeners('url', callback);
        };
    }, []);

    // const resetURL = () => setLinkedURL(null);
    console.log('url======',linkedURL)
   

    const SendEmail=async()=>{
      let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
      if(newmail == ""){setEmailerror("Enter Email")}
      else if(regex.test(newmail)==false){setEmailerror("Invalid Email")}
      else{ 
      const res= await sendBad_NewEmail({user_id:data.id,old_email:data.email,correct_email:newmail,user_name:data.name})
      console.log(res.data)
      if(res.data.status==true){
        Toast.show(res.data.message, Toast.LONG);
      }
      else{
        Toast.show("Something Went Wrong !", Toast.LONG);
      }
    }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Loader animating={isloading} />
                <View style={styles.bademailheader}>
                    <Text style={styles.bademailh1}>Dashboard</Text>
                    <View style={styles.bademailheadertext}>
                        <Text style={styles.bademailbtn}>Rank: {data.rank}</Text>
                        <Text style={styles.bademailbtn}>Pkg: {data.package}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.bademailnameh1}>Welcome {data.name}</Text>
                </View>
                <View style={styles.bademailcontainer2}>
                    <Text style={styles.bademailh1}>Incorrect Email</Text>
                    <Text >Dear Vrda1 member:</Text>
                    <Text style={styles.bademailp1}>The system found this email incorrect. Please enter your correct email address.</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.bademailp1}>Email:</Text>
                    <TextInput
                        placeholder="Email"
                        style={styles.bademailinput1}
                        editable={false}
                        value={data.email}
                    />
                    <Text style={{ fontWeight: "bold" }}>Note: <Text style={{ fontWeight: "normal" }}>If the above email is correct, please re-enter it again below for the system data.</Text></Text>
                    <Text style={styles.bademailp1}>Correct Email:</Text>
                    <TextInput
                        placeholder="Correct Email"
                        style={styles.bademailinput2}
                        value={newmail}
                        onChangeText={(text)=>{setNewmail(text),setEmailerror("")}}
                    />
                    {emailerror != "" && <Text style={styles.errorcolor}>{emailerror}</Text>}
                    <TouchableOpacity onPress={()=>{SendEmail()}} style={styles.bademailbtn1}>
                        <Text style={{ color: "white" }}>Send Email</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Bad_Email;
