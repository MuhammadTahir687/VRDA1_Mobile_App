import React, {useEffect, useState} from "react";
import { View } from "react-native";
import { Calendar, CalendarList, Agenda, CalendarProvider, Timeline, ExpandableCalendar } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Cal() {
    const [currentDate,setCurrentDate]=useState('')
    useEffect(async () => {date()}, []);
    const date = () => {
        var a = new Date().getDate();
        var b = new Date().getMonth()+1;
        var c = new Date().getFullYear();
        setCurrentDate(c+'-'+b+'-'+a)
    }
    return (
        <View>
            <CalendarProvider date={currentDate}
                              style={{backgroundColor:"#000",marginVertical:10,marginHorizontal:10}}
            >
                <ExpandableCalendar
                    firstDay={1}
                    theme={{
                        todayButtonTextColor: "white",
                        todayBackgroundColor:"black",
                        backgroundColor: 'black',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: 'black',
                        selectedDayTextColor: 'white',
                        todayTextColor: '#ffffff',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#000',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#000',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: '#000',
                    }}
                />
            </CalendarProvider>
        </View>
    );
}
