import React from 'react';
import {Image, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Quarterly from "./Tab_Screens/Quarterly_vreits";
import Withdrawal from "./Tab_Screens/Vreit_withdrawal";
import Vreit_Logs from "./Tab_Screens/Vreit_logs";
import Vreit_Transfer from "./Tab_Screens/Vreit_Transfer_C2C";
import Colors from "../../../Style_Sheet/Colors";

const Tab = createMaterialBottomTabNavigator();

const Vreit_Points=()=>{

    return(
        <SafeAreaView style={{flex:1}}>
            <Tab.Navigator  initialRouteName="Quarterly" activeColor="#fff">
                <Tab.Screen name="Quarterly" component={Quarterly} options={{tabBarLabel: 'Quarterly Vreit', tabBarColor: Colors.secondary, tabBarIcon: ({color}) => (<Image source={require("../../../Assets/vector.png")} style={{height:20,width:20}}/>)}}/>
                <Tab.Screen name="Withdrawal" component={Withdrawal} options={{tabBarLabel: 'Vreit Withdrawal', tabBarColor: '#e67300', tabBarIcon: ({color}) => (<Image source={require("../../../Assets/vector.png")} style={{height:20,width:20}}/>)}}/>
                <Tab.Screen name="Vreit_Logs" component={Vreit_Logs} options={{tabBarLabel: 'Vreit Logs', tabBarColor: '#196619', tabBarIcon: ({color}) => (<Image source={require("../../../Assets/vector.png")} style={{height:20,width:20}}/>)}}/>
                <Tab.Screen name="Vreit_Transfer" component={Vreit_Transfer} options={{tabBarLabel: 'C2C Transfer', tabBarColor: '#552f7a', tabBarIcon: ({color}) => (<Image source={require("../../../Assets/vector.png")} style={{height:20,width:20}}/>)}}/>
            </Tab.Navigator>
        </SafeAreaView>
    )
}
export default Vreit_Points;
