import React,{useState} from "react";
import {Text, View, SafeAreaView, Picker} from "react-native";
import Colors from "../../../../Style_Sheet/Colors";
import {Btn} from "../../../../utilis/Btn";
import DoubleText from "../../../../utilis/DoubleText";
import {FormInput} from "../../../../utilis/Text_input";
import CheckBox from "../../../../utilis/Checkbox";

const TransferFunds = () => {
    const [amount,setAmount]=useState("");
    const [errors,setErrors]=useState("");
    const [detail,setDetail]=useState("");
    const [index, setIndex] = useState(0);
    const [checked,setChecked]=useState(false);
    const [selectedValue, setSelectedValue] = useState("Please Select");
    const buttons = [{ name: 'Wallet', id: 0 }, { name: 'Proceed Order', id: 1 }]
    const numberArray = ["1","2","3","4"];
    // useEffect(async () => {
    //     await getData(index)
    // }, [])
    // const getData = async (type) => {
    //     alert("hello")
    // }
    return(
        <SafeAreaView style={{flex:1}}>
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
                    <DoubleText text1={"Earning (+)"} text2={"$57,482.17185"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,padding:6}}/>
                    <DoubleText text1={"Transfer (-)"} text2={"$12,574"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,backgroundColor:"rgba(152,148,148,0.63)",padding:6}}/>
                    <DoubleText text1={"Received (+)"} text2={"$1,250"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,padding:6}}/>
                    <DoubleText text1={"Pin Purchased (-)"} text2={"$25,000"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,backgroundColor:"rgba(152,148,148,0.63)",padding:6}}/>
                    <DoubleText text1={"Withdraw (-)"} text2={"$600"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,padding:6}}/>
                    <DoubleText text1={"Vreit (+)"} text2={"$0"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,backgroundColor:"rgba(152,148,148,0.63)",padding:6}}/>
                    <DoubleText text1={"Available (=)"} text2={"$20,558.20000"} textstyle={{textAlign:"center"}} containerstyle={{marginLeft:20,padding:6}}/>
                </View>
                :
                <View style={{margin:20}}>
                    <Text style={{fontWeight:"bold"}}>Proceed With</Text>
                    <View style={{borderBottomWidth:1,borderColor:Colors.secondary}}>
                        <Picker
                            mode={"dropdown"}
                            selectedValue={selectedValue}
                            style={{ height: 50, width:"100%"}}
                            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                            {numberArray.length > 0 ? numberArray.map(item =><Picker.Item label={item} value={item} /> ):''}
                            <Picker.Item label="Please Select" value={"Please Select"} testID={"4"} color={"rgba(152,148,148,0.63)"} />
                        </Picker>
                    </View>
                    <FormInput
                        containerStyle={{marginTop:5}}
                        placeholder={"In Amount 100 ..."}
                        placeholderTextColor={Colors.secondary}
                        iconName_s="user"
                        icon_color={Colors.secondary}
                        value={amount}
                        color={Colors.primary}
                        onChangeText={(text) => { setErrors(""), setAmount(text) }}
                        error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                    />
                    {/*<Text>{selectedValue}</Text>*/}
                    <Text style={{padding:10,fontWeight:"bold",color:Colors.secondary}}>Withdraw Details:</Text>
                    <FormInput
                        value={detail}
                        onChangeText={(text) => { setErrors(""), setDetail(text) }}
                        error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
                    />
                    <CheckBox
                        style={{margin:10}}
                        textStyle={{fontWeight:"bold"}}
                        size={20}
                        selected={checked}
                        onPress={() => setChecked(!checked)}
                        text={"Terms of condition"}/>
                    <Btn text_style={{color:Colors.white}} text={"Process Transfer"} containerStyle={{width:160,borderRadius:20,padding:10,backgroundColor:Colors.primary,alignSelf:"center",bottom:20,marginTop:40,}}/>
                </View>
            }
        </SafeAreaView>
    )
}
export default TransferFunds;
