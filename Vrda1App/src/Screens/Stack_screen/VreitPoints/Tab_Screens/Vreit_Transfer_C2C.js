import {Btn} from "../../../../utilis/Btn";
import Toast from "react-native-simple-toast";
import Loader from "../../../../utilis/Loader";
import React, {useEffect, useState} from "react";
import CheckBox from "../../../../utilis/Checkbox";
import Colors from "../../../../Style_Sheet/Colors";
import DoubleText from "../../../../utilis/DoubleText";
import Dropdown from "../../../../utilis/Picker/Picker";
import {FormInput} from "../../../../utilis/Text_input";
import {processVreitTransferValidae} from "../../../../utilis/validation";
import {Text, View, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity} from "react-native";
import {getVreitTransferC2C, sendVreitC2Csubmit,getCountry} from "../../../../utilis/Api/Api_controller";
import RNPickerDialog from 'rn-modal-picker';
import styles from '../../../../Style_Sheet/style';
import Ionicons from "react-native-vector-icons/Ionicons";


const Vreit_Transfer = ({navigation}) => {
    const [child,setChild]=useState([]);
    const [parent,setParent]=useState([]);
    const [detail,setDetail]=useState("");
    const [errors,setErrors]=useState("");
    const [amount,setAmount]=useState("");
    const [remain,setRemain]=useState("");
    const [index, setIndex] = useState(0);
    const [checked,setChecked]=useState(false);
    const [isloading,setLoading]=useState(false);
    const [refreshing,setRefreshing]=useState(false)
    const [vreitTransfer,setVreitTransfer]=useState("");
    const [selectedValue, setSelectedValue] = useState();
    const [selectedValue1, setSelectedValue1] = useState("");
    const [selectedText,setselectedText]=useState("");
    const [placeHolderText,setplaceHolderText]=useState('Select User');
    const [transactiontype,setTransactiontype]=useState("");
    const [country,setCountry]=useState([])
    const buttons = [{name: 'Transfer Point', id: 0}, {name: 'Process Transfer', id: 1},]

    useEffect(async ()=>{ await getData(); },[]);

    const getData=async ()=>{
        setLoading(true)
        let response = await getVreitTransferC2C();
        
        if (response !== "Error") {
            if (response.data.status === true && response.data.transaction_password == true) {
                setVreitTransfer(response.data.vreit_transfer);
                setRemain(response.data.remain);
                setChild(response.data.child_users);
                setParent(response.data.parent_users);
                setRefreshing(!refreshing)
                setLoading(false);
            }
           else if (response.data.status == true && response.data.transaction_password == false) {
                navigation.navigate("SetTransactionPassword",{screen:"Vreit_Transfer"})
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

    const onRefresh = async () => { await getData(); }

    const Submit = async () => {
        if (selectedValue1){
            var validate =await processVreitTransferValidae(amount,selectedValue1,vreitTransfer.available)
        }else {
            var validate =await processVreitTransferValidae(amount,selectedValue,vreitTransfer.available)
        }
        if (validate.valid === false) {
            setErrors(validate.errors)
        } else {
            setErrors("")

            const withdrawal = remain.withdrawal;
            const received = remain.received;
            const seeded = remain.seeded;
            const merge = remain.merge;
    
           console.log("WITHDRAWL = ",withdrawal,"recieved =",received,"seeded=",seeded,"merge",merge)

            if (parseFloat(withdrawal) > 0 && parseFloat(amount) > parseFloat(withdrawal)) {
                setTransactiontype('merge')
                console.log('merge');
            } else if (parseFloat(received) > 0 && parseFloat(amount) > parseFloat(received)) {
                setTransactiontype('merge')
                console.log('merge');
            } else if (parseFloat(amount) <= parseFloat(withdrawal)) {
                setTransactiontype('withdrawal')
                console.log('withdrawal');
            } else if (parseFloat(amount) <= parseFloat(received)) {
                setTransactiontype('received')
                console.log('received');
            } else if (parseFloat(amount) <= parseFloat(seeded)) {
                setTransactiontype('seeded')
                console.log('seeded');
            }
            else {
                console.log('none');
            }

            let body = {details: detail,points:amount,receiver_id: selectedValue ? selectedValue : selectedValue1 ? selectedValue1 : "",transfer_type:transactiontype,withdrawal:remain.withdrawal,received:remain.received,seeded:remain.seeded,merge:remain.merge};
            navigation.navigate('TransactionPassword',{data:body,screen:"VreitTransferc2c"})
        //    console.log(body)
        //     setLoading(true)
        //     var response = await sendVreitC2Csubmit(body)
        //     if (response !== "Error") {
        //         if (response.data.status == true) {
        //             Toast.show("Transfer Successful", Toast.LONG);
        //             setLoading(false);
        //             await setDetail("");
        //             await setAmount("");
        //             await onRefresh();
        //         }else if (response.data.status == false) {
        //             Toast.show(response.data.message, Toast.LONG);
        //             setLoading(false);
        //         }else {
        //             Toast.show(response.data, Toast.LONG);
        //             setLoading(false);
        //         }
        //     }else {
        //         Toast.show("Network Error: There is something wrong!", Toast.LONG);
        //         setLoading(false);
        //     }
        }
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <Loader animating={isloading}/>
            <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
                <Text style={{textAlign:"center",fontSize:18,fontWeight:"bold",textDecorationLine:"underline",color:Colors.secondary,margin:10}}>VREIT Point Transfer | Customer to Customer</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 15, }}>
                    {buttons.map((item, indexs) => (
                        <Btn onPress={() => { setIndex(indexs);
                            // getData(indexs)
                        }} containerStyle={{ backgroundColor: index == indexs ? Colors.primary : Colors.white, paddingVertical: 10, paddingHorizontal: 10, flex: 1, borderRadius: 5, marginLeft: 3, borderWidth: 1, borderColor:Colors.primary }} text= {item.name} text_style={{color:index == indexs?Colors.white:Colors.primary}} />
                    ))}
                </View>
                {index == 0?
                    <View style={{marginVertical:20,justifyContent:"space-evenly"}}>
                        <DoubleText text1={"Shifted (+)"} text2={vreitTransfer.shifted?parseFloat(vreitTransfer.shifted).toFixed(2):"0"} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)"}}/>
                        <DoubleText text1={"Swapped (-)"} text2={vreitTransfer.swapped?parseFloat(vreitTransfer.swapped).toFixed(2):"0"} containerstyle={{marginHorizontal:15,padding:6}}/>
                        <DoubleText text1={"Vreit Wallet (-)"} text2={vreitTransfer.vreit?parseFloat(vreitTransfer.vreit).toFixed(2):"0"} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)"}}/>
                        <DoubleText text1={"Purchased (-)"} text2={vreitTransfer.purchased?parseFloat(vreitTransfer.purchased).toFixed(2):"0"} containerstyle={{marginHorizontal:15,padding:6}}/>
                        <DoubleText text1={"Transferred (-)"} text2={vreitTransfer.transfer?parseFloat(vreitTransfer.transfer).toFixed(2):"0"} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)",}}/>
                        <DoubleText text1={"Received (+)"} text2={vreitTransfer.receive?parseFloat(vreitTransfer.receive).toFixed(2):"0"} containerstyle={{marginHorizontal:15,padding:6}}/>
                        <DoubleText text1={"Buy (+)"} text2={vreitTransfer.buy?parseFloat(vreitTransfer.buy).toFixed(2):"0"} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)"}}/>
                        <DoubleText text1={"Dameta1 (-)"} text2={vreitTransfer.dameta1?parseFloat(vreitTransfer.dameta1).toFixed(2):"0"} containerstyle={{marginHorizontal:15,padding:6}}/>
                        <DoubleText text1={"Seeded (+)"} text2={vreitTransfer.seeded?parseFloat(vreitTransfer.seeded).toFixed(2):"0"} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgba(152,148,148,0.63)"}}/>
                        <DoubleText text1={"Available (=)"} text2={vreitTransfer.available?parseFloat(vreitTransfer.available).toFixed(2):"$0"} textstyle={{color:Colors.white}} textstyle1={{color:Colors.white}} containerstyle={{marginHorizontal:15,padding:6,backgroundColor:"rgb(51,51,51)",}}/>
                    </View>
                    :
                    <View style={{marginHorizontal:20,marginVertical:5}}>
                        <Text style={{fontWeight:"bold",backgroundColor:"rgba(255,0,0,0.27)",padding:10,textAlign:"center",color:"red",borderRadius:5,marginBottom:15}}>At a time you can only select Parent or Child.</Text>
                        <Text style={{fontWeight:"bold"}}>Transfer Points</Text>
                        <View style={{borderBottomWidth:1,borderColor:Colors.secondary}}>
                            <Text style={{fontSize:13,paddingHorizontal:10,top:5,fontWeight:"bold"}}>Select Parent:</Text>
                            <Dropdown
                                disable={!selectedValue1?false:true}
                                onValueChange={(text)=>{setSelectedValue(text)}}
                                PickerData={parent.map(obj => ({key: obj.id, label:obj.name, value: obj.id}))}/>
                        </View>
                        {/* <View style={{borderBottomWidth:1,borderColor:Colors.secondary}}>
                            <Text style={{fontSize:13,paddingHorizontal:10,top:5,fontWeight:"bold"}}>Select Child:</Text>
                            <Dropdown
                                disable={!selectedValue?false:true}
                                onValueChange={(text)=>{setSelectedValue1(text)}}
                                PickerData={child.map(obj => ({key: obj.id, label:obj.name, value: obj.id}))}/>
                        </View> */}
                        <View style={{borderBottomWidth:1,borderColor:Colors.secondary,flexDirection:"row",alignItems:"center"}}>
                            <RNPickerDialog
                                data={child}
                                pickerTitle={'Select User'}
                                // labelText={'Select User'}
                                showSearchBar={true}
                                showPickerTitle={true}
                                listTextStyle={styles.listTextStyle}
                                pickerStyle={styles.pickerStyle}
                                selectedText={selectedText}
                                placeHolderText={placeHolderText}
                                searchBarPlaceHolder={'Search.....'}
                                searchBarPlaceHolderColor={'#9d9d9d'}
                                selectedTextStyle={styles.selectedTextStyle}
                                placeHolderTextColor={'gray'}
                                dropDownIconStyle={styles.dropDownIconStyle}
                                searchBarStyle={styles.searchBarStyle}
                                disablePicker={!selectedValue?false:true}
                                //dropDownIcon={require('../assets/pin.png')}
                                selectedValue={(index, item) => {setselectedText(item.name),setSelectedValue1(item.id)}}
                            />
                           {selectedValue1 !=="" && <TouchableOpacity onPress={()=>{setSelectedValue1(""),setselectedText("")}}>
                                 <Ionicons name="close" size={20}/>
                            </TouchableOpacity>}
                            
                            

                        {/* <Dropdown onValueChange={(text)=>{setSelectedValue(text)}} PickerData={apiData.map(obj => ({key: obj.id, label: obj.name, value: obj.id, color: "rgba(77,38,22,1)",}))}/> */}
                    </View>
                        <Text>{selectedValue === "parent"?"Select Proper Value":selectedValue === "child"?"Select Proper Value":null}</Text>
                        {errors === "Please Select Value" &&
                        <Text style={{ color: "red",fontSize:12 }}>{errors === "Please Select Value" ? "Please Select Value" : null}</Text>
                        }
                        <FormInput
                            placeholder={"In points (0.00) ..."}
                            placeholderTextColor={Colors.secondary}
                            value={amount}
                            keyboardType={'phone-pad'}
                            color={Colors.primary}
                            onChangeText={(text) => { setErrors(""), setAmount(text) }}
                            error={errors === "Please Enter Points" ? "Please Enter Points" : errors === "Amount Exceeded" ? "Amount Exceeded":null}
                        />
                        {/*<Text>{selectedValue}</Text>*/}
                        <Text style={{padding:10,fontWeight:"bold",color:Colors.primary}}>Transfer Details:</Text>
                        <FormInput
                            placeholder={"Transfer Details"}
                            placeholderTextColor={Colors.secondary}
                            value={detail}
                            onChangeText={(text) => { setErrors(""), setDetail(text) }}
                        />
                        <View style={{flexDirection:"row"}}>
                        <CheckBox
                            style={{margin:10}}
                            textStyle={{fontWeight:"bold"}}
                            size={20}
                            selected={checked}
                            onPress={() => setChecked(!checked)}
                            text={" I accept "}/>
                        <Text onPress={()=>{setSelectedValue("");navigation.navigate("TermsAndCondition")}} style={{right:10,color:"#53a0b7",fontWeight:"bold",textDecorationLine:"underline",fontSize:14,alignSelf:"center"}}>Terms & Conditions</Text>
                        </View>
                        <Btn disabled={checked == true ? false : true} onPress={()=>Submit()} text_style={{color:Colors.white}} text={"Process Transfer"} containerStyle={{width:160,borderRadius:20,padding:10,backgroundColor:checked ===true?Colors.primary:Colors.secondary,alignSelf:"center",bottom:20,marginTop:30,}}/>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}
export default Vreit_Transfer;
