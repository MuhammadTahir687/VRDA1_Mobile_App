import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import Colors from "../src/StyleSheet/Colors";
import PropTypes from 'prop-types';

export default class CryptoView extends Component {
    static propTypes = {
        title: PropTypes.string,
        short_name: PropTypes.string,
        balance: PropTypes.any,
        value: PropTypes.any,
        style: PropTypes.any,

    }

    render() {
        return (
            <View style={[this.props.style, { backgroundColor: Colors.dark, padding: 20, alignSelf: 'center', borderRadius: 20 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {this.props.title === "Ethereum" ? <Image source={require("../src/Assets/img.png")} style={{ height: 35, width: 21.5, }} /> :
                        this.props.title === "BTC" ? <Image source={require("../src/Assets/BTC.png")} style={{ height: 32.5, width: 32.5, }} /> :
                        this.props.title === "Tether" ? <Image source={require("../src/Assets/Tether.png")} style={{ height: 35, width: 35, }} /> : null
                    }
                    <Text style={{ color: Colors.white, fontSize: 16 }}>  {this.props.title}</Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <Text style={{ color: Colors.balance, fontSize: 12 }}>Balance</Text>
                    <Text style={{ color: Colors.white }}>{this.props.balance ? parseFloat(this.props.balance).toFixed(4) : "0"} {this.props.short_name}</Text>
                    <Text style={{ color: Colors.balance, fontSize: 12 }}>Value</Text>
                    <Text style={{ color: Colors.white }}>{parseFloat(this.props.value).toFixed(4)} USD</Text>
                </View>
            </View>
        )
    }
}