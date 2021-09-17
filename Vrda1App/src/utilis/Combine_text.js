import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
// import RadioButtonRN from 'radio-buttons-react-native';
// import RNPickerSelect from 'react-native-picker-select';
import { AppText } from "./AppText";
import Colors from "../Style_Sheet/Colors";
import Theme from '../Style_Sheet/Theme'

class Combine_text extends Component {
    static propTypes = {
        text1: PropTypes.string,
        text2: PropTypes.string,
    }

    render() {
        return (
            <View style={Theme.combine_t_container}>
                <Text style={[Theme.combine_text, { color: Colors.secondary }]}>{this.props.text1}</Text>
                <Text style={[Theme.combine_text, { color: Colors.white }]}>{this.props.text2}</Text>
            </View>
        )
    }
}

class Combine_Touchable_text extends Component {
    static propTypes = {
        text1: PropTypes.string,
        text2: PropTypes.string,
        onPress: PropTypes.func
    }

    render() {
        return (
            <View style={Theme.combine_t_t_container}>
                <Text style={{ color: Color.white }}>{this.props.text1}</Text>
                <TouchableOpacity onPress={this.props.onPress}>
                    <Text style={{ color: Color.greyish }}> {this.props.text2}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export { Combine_text, Combine_Touchable_text }