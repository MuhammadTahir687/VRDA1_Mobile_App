import moment from 'moment';
import Loader from "../../utilis/Loader";
import Colors from '../../Style_Sheet/Colors';
import React, {useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';
import {getDashboard, } from "../../utilis/Api/Api_controller";
import {get_data, save_data} from "../../utilis/AsyncStorage/Controller";
import { ExpandableCalendar, Timeline, CalendarProvider } from 'react-native-calendars';
import {SafeAreaView, ScrollView, Text, ImageBackground, View, FlatList, Dimensions, Platform,} from 'react-native';
import Toast from "react-native-simple-toast";

const deviceHeight = Dimensions.get('screen').height;
const deviceWidth = Dimensions.get('screen').width;
const Dashboard = () => {
    const [isloading,setLoading]=useState(false);
    const [currentDate,setCurrentDate]=useState("");
    const [leftBV,setLeftBV]=useState("");
    const [rightBV,setRightBV]=useState("");
    const [leftCF,setLeftCF]=useState("");
    const [rightCF,setRightCF]=useState("");
    const [VREITPoint,setVREITPoint]=useState("");
    const [VREITBonus,setVREITBonus]=useState("");
    const [weeklyReserve,setWeeklyReserve]=useState("");
    const [weeklyEarned,setWeeklyEarned]=useState("");
    const [totalEarned,setTotalEarned]=useState("");
    const getCurrentDate=()=>{
        const date = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        return year + '-' + month + '-' +date;//format: yyyy-mm-dd;
    }
    const renderEmptyItem=()=> {
        return (
            <View style={{paddingLeft: 20, height: 52, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#e8ecf0'}}>
                <Text style={{color: '#79838a',fontSize: 14}}>No Events Planned</Text>
            </View>
        );
    }
    const renderItem = ({ item }) => {if (_.isEmpty(item)) {return renderEmptyItem();}}
    const onDateChanged = (date) => {setCurrentDate(getCurrentDate())};
    const onMonthChange = (/* month, updateSource */) => {
        // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
    };
    const Data = [
        {price: leftBV, name: 'LEFT BV'},
        {price: rightBV, name: 'Right BV'},
        {price: leftCF, name: 'Left CF'},
        {price: rightCF, name: 'Right CF'},
        {price: VREITPoint, name: 'Vreit Point'},
        {price: VREITBonus, name: 'Vreit Bonus'},
        {price: weeklyReserve, name: 'Weekly Reserve'},
        {price: weeklyEarned, name: 'Weekly Earned'},
        {price: totalEarned, name: 'Total Earned'},
    ]
    const EVENTS= [
        {start: '2021-01-15 22:30',title: 'Dr. nauman',summary: '3412 Piedmont Rd NE, GA 3032',color: '#e6add8',selected: true, marked: true, selectedColor: 'blue',id: 2},
        {start: '2017-09-07 00:30', end: '2017-09-07 01:30', title: 'Visit Grand Mother', summary: 'Visit Grand Mother and bring some fruits.', color: '#ade6d8', marked: true, dotColor: 'red', activeOpacity: 0},
        {start: '2017-09-07 02:30', end: '2017-09-07 03:20', title: 'Meeting with Prof. Behjet Zuhaira', summary: 'Meeting with Prof. Behjet at 130 in her office.', color: '#e6add8'},
        {start: '2017-09-07 04:10', end: '2017-09-07 04:40', title: 'Tea Time with Dr. Hasan', summary: 'Tea Time with Dr. Hasan, Talk about Project'},
        {start: '2017-09-07 01:05', end: '2017-09-07 01:35', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032'},
        {start: '2017-09-07 14:30', end: '2017-09-07 16:30', title: 'Meeting Some Friends in ARMED', summary: 'Arsalan, Hasnaat, Talha, Waleed, Bilal', color: '#d8ade6'},
        {start: '2017-09-08 01:40:00', end: '2017-09-08 02:25:00', title: 'Meet Sir Khurram Iqbal', summary: 'Computer Science Dept. Comsats Islamabad', color: '#e6bcad'},
        {start: '2017-09-08 04:10:00', end: '2017-09-08 04:40:00', title: 'Tea Time with Colleagues', summary: 'WeRplay'},
        {start: '2017-09-08 00:45:00', end: '2017-09-08 01:45:00', title: 'Lets Play Apex Legends', summary: 'with Boys at Work'},
        {start: '2017-09-08 11:30:00', end: '2017-09-08 12:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032'},
        {start: '2017-09-10 12:10:00', end: '2017-09-10 13:45:00', title: 'Merge Request to React Native Calendards', summary: 'Merge Timeline Calendar to React Native Calendars'}
    ]
    const getMarkedDates = () => {
        const marked = {};
        EVENTS.forEach(item => {marked[item.start.split(' ')[0]] = { marked: true, dotColor: item.color }});
        return JSON.parse(JSON.stringify(marked));
    };
    const getTheme = () => {
        const themeColor = Colors.black;
        const lightThemeColor = Colors.primary;
        const disabledColor = '#a6acb1';
        const black = Colors.black;
        const white = Colors.white;
        const themeBack = Colors.primary;
        const Black1 = Colors.primary
        return {
            // arrows
            arrowColor: Black1, arowStyle: { padding: 0 },
            // month
            monthTextColor: Black1, textMonthFontSize: 16, textMonthFontFamily: 'HelveticaNeue', textMonthFontWeight: 'bold',
            // day names
            textSectionTitleColor: black, textDayHeaderFontSize: 14, textDayHeaderFontFamily: 'HelveticaNeue', textDayHeaderFontWeight: 'bold',
            // today
            todayBackgroundColor: lightThemeColor, todayTextColor: themeColor,
            // dates
            dayTextColor: themeColor, textDayFontSize: 18, textDayFontFamily: 'HelveticaNeue', textDayFontWeight: '500', textDayStyle: { marginTop: Platform.OS === 'android' ? 2 : 4 },
            // selected date
            selectedDayBackgroundColor: themeBack, selectedDayTextColor: white,
            // disabled date
            textDisabledColor: disabledColor,
            //   dot (marked date)
            dotColor: themeColor, selectedDotColor: white, disabledDotColor: disabledColor, dotStyle: { marginTop: -2 }
        };
    };

    useEffect(async ()=>{
        await getallData();
    },[]);

    const getallData=async ()=>{
        setLoading(true)
        let response = await getDashboard()
        if (response !== "Error") {
            if (response.data.status == true) {
                setLeftBV(response.data.data.lbv);
                setRightBV(response.data.data.rbv);
                setLeftCF(response.data.data.lcf);
                setRightCF(response.data.data.rcf);
                setVREITPoint(response.data.data.earned_sto);
                // setVREITBonus(response.data.data.);
                setWeeklyReserve(response.data.data.reserve);
                setWeeklyEarned(response.data.data.earning);
                setTotalEarned(response.data.data.earned);
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
    return (
        <SafeAreaView style={{flex: 1}}>
            <Loader animating={isloading}/>
            <View style={{backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                <ScrollView>
                    <View style={{margin: 20}}>
                        <FlatList
                            data={Data}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            renderItem={({item, index}) =>
                                <ImageBackground borderRadius={12} style={{width: deviceWidth / 2.4, margin: 5, height: deviceHeight / 9}} source={require('../../Assets/Box.png')}>
                                    <View style={{margin: 15, alignSelf: 'flex-end'}}>
                                        <Text style={{color: Colors.white, fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
                                        <Text style={{color: Colors.white, fontWeight: 'bold',}}>{parseFloat(item.price).toFixed(2)}</Text>
                                    </View>
                                </ImageBackground>
                            }/>
                        <Text style={{color: Colors.primary, fontWeight: 'bold', marginVertical: 10, marginTop: 45}}>For the Rank Achievement</Text>
                        <View style={{backgroundColor:Colors.white,borderRadius:15,elevation:6,shadowOpacity:0.1,shadowOffset:({height:0,width:0}),padding:25,marginVertical:10}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text>Achieved Left BV </Text>
                                <Text style={{fontSize: 10}}>0.0%</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Progress.Bar width={deviceWidth / 1.4} progress={0.8} color={Colors.primary} backgroundColor={Colors.secondary} borderColor={Colors.secondary} marginVertical={5}/>
                                <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: 16}}> 87%</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 10}}>Remaining Points 2.0</Text>
                                <Text style={{fontSize: 10}}>Require Left Points 2.0 </Text>
                            </View>
                        </View>
                        <View style={{backgroundColor: Colors.white,borderRadius: 15,elevation: 6,shadowOpacity: 0.1,shadowOffset: ({height: 0, width: 0}),padding: 25,marginVertical: 10}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text>Achieved Left BV </Text>
                                <Text style={{fontSize: 10}}>0.0%</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Progress.Bar width={deviceWidth / 1.4} progress={0.1} color={Colors.primary} backgroundColor={Colors.secondary} borderColor={Colors.secondary} marginVertical={5}/>
                                <Text style={{color: Colors.primary, fontWeight: 'bold', fontSize: 16}}> 37%</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Text style={{fontSize: 10}}>Remaining Points 2.0</Text>
                                <Text style={{fontSize: 10}}>Require Left Points 2.0 </Text>
                            </View>
                        </View>
                        <Text style={{color: Colors.primary, fontWeight: 'bold', marginVertical: 10, marginTop: 45}}>VRDA1 Events</Text>
                        <View>
                            <CalendarProvider
                                // date={this.state.EVENTS[0].title}
                                // showTodayButton
                                // todayBottomMargin={16}
                                date={currentDate}
                                onDateChanged={onDateChanged}
                                onMonthChange={onMonthChange}
                                theme={{ todayButtonTextColor: '#0059ff' }}
                                renderItem={renderItem}
                                disabledOpacity={0.6}>
                                <ExpandableCalendar
                                    firstDay={1}
                                    markedDates={EVENTS.color}
                                    markingType={'dot'}
                                    markedDates={getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
                                    theme={getTheme()}
                                    headerStyle={{paddingHorizontal:20}} // for horizontal only
                                />
                                <Timeline
                                    format24h={true}
                                    // eventTapped={(e) => { this.props.navigation.navigate("CalendarEventOpen", { data: e }) }}
                                    eventTapped={(e) => {console.log(e);} }
                                    events={EVENTS.filter(event => moment(event.start).isSame(currentDate, 'day'))}
                                />
                            </CalendarProvider>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default Dashboard;
