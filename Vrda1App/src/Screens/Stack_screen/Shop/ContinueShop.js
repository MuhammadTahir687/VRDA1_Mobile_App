import React, { useEffect, useRef, useState,useCallback } from "react";
import { View, Text, FlatList,TouchableOpacity, SafeAreaView, ScrollView, Image, Platform, RefreshControl } from "react-native";
import Colors from "../../../Style_Sheet/Colors";
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Btn } from "../../../utilis/Btn";
import DoubleText from "../../../utilis/DoubleText";
import { getShop, sendShopPayment, sendShopSubmit } from "../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Notes from "../../../Zextra/Note";
import Alert from "../../../Zextra/Alert";
import Loader from "../../../utilis/Loader";
import { FormInput } from "../../../utilis/Text_input";
import Dropdown from "../../../utilis/Picker/Picker";
import Clipboard from "@react-native-community/clipboard";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { BuyValidation, ShopValidation } from "../../../utilis/validation";
import CheckBox from "../../../utilis/Checkbox";
import styles from '../../../Style_Sheet/style';
import RNFetchBlob from 'rn-fetch-blob';
import { useIsFocused } from "@react-navigation/native";
import { get_request } from "../../../utilis/Api/Requests";
import { useFocusEffect } from '@react-navigation/native';


const ContinueShop = ({ navigation,route }) => {
    const continuedata=route.params.data;
    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [isloading, setLoading] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [view, setView] = useState(false)
    const[focus,setfocus]=useState()
   
   
    useEffect(async () => { await getShopData(); }, [isFocused]);
   
   
    const getShopData = async () => {
        setLoading(true)
            let response = await get_request("/api/buy-packages-list/" + route.params.data.shop)
        if (response !== "Error") {
            if (response.data.status == true && response.data.email_status == true) {
                setView(true)
                setData(response.data.packages);
                setRefreshing(!refreshing)
                setLoading(false);  
            }
            else if (response.data.status == true && response.data.email_status == false) {
                setLoading(false)
                navigation.reset({ index: 0, routes: [{ name: "Bad Email", params: { data } }] });

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


    const renderItem = ({ item, index }) => (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => { 
                setfocus(item)
                navigation.navigate("ContinueShopDetail",{data:item,PackageID:item.package_id,Escrow:continuedata})
                }} style={{ flex: 1, marginHorizontal: 5 }}>
                <LinearGradient colors={['#333232', '#a9a6a6']} style={{ paddingHorizontal: 15, borderRadius: 10, margin: 4, flex: 1 }}>
                    <View style={{ padding: 10 }}>
                        <Text style={{ fontWeight: "bold", color: Colors.white, fontSize: 18 }}>{item.package_name}</Text>
                        <Text style={{ color: Colors.white, marginBottom: (item.subscription == 0 ? 80 : 0) }}>${item.package_price ? item.package_price : "0"}</Text>
                        {item.subscription != 0 && <Text style={{ textAlign: "center", marginVertical: 40, padding: 7, borderRadius: 5, borderWidth: 1, borderColor: Colors.white, color: Colors.white, fontSize: 12 }}>Subscription ${item.subscription}</Text>}
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: Colors.primary, overflow: "hidden", borderRadius: 6, fontSize: 10, color: Colors.white }}>{item.extra_tokens ? item.extra_tokens : "0"}%</Text>
                            <Text style={{ color: Colors.white, fontSize: 11 }}>  VREIT Bonus Point</Text>
                        </View>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
  
    const onRefresh = async () => {
        await getShopData();
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Loader animating={isloading} />
            <FlatList
                ItemSeparatorComponent={Platform.OS !== 'android' && (({ highlighted }) => (<View style={[highlighted && { marginLeft: 0 }]} />))}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh} />
                }
            />
        </SafeAreaView>
    )
}
export default ContinueShop;
