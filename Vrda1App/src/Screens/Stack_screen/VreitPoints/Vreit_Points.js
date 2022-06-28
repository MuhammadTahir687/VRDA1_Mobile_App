import React from 'react';
import {Image, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Quarterly from "./Tab_Screens/Quarterly_vreits";
import Withdrawal from "./Tab_Screens/Vreit_withdrawal";
import Vreit_Logs from "./Tab_Screens/Vreit_logs";
import Vreit_Transfer from "./Tab_Screens/Vreit_Transfer_C2C";
import Colors from '../../../Style_Sheet/Colors';
import BuyVreit from './Tab_Screens/BuyVreit';
import EscrowAlert from './Tab_Screens/EscrowAlert';
const Tab = createMaterialBottomTabNavigator();

const Vreit_Points=()=>{

    return(
        <SafeAreaView style={{flex:1}}>
            <Tab.Navigator  initialRouteName="Buy Vreit" activeColor={Colors.primary}>
            <Tab.Screen name="Buy Vreit" component={BuyVreit}  options={{tabBarLabel: 'Buy Vreit', tabBarColor:"rgba(0,0,0,0.07)", tabBarIcon: ({color}) => (<Image source={require("../../../Assets/qarter.png")} style={{height:25,width:25,}}/>)}}/>
                <Tab.Screen name="Quarterly" component={Quarterly}  options={{tabBarLabel: 'Quarterly Vreit', tabBarColor:"rgba(0,0,0,0.07)", tabBarIcon: ({color}) => (<Image source={require("../../../Assets/qarter.png")} style={{height:25,width:25,}}/>)}}/>
                <Tab.Screen name="Escrow Alert" component={EscrowAlert} options={{tabBarLabel: 'Escrow', tabBarColor: 'rgba(0,0,0,0.07)', tabBarIcon: ({color}) => (<Image source={require("../../../Assets/c2c.png")} style={{height:25,width:25}}/>)}}/>
                <Tab.Screen name="Withdrawal" component={Withdrawal} options={{tabBarLabel: 'Vreit Withdrawal', tabBarColor: 'rgba(0,0,0,0.07)', tabBarIcon: ({color}) => (<Image source={require("../../../Assets/withdrawvreit.png")} style={{height:25,width:25}}/>)}}/>
                <Tab.Screen name="Vreit_Logs" component={Vreit_Logs} options={{tabBarLabel: 'Vreit Logs', tabBarColor: 'rgba(0,0,0,0.07)', tabBarIcon: ({color}) => (<Image source={require("../../../Assets/vreitLogs.png")} style={{height:25,width:25}}/>)}}/>
                <Tab.Screen name="Vreit_Transfer" component={Vreit_Transfer} options={{tabBarLabel: 'C2C Transfer', tabBarColor: 'rgba(0,0,0,0.07)', tabBarIcon: ({color}) => (<Image source={require("../../../Assets/c2c.png")} style={{height:25,width:25}}/>)}}/>

            </Tab.Navigator>
        </SafeAreaView>
    )
}
export default Vreit_Points;
