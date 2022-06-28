import Toast from "react-native-simple-toast";
import Loader from "../../../../utilis/Loader";
import React, { useEffect, useState } from "react";
import Colors from "../../../../Style_Sheet/Colors";
import { Text, View, SafeAreaView, ScrollView, RefreshControl, TouchableOpacity, FlatList } from "react-native";
import { getSeededWithdrawal } from "../../../../utilis/Api/Api_controller";
import Timer from "../../../../Zextra/Timer";

const EscrowAlert = ({ navigation }) => {

    const [isloading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false)
    const [apiData, setApiData] = useState([]);
    const [time, setTime] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(async () => { await getData(); }, []);

    const getData = async () => {
        setLoading(true)
        let response = await getSeededWithdrawal();
        if (response !== "Error") {
            if (response.data.status === true) {
                const data = Object.values(response.data.seed_withdrawal_details)
                setApiData(data)
                console.log("Array Form============", Object.values(response.data.seed_withdrawal_details))
                setRefreshing(!refreshing)
                setLoading(false);
            }
            else if (response.data.status == true && response.data.transaction_password == false) {
                navigation.navigate("SetTransactionPassword", { screen: "Vreit_Transfer" })
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

    const onRefresh = async () => { await getData(); }


    const renderItem = ({ item, index }) => {

        return (
            <View style={{ flex: 1, margin: 10, borderColor: Colors.primary, borderRadius: 5, padding: 5 }}>
                <View style={{ borderWidth: 1, borderRadius: 5 }}>
                    <Text style={{ fontWeight: "bold", color: "white", backgroundColor: "black", borderRadius: 5, overflow: "hidden", padding: 10, marginBottom: 10 }}>Invoice# {item.invoice}</Text>
                    <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
                        <Timer date={item.assigned_date} />
                    </View>
                    <View style={{ flexDirection: "row", margin: 5, justifyContent: "space-between" }}>
                        <View style={{ backgroundColor: "gray", padding: 5, }}>
                            <Text style={{ color: "white" }}>Seeded Points</Text>
                            <Text style={{ fontWeight: "bold", color: "gray", overflow: "hidden", backgroundColor: "white", paddingVertical: 5, borderRadius: 5, textAlign: "center" }}>{item.seed_points}</Text>
                        </View>
                        <View style={{ backgroundColor: "gray", padding: 5, }}>
                            <Text style={{ color: "white" }}>Seeded Rate</Text>
                            <Text style={{ fontWeight: "bold", color: "gray", overflow: "hidden", backgroundColor: "white", paddingVertical: 5, borderRadius: 5, textAlign: "center" }}>{item.vreit_rate}</Text>
                        </View>
                        <View style={{ backgroundColor: "gray", padding: 5, }}>
                            <Text style={{ color: "white" }}>Seeded Amount</Text>
                            <Text style={{ fontWeight: "bold", color: "gray", overflow: "hidden", backgroundColor: "white", paddingVertical: 5, borderRadius: 5, textAlign: "center" }}>{item.seed_amount}</Text>
                        </View>
                    </View>

                    <Text style={{ textAlign: "center" }}> Your seed amount can be swapped after 72 hours</Text>

                </View>
            </View>
        )

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader animating={isloading} />
            <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
                {!apiData.length ?
                    <View style={{backgroundColor:"gray",borderWidth:1,borderRadius:5,overflow:"hidden",margin:10,padding:10,}} >
                        <Text style={{textAlign:"center",fontWeight:"bold",color:"white"}}>Empty Escrow</Text>
                    </View> 
                    :
                    <View refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>

                        <View style={{ flex: 1, backgroundColor: "#d4d0d0", marginVertical: 10, marginHorizontal: 10, borderRadius: 5, overflow: 'hidden', }}>
                            <Text style={{ backgroundColor: "black", color: "white", paddingLeft: 10, paddingVertical: 10, fontWeight: "bold", borderTopLeftRadius: 5, borderTopRightRadius: 5, overflow: "hidden" }}>Escrow Alert</Text>
                            <FlatList
                                data={apiData}
                                renderItem={renderItem}
                                style={{ flex: 1, }}
                                contentContainerStyle={{ marginVertical: 20, paddingBottom: 20, }}
                            />
                        </View>

                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}
export default EscrowAlert;
