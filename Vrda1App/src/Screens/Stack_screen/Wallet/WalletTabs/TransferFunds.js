import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, RefreshControl, ScrollView} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import {Btn} from "../../../../utilis/Btn";
import DoubleText from "../../../../utilis/DoubleText";
import {FormInput} from "../../../../utilis/Text_input";
import CheckBox from "../../../../utilis/Checkbox";
import {gettransferfunds, sendProcessTransferBtn} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Loader from "../../../../utilis/Loader";
import Dropdown from "../../../../utilis/Picker/Picker";
import {processTransferValidation} from "../../../../utilis/validation";
import RNPickerDialog from 'rn-modal-picker';
import styles from '../../../../Style_Sheet/style';
const TransferFunds = ({navigation}) => {
    const [detail,setDetail]=useState("");
    const [isloading,setLoading]=useState(false);
    const [errors,setErrors]=useState("");
    const [amounts,setAmounts]=useState("");
    const [index, setIndex] = useState(0);
    const [apiData,setApiData]=useState([]);
    const [refreshing,setRefreshing]=useState(false)
    const [checked,setChecked]=useState(false);
    const [available,setAvailable]=useState("");
    const [selectedValue, setSelectedValue] = useState("Please Select");
    const [selectedid,setSelectedid]=useState("")
    const [placeHolderText,setplaceHolderText]=useState('Select User');
    const [selectedText,setselectedText]=useState("");
    const buttons = [{name: 'Wallet', id: 0}, {name: 'Process Transfer', id: 1},]


    useEffect(async ()=>{ await getData(); },[]);

    const getData=async ()=>{
        setLoading(true)
        let response = await gettransferfunds();
        if (response !== "Error") {
            if (response.data.status === true) {
                setApiData(response.data.users.childs);
                setAvailable(response.data.wallet)
                setRefreshing(!refreshing)
                setLoading(false);
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
        let validate = processTransferValidation(amounts,selectedid,detail,available.available)
        if (validate.valid === false) {
            setErrors(validate.errors)
        } else {
            setErrors("")
            var id = selectedid.toString()
            let body ={details: detail, amount: amounts, user_id: id.toString()}
            navigation.navigate('TransactionPassword',{data:body,screen:"transfer_funds"})

            // setLoading(true)
            // let response = await sendProcessTransferBtn(body)
            // if (response !== "Error") {
            //     if (response.data.status == true) {
            //         Toast.show(response.data.message, Toast.LONG);
            //         await setLoading(false);
            //         await setDetail("");
            //         await setAmounts("");
            //         await onRefresh();

            //     }else {
            //         Toast.show(response.data.data, Toast.LONG);
            //         setLoading(false);
            //     }
            // }else {
            //     Toast.show("Network Error: There is something wrong!", Toast.LONG);
            //     setLoading(false);
            // }
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
                    <DoubleText text1={"Earning (+)"} text2={available.earning?"$"+parseFloat(available.earning).toFixed(2):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)"}}/>
                    <DoubleText text1={"Transfer (-)"} text2={available.sent?"$"+parseFloat(available.sent).toFixed(2):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6}}/>
                    <DoubleText text1={"Received (+)"} text2={available.receieved?"$"+parseFloat(available.receieved).toFixed(2):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)"}}/>
                    <DoubleText text1={"Pin Purchased (-)"} text2={available.spent?"$"+parseFloat(available.spent).toFixed(2):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6}}/>
                    <DoubleText text1={"Withdraw (-)"} text2={available.withdraw?"$"+parseFloat(available.withdraw).toFixed(2):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)",}}/>
                    <DoubleText text1={"Vreit (+)"} text2={available.vreit?"$"+parseFloat(available.vreit).toFixed(2):"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginHorizontal:15,padding:6}}/>
                    <DoubleText text1={"Available (=)"} text2={available.available?"$"+parseFloat(available.available).toFixed(2):"$0"} textstyle={{textAlign:"center",color:Colors.white}} textstyle1={{color:Colors.white}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgb(51,51,51)",}}/>
                </View>
                :
                <View style={{margin:20}}>
                    <Text style={{fontWeight:"bold"}}>Proceed With</Text>
                    <View style={{borderBottomWidth:1,borderColor:Colors.secondary}}>
                            <RNPickerDialog
                                data={apiData}
                                pickerTitle={'Select User'}
                                // labelText={'Select User'}
                                showSearchBar={true}
                                showPickerTitle={true}
                                listTextStyle={styles.listTextStyle}
                                pickerStyle={styles.pickerStyle4}
                                selectedText={selectedText}
                                placeHolderText={placeHolderText}
                                searchBarPlaceHolder={'Search.....'}
                                searchBarPlaceHolderColor={'#9d9d9d'}
                                selectedTextStyle={styles.selectedTextStyle}
                                placeHolderTextColor={'gray'}
                                dropDownIconStyle={styles.dropDownIconStyle}
                                searchBarStyle={styles.searchBarStyle}
                                //dropDownIcon={require('../assets/pin.png')}
                                selectedValue={(index, item) => {setselectedText(item.name),setSelectedid(item.id)}}
                            />

                        {/* <Dropdown onValueChange={(text)=>{setSelectedValue(text)}} PickerData={apiData.map(obj => ({key: obj.id, label: obj.name, value: obj.id, color: "rgba(77,38,22,1)",}))}/> */}
                    </View>
                    {errors === "Please Select Value" &&
                    <Text style={{ color: "red",fontSize:12 }}>{errors === "Please Select Value" ? "Please Select Value" : null}</Text>
                    }
                    <FormInput
                        placeholder={"In Amount 100 ..."}
                        placeholderTextColor={"rgba(178,176,176,0.72)"}
                        value={amounts}
                        keyboardType={'phone-pad'}
                        color={Colors.primary}
                        containerStyle={{marginTop:5}}
                        onChangeText={(text) => { setErrors(""); setAmounts(text) }}
                        error={errors === "Please Enter Amount" ? "Please Enter Amount" : errors === "Minimum Amount is 100" ? "Minimum Amount is 100":errors === "Amount is exceeded"?"Amount is exceeded":null}
                    />
                    <Text style={{padding:10,fontWeight:"bold",color:Colors.primary}}>Transfer Details:</Text>
                    <FormInput
                        placeholder={"Transfer Details"}
                        placeholderTextColor={"rgba(178,176,176,0.72)"}
                        value={detail}
                        onChangeText={(text) =>  {setErrors(""); setDetail(text)} }
                        error={errors === "Please Enter Details" ? "Please Enter Details" : null }
                    />
                    <View style={{flexDirection:"row"}}>
                        <CheckBox
                            style={{margin:10}}
                            textStyle={{fontWeight:"bold"}}
                            size={20}
                            selected={checked}
                            onPress={() => setChecked(!checked)}
                            text={"I accept"}/>
                        <Text onPress={()=>{setSelectedValue("");navigation.navigate("TermsAndCondition")}} style={{right:10,color:"#53a0b7",fontWeight:"bold",textDecorationLine:"underline",fontSize:12,alignSelf:"center"}}>Terms & Conditions</Text>
                    </View>
                    <Btn disabled={checked == true ? false : true} onPress={()=>{Submit()}} text_style={{color:Colors.white}} text={"Process Transfer"} containerStyle={{width:160,borderRadius:20,padding:10,backgroundColor:checked ===true?Colors.primary:Colors.secondary,alignSelf:"center",bottom:20,marginTop:40,}}/>
                </View>
            }
            </ScrollView>
        </SafeAreaView>
    )
}
export default TransferFunds;
