import React,{useState, useEffect} from "react";
import {View, Text, SafeAreaView, FlatList, TouchableOpacity, Image} from "react-native";
import CountDown from 'react-native-countdown-component';
import Colors from "../../../Style_Sheet/Colors";
import Dialog from "react-native-dialog";
const Activity_Feeds=()=>{
    const [visible, setVisible] = useState(false);
    const[ Data, setdata] = useState([])

    const data = {
        "data": {
            "logs": {
                "2021-09-13 07:40:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2021-09-13 07:40:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2021-09-06 00:20:00": {
                    "transactions": 8,
                    "total": 104.47229,
                    "closing_date": "2021-09-06 00:20:00",
                    "70 percent": 73.130603,
                    "30 percent": 31.341687
                },
                "2021-08-30 12:15:00": {
                    "transactions": 10,
                    "total": 890.07316,
                    "closing_date": "2021-08-30 12:15:00",
                    "70 percent": 623.051212,
                    "30 percent": 267.021948
                },
                "2021-08-23 00:20:00": {
                    "transactions": 1,
                    "total": 80,
                    "closing_date": "2021-08-23 00:20:00",
                    "70 percent": 56,
                    "30 percent": 24
                },
                "2021-08-16 14:00:00": {
                    "transactions": 1,
                    "total": 2.75845,
                    "closing_date": "2021-08-16 14:00:00",
                    "70 percent": 1.9309149999999997,
                    "30 percent": 0.8275349999999999
                },
                "2021-08-09 00:15:00": {
                    "transactions": 2,
                    "total": 50.3998,
                    "closing_date": "2021-08-09 00:15:00",
                    "70 percent": 35.27986,
                    "30 percent": 15.11994
                },
                "2021-08-02 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2021-08-02 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2021-07-26 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2021-07-26 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2021-07-19 07:40:00": {
                    "transactions": 1,
                    "total": 80,
                    "closing_date": "2021-07-19 07:40:00",
                    "70 percent": 56,
                    "30 percent": 24
                },
                "2021-07-12 05:55:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2021-07-12 05:55:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2021-07-05 06:00:00": {
                    "transactions": 7,
                    "total": 53.49661999999999,
                    "closing_date": "2021-07-05 06:00:00",
                    "70 percent": 37.447633999999994,
                    "30 percent": 16.048985999999996
                },
                "2021-06-28 05:15:00": {
                    "transactions": 3,
                    "total": 560,
                    "closing_date": "2021-06-28 05:15:00",
                    "70 percent": 392,
                    "30 percent": 168
                },
                "2021-06-21 00:00:00": {
                    "transactions": 2,
                    "total": 120,
                    "closing_date": "2021-06-21 00:00:00",
                    "70 percent": 84,
                    "30 percent": 36
                },
                "2021-06-14 00:00:00": {
                    "transactions": 5,
                    "total": 39.80976,
                    "closing_date": "2021-06-14 00:00:00",
                    "70 percent": 27.866831999999995,
                    "30 percent": 11.942927999999998
                },
                "2021-06-07 00:00:00": {
                    "transactions": 8,
                    "total": 524.6686299999999,
                    "closing_date": "2021-06-07 00:00:00",
                    "70 percent": 367.2680409999999,
                    "30 percent": 157.40058899999997
                },
                "2021-05-31 10:15:00": {
                    "transactions": 8,
                    "total": 320,
                    "closing_date": "2021-05-31 10:15:00",
                    "70 percent": 224,
                    "30 percent": 96
                },
                "2021-05-24 00:00:00": {
                    "transactions": 2,
                    "total": 18.77953,
                    "closing_date": "2021-05-24 00:00:00",
                    "70 percent": 13.145671,
                    "30 percent": 5.633859
                },
                "2021-05-17 02:35:00": {
                    "transactions": 10,
                    "total": 222.9694,
                    "closing_date": "2021-05-17 02:35:00",
                    "70 percent": 156.07858,
                    "30 percent": 66.89082
                },
                "2021-05-10 00:00:00": {
                    "transactions": 30,
                    "total": 2819.4329999999995,
                    "closing_date": "2021-05-10 00:00:00",
                    "70 percent": 1973.6030999999996,
                    "30 percent": 845.8298999999998
                },
                "2021-05-03 00:00:00": {
                    "transactions": 2,
                    "total": 33,
                    "closing_date": "2021-05-03 00:00:00",
                    "70 percent": 23.099999999999998,
                    "30 percent": 9.9
                },
                "2021-04-23 00:00:00": {
                    "transactions": 26,
                    "total": 2112,
                    "closing_date": "2021-04-23 00:00:00",
                    "70 percent": 1478.3999999999999,
                    "30 percent": 633.6
                },
                "2021-04-13 00:00:00": {
                    "transactions": 2,
                    "total": 96,
                    "closing_date": "2021-04-13 00:00:00",
                    "70 percent": 67.19999999999999,
                    "30 percent": 28.799999999999997
                },
                "2021-04-05 00:00:00": {
                    "transactions": 2,
                    "total": 48,
                    "closing_date": "2021-04-05 00:00:00",
                    "70 percent": 33.599999999999994,
                    "30 percent": 14.399999999999999
                },
                "2021-03-29 00:00:00": {
                    "transactions": 4,
                    "total": 330,
                    "closing_date": "2021-03-29 00:00:00",
                    "70 percent": 230.99999999999997,
                    "30 percent": 99
                },
                "2021-03-23 00:00:00": {
                    "transactions": 12,
                    "total": 990,
                    "closing_date": "2021-03-23 00:00:00",
                    "70 percent": 693,
                    "30 percent": 297
                },
                "2021-03-15 00:00:00": {
                    "transactions": 7,
                    "total": 438,
                    "closing_date": "2021-03-15 00:00:00",
                    "70 percent": 306.59999999999997,
                    "30 percent": 131.4
                },
                "2021-03-08 00:00:00": {
                    "transactions": 2,
                    "total": 132,
                    "closing_date": "2021-03-08 00:00:00",
                    "70 percent": 92.39999999999999,
                    "30 percent": 39.6
                },
                "2021-03-01 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2021-03-01 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2021-02-22 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2021-02-22 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2021-02-15 00:00:00": {
                    "transactions": 2,
                    "total": 120,
                    "closing_date": "2021-02-15 00:00:00",
                    "70 percent": 84,
                    "30 percent": 36
                },
                "2021-02-08 00:00:00": {
                    "transactions": 2,
                    "total": 114,
                    "closing_date": "2021-02-08 00:00:00",
                    "70 percent": 79.8,
                    "30 percent": 34.199999999999996
                },
                "2020-12-29 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-12-29 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2021-02-01 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2021-02-01 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2021-01-26 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2021-01-26 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2021-01-18 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2021-01-18 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2021-01-11 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2021-01-11 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-12-23 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-12-23 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-12-14 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-12-14 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-12-08 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-12-08 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-11-30 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-11-30 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-11-23 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-11-23 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-11-18 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-11-18 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-11-09 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-11-09 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-11-02 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-11-02 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-10-06 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-10-06 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-09-28 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-09-28 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-09-21 00:00:00": {
                    "transactions": 1,
                    "total": 18,
                    "closing_date": "2020-09-21 00:00:00",
                    "70 percent": 12.6,
                    "30 percent": 5.3999999999999995
                },
                "2020-09-14 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-09-14 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-09-01 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-09-01 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-07-06 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-07-06 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-06-22 00:00:00": {
                    "transactions": 1,
                    "total": 18,
                    "closing_date": "2020-06-22 00:00:00",
                    "70 percent": 12.6,
                    "30 percent": 5.3999999999999995
                },
                "2020-06-16 00:00:00": {
                    "transactions": 23,
                    "total": 1016,
                    "closing_date": "2020-06-16 00:00:00",
                    "70 percent": 711.1999999999999,
                    "30 percent": 304.8
                },
                "2020-04-07 00:00:00": {
                    "transactions": 6,
                    "total": 576,
                    "closing_date": "2020-04-07 00:00:00",
                    "70 percent": 403.2,
                    "30 percent": 172.79999999999998
                },
                "2020-09-08 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-09-08 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-08-26 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-08-26 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-08-10 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-08-10 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-07-29 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-07-29 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-07-20 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-07-20 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-07-12 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-07-12 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-06-29 00:00:00": {
                    "transactions": 0,
                    "total": 0,
                    "closing_date": "2020-06-29 00:00:00",
                    "70 percent": 0,
                    "30 percent": 0
                },
                "2020-06-08 00:00:00": {
                    "transactions": 61,
                    "total": 53699,
                    "closing_date": "2020-06-08 00:00:00",
                    "70 percent": 37589.299999999996,
                    "30 percent": 16109.699999999999
                },
                "2020-06-02 00:00:00": {
                    "transactions": 7,
                    "total": 1002,
                    "closing_date": "2020-06-02 00:00:00",
                    "70 percent": 701.4,
                    "30 percent": 300.59999999999997
                },
                "2020-05-11 00:00:00": {
                    "transactions": 2,
                    "total": 22,
                    "closing_date": "2020-05-11 00:00:00",
                    "70 percent": 15.399999999999999,
                    "30 percent": 6.6
                },
                "2020-03-26 00:00:00": {
                    "transactions": 72,
                    "total": 15571,
                    "closing_date": "2020-03-26 00:00:00",
                    "70 percent": 10899.699999999999,
                    "30 percent": 4671.3
                }
            },
            "next_closing_date": "2021-09-27 05:00"
        }
    }
    const renderItem=({item})=>(
        <TouchableOpacity onPress={()=>{setVisible(true)}} style={{ backgroundColor: Colors.secondary, borderColor: Colors.white, borderRadius: 10, borderBottomWidth: 2, paddingVertical: 10,marginHorizontal:10 ,paddingHorizontal:10}}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 16, color: Colors.white }}>{item.total}</Text>
            </View>
            <Text style={{ fontSize: 13, color: Colors.lightgray, flex: 1, }}>Activity Date: {item.transactions}</Text>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Description:</Dialog.Title>
                <Dialog.Description>Do you want to delete this account? You cannot undo this action.</Dialog.Description>
                <Dialog.Button label="Cancel" onPress={()=>{setVisible(false)}} />
            </Dialog.Container>
        </TouchableOpacity>
    )

    useEffect(() => {
        let chic = []
        for (const value of Object.values(data.data.logs)) {
            chic.push(value)
          }
         setdata(chic)
    },[])
    return(
        <SafeAreaView style={{flex:1}}>
            <Text style={{textAlign:"center",fontWeight:"bold"}}>Next Commissions</Text>
            <CountDown
                until={60 * 10 + 30}
                onFinish={() => alert('finished')}
                onPress={() => alert('hello')}
                size={20}
            />
            <FlatList
                data={Data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}
export default Activity_Feeds;
