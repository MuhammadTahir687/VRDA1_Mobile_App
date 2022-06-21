import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, RefreshControl } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { List } from 'react-native-paper';
import { getVreitQuaterly, sendVreitShiftedBtn } from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Colors from "../../../../Style_Sheet/Colors";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DoubleText from "../../../../utilis/DoubleText";
import Dialogs from "../../../../utilis/Dialog";
import Loader from "../../../../utilis/Loader";
import { get_data } from "../../../../utilis/AsyncStorage/Controller";

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
    const [apiData, setApiData] = useState("")
    const [refreshing, setRefreshing] = useState(false);
    const [packages, setPackages] = useState("");
    const [cureentvreitprice, setCureentvreitprice] = useState("")
    const [showview, setShowview] = useState(false);
    const [user,setUser]=useState("")
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
                console.log("^^^^^^^^^",res.data.data.current_vreit_price)
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
            user_id: user.id,
        };
        setLoading(true)
        let response = await sendVreitShiftedBtn(body)
        console.log("Body==========",body)
        console.log("Response===========",response.data)
        if (response !== "Error") {
            if (response.data.status == true) {
                setLoading(false);
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
        console.log("dhfvhdjsvf",res.purchase_price)
        return (
            <View style={{ borderWidth: 1, borderColor: Colors.primary, borderRadius: 5,  overflow: 'hidden',marginHorizontal: 10, paddingHorizontal: 8, paddingTop: 5, marginBottom: 5,overflow:"hidden"}}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>{index + 1} : Invoice : </Text>
                    <Text style={{ color: "#7f7878" }}>( ${parseFloat(res.purchase_price).toFixed(5)} )</Text>
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
                    <DoubleText text1={"Start At"} text2={items.start_at ? items.start_at.slice(0, 10) : "Not Available"} />
                    <DoubleText text1={""} text2={items.start_at ? items.start_at.slice(11, 19) : null} />
                    <DoubleText text1={"Expiry At"} text2={items.expiry_date ? items.expiry_date.slice(0, 10) : "Not Available"} />
                    <DoubleText text1={""} text2={items.expiry_date ? items.expiry_date.slice(11, 19) : null} />
                </View>
            </Dialogs>
            </View>
        :<View></View>}
        </SafeAreaView>
    )
}
export default Quarterly_vreits;
