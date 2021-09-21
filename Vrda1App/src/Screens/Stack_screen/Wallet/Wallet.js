import React from "react";
import {Image, SafeAreaView} from "react-native";
import Colors from "../../../Style_Sheet/Colors";
import WithdrawFunds from "./WalletTabs/WithdrawFunds";
import TransferFunds from "./WalletTabs/TransferFunds"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from "react-native-vector-icons/MaterialIcons";

const Tab = createMaterialBottomTabNavigator();

const Wallet=()=>{
    return(
        <SafeAreaView style={{flex:1}}>
            <Tab.Navigator  initialRouteName="DirectCommission" activeColor={Colors.primary} inactiveColor={Colors.lightgray} barStyle={{ backgroundColor: 'rgba(0,0,0,0.02)',paddingTop:10 }} lazy={true} optimizationsEnabled={true}>
                <Tab.Screen name="WithdrawFunds" component={WithdrawFunds} options={{tabBarLabel: 'Withdraw Funds', tabBarIcon: ({color}) => (<Image source={require("../../../Assets/withdraw.png")} style={{height:30,width:34,}}/>)}}/>
                <Tab.Screen name="TransferFunds" component={TransferFunds} options={{tabBarLabel: 'Transfer Funds',tabBarIcon: ({color}) => (<Image source={require("../../../Assets/transfer.png")} style={{height:45,width:40,bottom:10}}/>)}}/>
                {/*<Tab.Screen name="TransferFunds" component={TransferFunds} options={{tabBarLabel: 'Transfer Funds',tabBarIcon: ({color}) => (<MaterialCommunityIcons size={20} color={Colors.secondary} name={'transit-transfer'}/>)}}/>*/}
            </Tab.Navigator>
        </SafeAreaView>
    )
}
export default Wallet;
