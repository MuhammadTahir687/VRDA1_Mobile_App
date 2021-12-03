import React from "react";
import {Image, SafeAreaView} from "react-native";
import Colors from "../../../Style_Sheet/Colors";
import OwnershipPurchase from "./RouteScreens/OwnershipPurchase";
import MyPurchase from "./RouteScreens/MyPurchase";
import PurchaseRequest from "./RouteScreens/PurchaseRequest";
import ReceivingHistory from "./RouteScreens/ReceivingHistory";
import TeamSale from "./RouteScreens/TeamSale";
import TransferHistory from "./RouteScreens/TransferHistory";
import WithdrawHistory from "./RouteScreens/WithdrawHistory";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const Commission_Reports=()=>{
    return(
        <SafeAreaView style={{flex:1}}>
            <Tab.Navigator initialRouteName="MyPurchase" activeColor={Colors.primary} inactiveColor={Colors.lightgray} barStyle={{ backgroundColor:'rgba(0,0,0,0.02)',paddingTop:10 }} lazy={true} optimizationsEnabled={true}>
                <Tab.Screen name="MyPurchase" component={MyPurchase} options={{tabBarLabel: '', tabBarIcon: ({color}) => (<Image source={require("../../../Assets/MyPurchase.png")} style={{height:27,width:27}}/>)}}/>
                <Tab.Screen name="OwnershipPurchase" component={OwnershipPurchase} options={{tabBarLabel: '',tabBarIcon: ({color}) => (<Image source={require("../../../Assets/OwnershipPurchase.png")} style={{height:27,width:27}}/>)}}/>
                <Tab.Screen name="TeamSale" component={TeamSale} options={{tabBarLabel: '', tabBarIcon: ({color}) => (<Image source={require("../../../Assets/TeamSale.png")} style={{height:27,width:27}}/>)}}/>
                <Tab.Screen name="PurchaseRequest" component={PurchaseRequest} options={{tabBarLabel: '', tabBarIcon: ({color}) => (<Image source={require("../../../Assets/purchaseRequest.png")} style={{height:27,width:27}}/>)}}/>
                <Tab.Screen name="TransferHistory" component={TransferHistory} options={{tabBarLabel: '',tabBarIcon: ({color}) => (<Image source={require("../../../Assets/TransferHistory.png")} style={{height:27,width:27}}/>)}}/>
                <Tab.Screen name="ReceivingHistory" component={ReceivingHistory} options={{tabBarLabel: '',tabBarIcon: ({color}) => (<Image source={require("../../../Assets/ReceiveHistory.png")} style={{height:27,width:27}}/>)}}/>
                <Tab.Screen name="WithdrawHistory" component={WithdrawHistory} options={{tabBarLabel: '',tabBarIcon: ({color}) => (<Image source={require("../../../Assets/WithdrawHistory.png")} style={{height:27,width:27}}/>)}}/>
             </Tab.Navigator>
        </SafeAreaView>
    )
}
export default Commission_Reports;
