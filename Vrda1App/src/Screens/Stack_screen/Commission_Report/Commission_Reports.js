import React from "react";
import {Image, SafeAreaView} from "react-native";
import Colors from "../../../Style_Sheet/Colors";
import AllCommission from "./Commission_Report_Tabs/AllCommission";
import DirectCommission from "./Commission_Report_Tabs/DirectCommission";
import BinaryCommission from "./Commission_Report_Tabs/BinaryCommission";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const Commission_Reports=()=>{
    return(
        <SafeAreaView style={{flex:1}}>
            <Tab.Navigator  initialRouteName="DirectCommission" activeColor={Colors.primary} inactiveColor={Colors.lightgray} barStyle={{ backgroundColor:'rgba(0,0,0,0.02)',paddingTop:10 }} lazy={true} optimizationsEnabled={true}>
                <Tab.Screen name="DirectCommission" component={DirectCommission} options={{tabBarLabel: 'Direct', tabBarIcon: ({color}) => (<MaterialCommunityIcons color={Colors.primary}  size={25} name={"sack-percent"}/>)}}/>
                <Tab.Screen name="BinaryCommission" component={BinaryCommission} options={{tabBarLabel: 'Binary',tabBarIcon: ({color}) => (<Image source={require("../../../Assets/binary.png")} style={{height:27,width:27}}/>)}}/>
                <Tab.Screen name="AllCommission" component={AllCommission} options={{tabBarLabel: 'All', tabBarIcon: ({color}) => (<Image source={require("../../../Assets/all.png")} style={{height:27,width:27}}/>)}}/>
            </Tab.Navigator>
        </SafeAreaView>
    )
}
export default Commission_Reports;
