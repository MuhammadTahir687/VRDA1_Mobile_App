import React, { Component } from 'react'
import { Text, TouchableOpacity,Image } from 'react-native'
import PropTypes from 'prop-types';
import Colors from "../Style_Sheet/Colors";
import Entypo from "react-native-vector-icons/Entypo";

class Btn extends Component {
    static propTypes = {
        text: PropTypes.string,
        text1: PropTypes.string,
        text_style: PropTypes.any,
        containerStyle: PropTypes.any,
        img_style: PropTypes.any,
        onPress: PropTypes.func,
        image: PropTypes.any,
        onPress_icon: PropTypes.func,
        disabled:PropTypes.bool,
    }
    render() {
        return (
            <TouchableOpacity disabled={this.props.disabled} style={this.props.containerStyle} onPress={this.props.onPress}>
                {this.props.image &&
                <Image source={this.props.image} style={this.props.img_style}/>
                }
                <Text style={[{ color: Colors.secondary, textAlign: 'center' }, this.props.text_style ]}>{this.props.text}</Text>
                {this.props.text1 &&
                    <Text style={[{ color: Colors.white, textAlign: 'center' }, this.props.text_style ]}>{this.props.text1}</Text>
                }
            </TouchableOpacity>
        )
    }
}

export { Btn }
