import React, { Component } from 'react'
import { Text, TouchableOpacity,Image } from 'react-native'
import PropTypes from 'prop-types';
import Colors from "../Style_Sheet/Colors";

class Btn extends Component {
    static propTypes = {
        text: PropTypes.string,
        containerStyle: PropTypes.any,
        onPress: PropTypes.func,
        text1: PropTypes.string,
        image: PropTypes.any,
        text_style: PropTypes.any,
        img_style: PropTypes.any
    }
    render() {
        return (
            <TouchableOpacity style={this.props.containerStyle} onPress={this.props.onPress}>
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
