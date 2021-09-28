import React, {useEffect, useRef, useState} from "react";
import {View, Text, FlatList, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Image} from "react-native";
import Colors from "../../../Style_Sheet/Colors";
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Btn } from "../../../utilis/Btn";
import DoubleText from "../../../utilis/DoubleText";
import {getShop} from "../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import {Picker} from "@react-native-picker/picker";
import Notes from "../../../Zextra/Note";
import Alert from "../../../Zextra/Alert";

const Shop = () => {
    const refRBSheet = useRef();
    const [index, setIndex] = useState(0);
    const [ids, setIds] = useState({});
    const [data,setData]=useState([]);
    const [isloading,setLoading]=useState("");
    const [detail, setDetail] = useState("");
    const [errors, setErrors] = useState("");
    const [selectedValue, setSelectedValue] = useState("Please Select");
    const buttons = [{ name: 'Package Detail', id: 0 }, { name: 'Proceed Order', id: 1 }]

    useEffect(async ()=>{await getShopData()},[])

    const getShopData=async ()=>{
        setLoading(true)
        let response = await getShop()
        if (response !== "Error") {
            if (response.data.status == true) {
                setData(response.data.data);
                setLoading(false);
            }else {
                Toast.show("Something Went Wrong !", Toast.LONG);
                setLoading(false);
            }
        }else {
            alert(JSON.stringify(response))
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }
    const renderItem = ({ item, index }) => (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => { refRBSheet.current.open(); setIds(item) }} style={{ flex: 1, marginHorizontal: 5 }}>
                <LinearGradient colors={['#333232', '#a9a6a6']} style={{ paddingHorizontal: 15, borderRadius: 10, margin: 4, flex: 1 }}>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontWeight: "bold", color: Colors.white, fontSize: 18 }}>{item.title}</Text>
                        <Text style={{ color: Colors.white }}>{item.price}</Text>
                        <Text style={{ textAlign: "center", marginVertical: 40, padding: 7, borderRadius: 5, borderWidth: 1, borderColor: Colors.white, color: Colors.white, fontSize: 12 }}>Subscription $50</Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Colors.primary, borderRadius: 6, fontSize: 10, color: Colors.white }}>{item.extra_tokens}%</Text>
                            <Text style={{ color: Colors.white, fontSize: 11 }}>  VREIT Bonus Point</Text>
                        </View>
                    </View>
                </LinearGradient>

            </TouchableOpacity>
        </View>
    )
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", color: Colors.secondary }}>Buy Package</Text>
            <FlatList
                ItemSeparatorComponent={Platform.OS !== 'android' && (({ highlighted }) => (<View style={[highlighted && { marginLeft: 0 }]} />))}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                style={{ flex: 1 }}
            />
            <RBSheet
                ref={refRBSheet}
                height={480}
                closeOnDragDown={true}
                closeOnPressMask={true}
                closeOnPressBack={true}
                dragFromTopOnly={true}
                customStyles={{ wrapper: { backgroundColor: "rgba(0,0,0,0.47)" }, draggableIcon: { backgroundColor: "#000" }, container: { borderTopLeftRadius: 30, borderTopRightRadius: 30 } }}
            >
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 30 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 20, color: Colors.primary }}>{ids.title}</Text>
                    <AntDesign color={Colors.primary} size={20} name={"closecircle"} onPress={() => { refRBSheet.current.close() }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, }}>
                    {buttons.map((item, indexs) => (
                        <Btn onPress={() => {
                            setIndex(indexs);
                            // getData(indexs)
                        }} containerStyle={{ backgroundColor: index == indexs ? Colors.primary : Colors.white, paddingVertical: 10, paddingHorizontal: 10, flex: 1, borderRadius: 5, marginLeft: 3, borderWidth: 1, borderColor: Colors.primary }} text={item.name} text_style={{ color: index == indexs ? Colors.white : Colors.primary }} />
                    ))}
                </View>
                {index == 0 ?
                    <View style={{ justifyContent: "space-evenly" }}>
                        <DoubleText text1={"Price"} text2={"$"+ids.price} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, padding: 6 }} />
                        <DoubleText text1={"Business Volume"} text2={ids.business_volume+" BV"} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                        <DoubleText text1={"Escrow Time"} text2={ids.escroll_time+" Days"} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, padding: 6 }} />
                        <DoubleText text1={"Direct Commission"} text2={ids.direct_commission+"%"} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                        <DoubleText text1={"Binary Commission"} text2={ids.binary_commission+"%"} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, padding: 6 }} />
                        <DoubleText text1={"Maxout Per Week"} text2={"$"+ids.maxout} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                        <DoubleText text1={"Extra Tokens"} text2={ids.extra_tokens+"%"} textstyle={{ textAlign: "center" }} containerstyle={{ marginLeft: 20, padding: 6 }} />
                    </View>
                    : <View style={{ marginHorizontal: 10, flex: 1 }}>
                        <ScrollView showsVerticalScrollIndicator={true}>
                            <TouchableOpacity activeOpacity={1}>
                                <Text style={{ fontSize: 14, fontWeight: "bold" }}>Proceed With</Text>
                                <View style={{ borderBottomWidth: 1, borderColor: Colors.secondary }}>
                                    <Picker
                                        mode={"dropdown"}
                                        selectedValue={selectedValue}
                                        style={{ height: 50, width:"100%"}}
                                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                    >
                                        <Picker.Item label="Bank" value={"Bank"} testID={"1"}/>
                                        <Picker.Item label="USDT" value={"USDT"} testID={"2"} />
                                        <Picker.Item label="Wallet" value={"Wallet"} testID={"3"} />
                                        <Picker.Item label="Vreit" value={"Vreit"} testID={"4"} />
                                        <Picker.Item label="Please Select" value={"Please Select"} testID={"4"} color={"rgba(152,148,148,0.63)"} />
                                    </Picker>
                                </View>
                                {selectedValue == "Bank"?
                                    <View>
                                    <DoubleText text1={"Account Name"} text2={"$57,482.17185"} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6 }} />
                                    <DoubleText text1={"Bank Name"} text2={"$12,574"} textstyle={{ textAlign: "center" }} containerstyle={{ backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                                    <DoubleText text1={"Account Number"} text2={"$1,250"} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6 }} />
                                    <DoubleText text1={"IBAN"} text2={"$25,000"} textstyle={{ textAlign: "center" }} containerstyle={{ backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                                    <DoubleText text1={"Swift Code"} text2={"$600"} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6 }} />
                                    <DoubleText text1={"CIF Number"} text2={"$0"} textstyle={{ textAlign: "center" }} containerstyle={{ backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                                    <DoubleText text1={"Branch Name"} text2={"$20,558.20000"} textstyle={{ textAlign: "center" }} containerstyle={{ padding: 6 }} />
                                    <DoubleText text1={"Branch Code"} text2={"$0"} textstyle={{ textAlign: "center" }} containerstyle={{ backgroundColor: "rgba(152,148,148,0.63)", padding: 6 }} />
                                    <TextInput value={null} placeholder={"hello"} />
                                    <Btn containerStyle={{ flex: 1, backgroundColor: Colors.primary, marginVertical: 8, padding: 10, borderRadius: 5,marginHorizontal:20 }} text={"Choose File"} text_style={{ color: Colors.white }} />
                                    <Notes/>
                                    <Btn text_style={{ color: Colors.white }} text={"Submit"} containerStyle={{ width: 100, borderRadius: 5, padding: 10, backgroundColor: Colors.primary, alignSelf: "center", bottom: 20, marginTop: 30, }} />
                                    </View>
                                    :selectedValue == "USDT"?
                                        <View>
                                            <Text style={{top:25,width:58,padding:8,backgroundColor:"#2c754a",color:Colors.white,textAlign:"center",borderRadius:6}}>TRC20</Text>
                                            <Image source={require("../../../Assets/Qr.png")} style={{width: '50%',height:150,alignSelf:"center"}}/>
                                        <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', }} onPress={() => { copyToClipboard() }}>
                                            <Text>0xWjsS354dfd545s3afa54wf</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <Entypo color={Colors.primary}  size={20} name={"copy"}/>
                                                <Text style={{ color: Colors.primary, }}> Tap to Copy!</Text>
                                            </View>
                                        </TouchableOpacity>
                                            <View style={{borderWidth:1,borderColor:Colors.primary,borderRadius:10,padding:5,marginVertical:5}}>
                                                <Text style={{color:Colors.primary,fontWeight:"bold",fontSize:15}}>Importent Note</Text>
                                                <Text style={{color:Colors.primary,fontSize:13}}>Send only USDT to this deposit address.</Text>
                                                <Text style={{color:Colors.primary,fontSize:11}}>* Sending coins or tokens other than USDT to this address may result in the loss of your deposit.</Text>
                                                <Text style={{color:Colors.primary,fontSize:11}}>* Package will be update or upgrade after confirmation.</Text>
                                            </View>
                                            <Btn containerStyle={{ flex: 1, backgroundColor: Colors.primary, marginVertical:8, padding: 10, borderRadius: 5,marginHorizontal:20 }} text={"Choose File"} text_style={{ color: Colors.white }} />
                                            <Notes/>
                                            <Btn text_style={{ color: Colors.white }} text={"Submit"} containerStyle={{ width: 100, borderRadius: 5, padding: 10, backgroundColor: Colors.primary, alignSelf: "center", marginTop: 12, }} />
                                            <Text></Text>
                                        </View>
                                        :selectedValue == "Wallet"?
                                            <Alert value={"Wallet"}/>
                                            :selectedValue == "Vreit"?
                                                <Alert value={"Verit Wallet"}/>
                                                : null
                                }
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                }
            </RBSheet>
        </SafeAreaView>
    )
}
export default Shop;
