// import XDate from 'xdate';
// import Calender from "./Calender";
// import {sameDate} from "./sameDate";
import Loader from "../../utilis/Loader";
import PBar from "../../Zextra/Progressbar";
import Colors from "../../Style_Sheet/Colors";
import Toast from "react-native-simple-toast";
import React, {useEffect, useState} from 'react';
import {getDashboard} from "../../utilis/Api/Api_controller";
import Timeline from 'react-native-timeline-flatlist';
import Hyperlink from 'react-native-hyperlink'
import {SafeAreaView,ScrollView,useWindowDimensions,Text,ImageBackground,View,FlatList,Dimensions,Platform,RefreshControl} from 'react-native';
import Dialogs from "../../utilis/Dialog";
import AsyncStorage from "@react-native-community/async-storage";
import Bad_Email from "./BadEmail/BadEmail";
import RNPickerDialog from 'rn-modal-picker';
import RenderHtml from 'react-native-render-html';
import { color } from "react-native-reanimated";
import { List } from 'react-native-paper';
import Ionicons from "react-native-vector-icons/Ionicons";

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;


const Dashboard = ({navigation}) => {
    const { width } = useWindowDimensions();
    const [event,setEvent]=useState([]);
    const [items,setItems]=useState("");
    const [leftCF,setLeftCF]=useState(0);
    const [leftBV,setLeftBV]=useState(0);
    const [rightCF,setRightCF]=useState(0);
    const [rightBV,setRightBV]=useState(0);
    const [VREITBonus,setVREITBonus]=useState(0);
    const [isloading,setLoading]=useState(false);
    const [VREITPoint,setVREITPoint]=useState(0);
    const [visible, setVisible] = useState(false);
    const [totalEarned,setTotalEarned]=useState(0);
    // const [currentDate,setCurrentDate]=useState("");
    const [requiredLeft,setRequiredLeft]=useState(0);
    const [achievedLeft,setAchievedLeft]=useState(0);
    const [weeklyEarned,setWeeklyEarned]=useState(0);
    const [weeklyReserve,setWeeklyReserve]=useState(0);
    const [achievedRight,setAchievedRight]=useState(0);
    const [remainingLeft,setRemainingLeft]=useState(0);
    const [requiredRight,setRequiredRight]=useState(0);
    const [remainingRight,setRemainingRight]=useState(0);
    const [apiData,setApiData]=useState("");
    const [currentRank,setCurrentRank]=useState("");
    const [nextRank,setNextRank]=useState("");
    const [refreshing,setRefreshing]=useState(false);
    const [news,setNews]=useState("")
    const [view,setView]=useState(false)
    
    // const date = () => { var a = new Date().getDate()-1; var b = new Date().getMonth()+1; var c = new Date().getFullYear(); setCurrentDate(c+'-'+b+'-'+a) }
    const Data = [
        {price: leftBV, name: 'LEFT BV'}, {price: rightBV, name: 'Right BV'}, {price: leftCF, name: 'Left CF'},
        {price: rightCF, name: 'Right CF'}, {price: VREITPoint, name: 'Vreit Point'}, {price: VREITBonus, name: 'Vreit Bonus'},
        {price: weeklyReserve, name: 'Weekly Reserve'}, {price: weeklyEarned, name: 'Weekly Earned'}, {price: totalEarned, name: 'Total Earned'},
    ]
    // const EVENTS = event.map(item =>({ start:item.event_start,end:item.event_end,title:item.event_title,summary:item.description,color:"#585555"}))
    useEffect(async ()=>{ await getallData(); /*/ await date();/*/ },[]);
    const getallData=async ()=>{
        setLoading(true)
        let response = await getDashboard()
        if (response !== "Error") {
            if (response.data.status == true && response.data.email_status==true) {
                setView(true)
                console.log("alert=====",response.data.data.alert_news)
                var res=response.data.data;
                var resL=response.data.data.next_achievement.next_left_rank;
                var resR=response.data.data.next_achievement.next_right_rank;
                setLeftBV(res.lbv); setRightBV(res.rbv); setLeftCF(res.lcf); setRightCF(res.rcf); setVREITPoint(res.earned_sto);
                setVREITBonus(res.reward); setWeeklyReserve(res.reserve); setWeeklyEarned(res.earning);setTotalEarned(res.earned);
                setAchievedLeft(resL.achieved);setRemainingLeft(resL.remaining_points);setRequiredLeft(resL.required_points)
                setAchievedRight(resR.achieved);setRemainingRight(resR.remaining_points);setRequiredRight(resR.required_points),
                setEvent(res.events);setApiData(res);setCurrentRank(res.next_achievement.current_rank);setNextRank(res.next_achievement.next_rank)
                setRefreshing(!refreshing)
                setNews(response.data.data.alert_news)
                setLoading(false);

            }
            else if(response.data.status == true && response.data.email_status==false){
                setView(false)
                console.log("response api====",response.data.user)
                const data=response.data.user;
                navigation.reset({index: 0,routes: [{ name: "Bad Email",params:{data} }]});
                setLoading(false)
                
            }
            else  {
                Toast.show("Something Went Wrong !", Toast.LONG);
                setLoading(false);
            }
        }else {
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
            AsyncStorage.getAllKeys()
                .then(keys => AsyncStorage.multiRemove(keys)).then(() => navigation.reset({ index: 0, routes: [{ name: "Login" }], }));
        }
    }
    const onRefresh = async () => {
        await getallData();
    }
    
    const source = {
        html: news.message
    }



    return (
        <SafeAreaView style={{flex: 1}}>
            <Loader animating={isloading}/>
        {view==true?  <View style={{backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                <ScrollView nestedScrollEnabled={true}
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={onRefresh} />
                    }>
                    <View style={{margin: 20}}>
                        <FlatList
                            data={Data}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({item, index}) =>
                                <ImageBackground borderRadius={12} style={{width: deviceWidth / 2.4, margin: 5, height: deviceHeight / 9}} source={require('../../Assets/Box.png')}>
                                    {/* <View>
                                        <Ionicons name="stats-chart" color={"white"} size={32}/>
                                    </View> */}
                                    <View style={{margin: 15, alignSelf: 'flex-end'}}>
                                        <Text style={{color: Colors.white, fontWeight: 'bold', fontSize: 16}}>{item.name?item.name:null}</Text>
                                        <Text style={{color: Colors.white, fontWeight: 'bold',}}>{item.price?parseFloat(item.price).toFixed(2):"0"}</Text>
                                    </View>
                                </ImageBackground>
                            }/>
                        <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
                            <View style={{width:deviceWidth/3.2,marginTop:25,elevation:6,shadowOpacity:0.1,shadowOffset:({height:0,width:0}),backgroundColor:Colors.white,paddingVertical:10,paddingHorizontal:15,borderRadius:8,alignItems:"center",justifyContent:"center"}}>
                                <Text style={{fontWeight:"bold"}}>Current Rank</Text>
                                <Text style={{fontSize:12}}>{currentRank.rank_name}</Text>
                            </View>
                            <View style={{width:deviceWidth/3.2,marginTop:25,elevation:6,shadowOpacity:0.1,shadowOffset:({height:0,width:0}),backgroundColor:Colors.white,paddingVertical:10,paddingHorizontal:15,borderRadius:8,alignItems:"center",justifyContent:"center"}}>
                                <Text style={{fontWeight:"bold"}}>Package</Text>
                                <Text style={{fontSize:12}}>{apiData.current_package}</Text>
                            </View>
                            <View style={{width:deviceWidth/3.2,marginTop:25,elevation:6,shadowOpacity:0.1,shadowOffset:({height:0,width:0}),backgroundColor:Colors.white,paddingVertical:10,paddingHorizontal:15,borderRadius:8,alignItems:"center",justifyContent:"center"}}>
                                <Text style={{fontWeight:"bold"}}>Next Rank</Text>
                                <Text style={{fontSize:12}}>{nextRank.rank_name}</Text>
                            </View>
                        </View>

                        {news.message == undefined ?
                            <View></View> :
                            <View style={{ borderWidth: 1, overflow: "hidden", borderRadius: 5, marginTop: 15 }}>
                              
                                <List.Accordion
                                    theme={{ colors: { background: 'yellow',color:"white" }, roundness: 10 }}
                                    style={{ borderRadius: 10, paddingVertical: -10 }} title="News Alert"  left={props => <List.Icon {...props} color="black" icon="bell" />} titleStyle={{ fontWeight: "bold", color: 'black', backgroundColor: "transparent", }}>
                                 <View style={{paddingHorizontal:10}}>
                                        <RenderHtml
                                            contentWidth={width}
                                            source={source}
                                        />

                                </View>
                                   
                                </List.Accordion>
                            </View>
                        } 

                      
                         
                    


                        <Text style={{color: Colors.primary, fontWeight: 'bold', marginVertical: 10, marginTop: 25}}>For the Rank Achievement</Text>
                        <PBar heading={"Achieved Left BV "} value={achievedLeft?parseFloat(achievedLeft).toFixed(0)/100:0} progressValue={achievedLeft?parseFloat(achievedLeft).toFixed(2):0} Remaining={remainingLeft?parseFloat(remainingLeft).toFixed(1):0} Require={requiredLeft?"Left Points "+parseFloat(requiredLeft).toFixed(1):0}/>
                        <PBar heading={"Achieved Right BV "} value={achievedRight?parseFloat(achievedRight).toFixed(0)/100:0} progressValue={achievedRight?parseFloat(achievedRight).toFixed(2):0} Remaining={remainingRight?parseFloat(remainingRight).toFixed(1):0} Require={requiredRight?"Right Points "+parseFloat(requiredRight).toFixed(1):0}/>
                        <Text style={{color: Colors.primary, fontWeight: 'bold', marginVertical: 10,marginTop: 25}}>VRDa1 Events</Text>
                        {/*<Calender/>*/}
                        <Timeline
                            data={event.map(obj => ({time: obj.event_start, title:obj.event_title,description:obj.description}))}
                            circleSize={20}
                            circleColor="pink"
                            lineColor="rgb(45,156,219)"
                            timeContainerStyle={{minWidth: 52}}
                            timeStyle={{textAlign: 'center', backgroundColor: Colors.primary, color: 'white', padding: 5, borderRadius: 13, fontSize: 12}}
                            descriptionStyle={{fontSize:(Platform.OS=="ios")?0.0001:0}}
                            options={{style: {paddingTop: 5}}}
                            innerCircle={'dot'}
                            onEventPress={(item) => {setVisible(true), setItems(item.description)}}
                            separator={false}
                            detailContainerStyle={{marginBottom: 20, paddingHorizontal: 5, backgroundColor: "#BBDAFF", borderRadius: 10,}}
                            columnFormat="two-column"
                        />
                        <Dialogs visible={visible} onPress={() => { setVisible(false) }} title={"Description"}>
                            <Hyperlink linkDefault={ true } linkStyle={ { color: '#2980b9', fontSize: 16,textDecorationLine:"underline" } }>
                                <Text style={{paddingHorizontal:15}}>{items.replace(/&(nbsp|amp|quot|lt|gt);/g," ")}</Text>
                            </Hyperlink>
                        </Dialogs>
                    </View>
                </ScrollView>
            </View> : <View></View>}
        </SafeAreaView>
    )
}
export default Dashboard;
