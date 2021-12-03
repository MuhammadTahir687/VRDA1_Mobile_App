import React, {useEffect, useState} from "react";
import {Text, View, SafeAreaView, TouchableOpacity, FlatList} from "react-native";
import {sendTeamSale} from "../../../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";
import Colors from "../../../../Style_Sheet/Colors";
import Loader from "../../../../utilis/Loader";
import Dialogs from "../../../../utilis/Dialog";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import DoubleText from "../../../../utilis/DoubleText";
import DatePicker from 'react-native-datepicker';

const TeamSale = () => {
    const [isloading,setLoading]=useState(false);
    const [visible,setVisible]=useState(false);
    const [data,setData]=useState("");
    const [ids,setIds]=useState("");
    const [date,setDate]=useState(new Date());
    const [start,setStart]=useState("");
    const [end,setEnd]=useState("");

    useEffect(async ()=>{ await startAndEndOfWeek(); },[]);

     const startAndEndOfWeek=async(date)=> {
         setLoading(true)
        const now = date? new Date(date) : new Date();
        now.setHours(0,0,0,0);
        const monday = new Date(now);
        monday.setDate(monday.getDate() - monday.getDay() + 1);
        const weekStart =monday.getFullYear() + "-" + (monday.getMonth() + 1) + "-" + monday.getDate();
        const sunday = new Date(now);
        sunday.setDate(sunday.getDate() - sunday.getDay() + 7);
        const weekEnd =sunday.getFullYear() + "-" + (sunday.getMonth() + 1) + "-" + sunday.getDate();
        let body = {start_week:weekStart, end_week:weekEnd};
        setLoading(true)
        let response = await sendTeamSale(body)
        if (response !== "Error") {
            if (response.data.status === true) {
                setData(response.data.data.bv);
                setLoading(false);
            }else {
                Toast.show("Something Went Wrong !", Toast.LONG);
                setLoading(false);
            }
        }else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
        setStart(weekStart);
        setEnd(weekEnd);
        return [weekStart, weekEnd];
    }

    const renderItem=({item,index})=>(
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>{setVisible(true),setIds(item)}}
            style={{transform: [{ scaleY: -1 }],backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, padding: 10,marginHorizontal:5,marginVertical:2}}>
           {/* <Text style={{ fontSize: 14, color: Colors.white }}>User ({item.used_by.name})</Text>*/}
            <View style={{flexDirection:"row"}}>
                <Text style={{ fontSize: 14, color: Colors.white }}>{index+1}. </Text>
                <View>
                    <Text style={{ fontSize: 14, color: Colors.white }}>Package Name ({item.package_name?item.package_name:null})</Text>
                    <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Closing Date: {item.used_at?item.used_at:null}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
    return(
        <SafeAreaView style={{flex:1}}>
                <Loader animating={isloading}/>
            <Text style={{textAlign:"center",fontWeight:"bold"}}>Team Sale</Text>
            <View style={{backgroundColor:Colors.white,borderRadius:15,elevation:6,shadowOpacity:0.1,shadowOffset:({height:0,width:0}),padding:15,margin:5}}>
                <Text style={{backgroundColor:Colors.primary,color:Colors.white,fontWeight:"bold",padding:6,borderRadius:6}}>Search by week</Text>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginHorizontal:10}}>
                    <View style={{flexDirection:"row",justifyContent:"space-evenly",flex:1,padding:5,borderWidth:1,borderRadius:5}}>
                        <Text>{start}</Text>
                        <Text>to</Text>
                        <Text>{end}</Text>
                    </View>
                    <DatePicker style={{width:30}} date={date} mode="date" placeholder="select date" format="YYYY-MM-DD"
                        maxDate={new Date()} confirmBtnText="Confirm" cancelBtnText="Cancel" showIcon={true}
                        customStyles={{dateInput:{borderWidth:0,height:50,width:170,right:30}, dateText:{marginTop:5,color:'white',fontSize:18}, placeholderText:{marginTop:5,right:10,color:'white',fontSize:18}}}
                        onDateChange={(date) => { startAndEndOfWeek(date);setDate(date);}} hideText={true}
                    />
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id+''+index}
                style={{ flex: 1,transform: [{ scaleY: -1 }]  }}
                contentContainerStyle={{paddingBottom:20, }}
            />
            <Dialogs visible={visible} onPress={()=>{setVisible(false)}} title={"Description"}>
                <DoubleText text1={"User"} text2={ids.usedBy?ids.usedBy:null}/>
                <DoubleText text1={"Package Name"} text2={ids.package_name?ids.package_name:null}/>
                <DoubleText text1={"Side"} text2={ids.position}/>
                <DoubleText text1={"Business Volume"} text2={ids.package_business_volume?ids.package_business_volume:null}/>
                <DoubleText text1={"Date"} text2={ids.used_at?ids.used_at:null}/>
            </Dialogs>
        </SafeAreaView>
    )
}
export default TeamSale;
