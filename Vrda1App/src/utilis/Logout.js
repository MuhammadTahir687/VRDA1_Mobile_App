import React, { useState, useEffect, useContext } from "react";
import { Text, ScrollView, SafeAreaView, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { setAccount, setBtcAccount, setPassword, setValt } from "../store/mainSlice";
import { useDispatch, useSelector } from "react-redux";

const Logout = async (route) => {
    useEffect(() => {alert("aDADADAA")})
    // const dispatch = useDispatch();
    // try {
    //     await AsyncStorage.getAllKeys()
    //         .then(keys => AsyncStorage.multiRemove(keys))
    //         .then(() => dispatch(setAccount(null)))
    //         .then(() => dispatch(setBtcAccount(null)))
    //         .then(() => navigation.reset({
    //             index: 0,
    //             routes: [{ name: route }],
    //         }));
    // } catch (exception) {
    //     return "Error";
    // }
}

export default Logout