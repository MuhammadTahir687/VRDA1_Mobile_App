import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, RefreshControl, Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { List } from 'react-native-paper';
import { getVreitQuaterly, sendVreitShiftedBtn,ExitPackagePost,ContinuePackagePost } from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Colors from "../../../../Style_Sheet/Colors";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DoubleText from "../../../../utilis/DoubleText";
import Dialogs from "../../../../utilis/Dialog";
import Loader from "../../../../utilis/Loader";
import { get_data } from "../../../../utilis/AsyncStorage/Controller";
import { TextInput } from "react-native-gesture-handler";
import { BackHandler } from "react-native";


const Quarterly_vreits = ({ navigation }) => {
    const [items, setItems] = useState('');
    const [indexss, setIndex] = useState('');
    const [avamount, setAvamount] = useState('');
    const [avpoints, setAvpoints] = useState('');
    const [abamount, setAbamount] = useState('');
    const [abpoints, setAbpoints] = useState('');
    const [asamount, setAsamount] = useState('');
    const [aspoints, setAspoints] = useState('');
    const [purchases, setPurchases] = useState([]);
    const [isloading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [apiData, setApiData] = useState("")
    const [refreshing, setRefreshing] = useState(false);
    const [packages, setPackages] = useState("");
    const [cureentvreitprice, setCureentvreitprice] = useState("")
    const [showview, setShowview] = useState(false);
    const [user,setUser]=useState("");
    const [exitdetail,setExitdetail]=useState("")
    useEffect(async () => { 

        await getData();
        let User_DATA = await get_data("User")
        console.log("USER Data=====",User_DATA.id)
        setUser(User_DATA)
    
    }, [])

   


    const getData = async () => {
        setLoading(true)
        let res = await getVreitQuaterly()
        
        if (res !== "Error") {
            if (res.data.status == true && res.data.email_status == true) {
                console.log("^^^^^^^^^",res.data.data.user.id)
                setShowview(true)
                setApiData(res.data);
                setCureentvreitprice(res.data.data.current_vreit_price)
                setPackages(res.data.data.package);
                setAvamount(res.data.data.total_assigned_vreits.amount.toFixed(5));
                setAvpoints(res.data.data.total_assigned_vreits.points.toFixed(5));
                setAbamount(res.data.data.total_bonus_vreits.amount.toFixed(5));
                setAbpoints(res.data.data.total_bonus_vreits.points);
                setAsamount(res.data.data.total_shifted_vreits.amount.toFixed(5));
                setAspoints(res.data.data.total_shifted_vreits.points);
                setPurchases(res.data.data.purchases);
                setRefreshing(!refreshing);
                setLoading(false)
            }
            else if (res.data.status == true && res.data.email_status == false) {
                const data = res.data.user;
                navigation.reset({ index: 0, routes: [{ name: "Bad Email", params: { data } }] });
                setLoading(false)

            }
            else {
                Toast.show("Something Went Wrong !", Toast.LONG);
                setLoading(false);
            }
        } else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }
    const ShiftVreit = async (item, items) => {
        let body = {
            purchase_pin: items.purchase_pin,
            package_id: items.package_id,
            quarterly_code: item.quarterly_code,
            vreit_points: item.quarter_vreits,
            // quarter_date: item.date,
            vreit_price: cureentvreitprice,
            user_id: apiData.data.user.id,
        };
        navigation.reset('TransactionPassword',{data:body,screen:"ShiftVreit"})

        // setLoading(true)
        // let response = await sendVreitShiftedBtn(body)
        // console.log("Body==========",body)
        // console.log("Response===========",response.data)
        // if (response !== "Error") {
        //     if (response.data.status == true) {
        //         setLoading(false);
        //         Toast.show(response.data.message, Toast.LONG);
        //         await onRefresh();
        //     } else {
        //         Toast.show(response.data.message, Toast.LONG);
        //         setLoading(false);
        //     }
        // } else {
        //     Toast.show("Network Error: There is something wrong!", Toast.LONG);
        //     setLoading(false);
        // }
    }

    const ExitPackage=async()=>{

    const body={purchase_pin: items.purchase_pin,quarter_id:items.quarter_id,user_id:apiData.data.user.id,package_type:items.purchase_type,details:exitdetail}
    console.log("Body==========",body)
    setLoading(true)
    let response = await ExitPackagePost(body)
    
    console.log("Response===========",response.data)
    if (response !== "Error") {
        if (response.data.status == true) {
            setLoading(false);
            setExitdetail("")
            Toast.show(response.data.message, Toast.LONG);
            await onRefresh();
        } else {
            Toast.show(response.data.message, Toast.LONG);
            setLoading(false);
        }
    } else {
        Toast.show("Network Error: There is something wrong!", Toast.LONG);
        setLoading(false);
    }    
    }
    const ContinuePackage=async(res)=>{

        const body={purchase_pin: res.purchase_pin,quarter_id:res.quarter_id,user_id:apiData.data.user.id,seeded_type:res.purchase_type}
        console.log("Body==========",body)
        setLoading(true)
        let response = await ContinuePackagePost(body)
        console.log("Response===========",response.data)
        if (response !== "Error") {
            if (response.data.status == true) {
                setLoading(false);
                // navigation.navigate("ContinueShop",{data:response.data.escrow})
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'ContinueShop',params:{data:response.data.escrow} }]     
               })
                Toast.show(response.data.message, Toast.LONG);
                await onRefresh();
            } else {
                Toast.show(response.data.message,Toast.LONG);
                setLoading(false);
            }
        } else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }    
        }

    const DATA = [
        { title: "Package", value: packages.package_price, type: packages.package_name, color: Colors.white },
        { title: "Assigned", value: avamount, value1: "(" + avpoints + " * " + cureentvreitprice + ")", color: "transparent" },
        { title: "Bonus", value: abamount, value1: "(" + abpoints + " * " + cureentvreitprice + ")", color: "transparent" },
        { title: "Total Shifted Verits", value: asamount, value1: "(" + aspoints + " * " + cureentvreitprice + ")", color: "transparent" },
    ];
    const renderItem = ({ item }) => (
        <View style={{ elevation: 8, padding: 10, flex: 1, justifyContent: "center", backgroundColor: Colors.secondary, borderRadius: 10, marginHorizontal: 5, marginVertical: 10, width: 200, height: 100 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: Colors.white, fontSize: 17 }}>{item.title} </Text>
                <Text style={{ backgroundColor: item.color, color: "black", paddingVertical: 1, paddingHorizontal: 10, borderRadius: 5 }}>{item.type}</Text>
            </View>
            <Text style={{ color: Colors.white }}>{item.value1}</Text>
            <Text style={{ color: Colors.white, fontSize: 15, fontWeight: "bold" }}>{item.value}</Text>
        </View>
    )
    const renderItem2 = ({ item, index }) => {
        let res = item
        console.log("dhfvhdjsvf",res.purchase_pin)
        return (
            <View style={{ borderWidth: 1, borderColor: res.purchase_status == "matured"? "gray": res.purchase_status == "expire"? "red": res.purchase_status == "active"?"gray":"white", borderRadius: 5,  overflow: 'hidden',marginHorizontal: 10, paddingHorizontal: 8, paddingTop: 5, marginBottom: 5,overflow:"hidden"}}>
              
                {res.purchase_status == "expire" ? <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, backgroundColor: "red", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5 }}>
                    <TouchableOpacity onPress={()=>{ContinuePackage(res)}} style={{ width: 100, }}  >
                        <Text style={{ fontWeight: "bold", color: "red", overflow: "hidden", backgroundColor: "white", padding: 5, borderRadius: 5, textAlign: "center" }}>Continue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: 100 }} onPress={() => { setVisible1(true), setItems(res), setIndex(index) }}>
                        <Text style={{ fontWeight: "bold", color: "red", overflow: "hidden", backgroundColor: "white", padding: 5, borderRadius: 5, textAlign: "center" }}>Exit</Text>
                    </TouchableOpacity>
                </View>
                    : res.purchase_status == "matured"?
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10, backgroundColor: "gray", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5 }}>
                        <Text style={{ fontWeight: "bold", color: "white", padding: 5, borderRadius: 5, textAlign: "center" }}>Matured On:</Text>
                        <Text style={{ fontWeight: "bold", color: "gray", overflow: "hidden", backgroundColor: "white", padding: 5, borderRadius: 5, textAlign: "center" }}><Text style={{ fontWeight: "bold" }}>Matured At:</Text>June 17, 2022</Text>
                    </View>
                    :<View></View>

                }

               
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>{index + 1} : Invoice : </Text>
                    <Text style={{ color: "#7f7878" }}>( ${parseFloat(res.purchase_price).toFixed(2)} )</Text>
                </View>
                <TouchableOpacity style={{ flex: 1, overflow: 'hidden', flexDirection: "row", marginTop: 10, borderRadius:50 }} onPress={() => { setVisible(true), setItems(res), setIndex(index) }}>
                    <Ionicons name="newspaper-outline" color={Colors.white} size={18} style={{ backgroundColor: Colors.primary, borderTopLeftRadius: 50, overflow: 'hidden', borderBottomLeftRadius: 50, padding: 10, alignItems: 'center' }} />
                    <Text style={{ flex: 1, backgroundColor: "#454343", borderTopRightRadius: 50, borderBottomRightRadius: 50, overflow: 'hidden',borderWidth: 0, borderColor: Colors.white, paddingHorizontal: 5, paddingVertical: 10, textAlign: "center", color: Colors.white }}>Invoice</Text>
                </TouchableOpacity>
                <List.Section>
                    <List.Accordion style={{ paddingVertical: -10 }} title="Quaterly Bonus VREITS" titleStyle={{ fontWeight: "bold", color: Colors.primary, backgroundColor: "transparent" }}>
                        <FlatList data={item.quarters} renderItem={({ item }) => (
                            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', backgroundColor: item.shifted == 1 ? "#bfbfbf" : "transparent", padding: 5, borderRadius: 4 }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={require('../../../../Assets/vector.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={{ fontWeight: 'bold' }}>Quater Date:</Text>
                                    <Text style={{ color: "#666262" }}>{item.date}</Text>
                                </View>
                                <View style={{ flex: 2 }}>
                                    <Text style={{ fontWeight: 'normal' }}>VREIT: {item.quarter_vreits}</Text>
                                    {item.shifted === 1 ?
                                        <TouchableOpacity onPress={() => { navigation.navigate("Withdrawal") }}>
                                            <Text style={{ backgroundColor: item.shifted == 1 ? "#635e5e" : "green", color: "white", borderRadius: 5, alignSelf: "flex-start", paddingHorizontal: 10 }}>Vreits Shifted</Text>
                                        </TouchableOpacity>
                                        : item.assigned ?
                                            <TouchableOpacity onPress={() => { ShiftVreit(item, res) }}>
                                                <Text style={{ backgroundColor: item.shifted == 1 ? "#635e5e" : "green", color: "white", borderRadius: 5, alignSelf: "flex-start", paddingHorizontal: 10 }}>Shift VREITs</Text>
                                            </TouchableOpacity>
                                            : null
                                    }
                                </View>
                            </View>
                        )} />
                    </List.Accordion>
                </List.Section>
            </View>
        )
    }
    // console.log("Purchases========",purchases)
    const onRefresh = async () => {
        await getData();
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader animating={isloading} />
        {showview ==true ?
            <View style={{flex:1}}>
               
            <View>
                <FlatList
                    horizontal={true}
                    data={DATA}
                    renderItem={renderItem}
                />
            </View>
            <View style={{ flex: 1, marginBottom: 10 }}>
                <FlatList
                    data={purchases}
                    renderItem={renderItem2}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
            <Dialogs visible={visible} onPress={() => { setVisible(false) }} title={"Description"}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 12, alignItems: "center", marginTop: 10 }}>
                </View>
                <View>
                    <DoubleText text1={"Assigned Vreits"} text2={items.assigned_vreits ? items.assigned_vreits : "0"} />
                    <DoubleText text1={"Bonus Vreits"} text2={items.bonus_vreits ? items.bonus_vreits : "0"} />
                    <DoubleText text1={"Shifted Vreits"} text2={items.shifted_vreits ? items.shifted_vreits : "0"} />
                    <DoubleText text1={"Pin Number"} text2={items.purchase_code ? items.purchase_code : "Not Available"} />
                    <DoubleText text1={"Start On"} text2={items.start_at ? items.start_at.slice(0, 10) : "Not Available"} />
                    <DoubleText text1={""} text2={items.start_at ? items.start_at.slice(11, 19) : null} />
                    <DoubleText text1={"Expiry On"} text2={items.expiry_date ? items.expiry_date.slice(0, 10) : "Not Available"} />
                    <DoubleText text1={""} text2={items.expiry_date ? items.expiry_date.slice(11, 19) : null} />
                </View>
            </Dialogs>

                    <Dialogs visible={visible1} onPress={() => { setVisible1(false) }} title={"Package Exit Confirmation"}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 12, alignItems: "center", marginTop: 10 }}>
                        </View>
                        <View>
                            <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "red", marginHorizontal: 10, padding: 10, borderRadius: 8 }}>
                                <Text style={{ color: Colors.white, textAlign: "justify" }}><Text style={{fontWeight:"bold"}}>Are you Sure!:</Text> By clicking EXIT, you are agreeing to withdraw from the position, compensation plan, V-“1 Club membership and all the other benefits.</Text>
                            </View>
                            <TextInput
                            style={{borderWidth:1,borderRadius:5,margin:10,padding:Platform.OS =="android"?10:10}}
                            placeholder="Add Details"
                            value={exitdetail}
                            onChangeText={(text)=>{setExitdetail(text)}}
                            />
                            <TouchableOpacity onPress={()=>{ExitPackage()}} style={{backgroundColor:"grey",alignSelf:"center",margin:10,borderRadius:5,padding:10}}>
                                <Text style={{color:"white"}}>Exit Package</Text>
                            </TouchableOpacity>
                        </View>
                    </Dialogs>
            </View>
        :<View></View>}
        </SafeAreaView>
    )
}
export default Quarterly_vreits;
