import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
// import RadioButtonRN from 'radio-buttons-react-native';
// import RNPickerSelect from 'react-native-picker-select';
import { AppText } from "./AppText";
import Color from "../Style_Sheet/Colors";
import Theme from '../Style_Sheet/Theme';

// import DateTimePickerModal from "react-native-modal-datetime-picker";

class FormInput extends Component {

    static propTypes = {
        error: PropTypes.any,
        iconName: PropTypes.string,
        containerStyle: PropTypes.any,
        icon_color: PropTypes.string,
        onPress_icon: PropTypes.func,
        ForgetPassword: PropTypes.func,
        forget: PropTypes.bool,
        iconName_s: PropTypes.string,
        color:PropTypes.any,
    }

    render() {
        const { title, error, iconName, style, containerStyle, icon_color, onPress_icon, ForgetPassword, forget,color } = this.props;
        return (
            <View style={[this.props.containerStyle]} >
                <View style={Theme.text_input_container}>
                    <AntDesign color={this.props.icon_color} size={18} name={this.props.iconName_s} />
                    <TextInput
                        {...this.props}
                        autoCapitalize="none"
                        style={{ height: 40, flex: 1,color }} />
                    <Entypo color={this.props.icon_color} onPress={this.props.onPress_icon} size={18} name={this.props.iconName} />
                </View>
                {this.props.forget &&
                    <TouchableOpacity style={{ marginTop: 5 }} onPress={this.props.ForgetPassword}>
                        <Text style={{ textAlign: 'right', marginTop: 10, color: Color.white }}>Forget password?</Text>
                    </TouchableOpacity>
                }
                {this.props.error && <AppText style={{ color: "red" }} >{this.props.error}</AppText>}
            </View>
        );
    }
}

// class Simple_input extends Component {

//     static propTypes = {
//         title: PropTypes.string,
//         error: PropTypes.any,
//         containerStyle: PropTypes.any,
//         err_text: PropTypes.any,
//         onPress: PropTypes.func
//     }

//     render() {
//         const { title, error, iconName, style, containerStyle, icon_color, onPress_icon, ForgetPassword, forget } = this.props;
//         return (
//             <View style={[this.props.containerStyle]} >
//                 <TouchableOpacity onPress={this.props.onPress}>
//                     <TextInput
//                         {...this.props}
//                         autoCapitalize="none" />
//                 </TouchableOpacity>
//                 {this.props.error && <AppText style={[this.props.err_text, { color: "red" }]} >{this.props.error}</AppText>}
//             </View>
//         );
//     }
// }

// class PostJobForm extends Component {

//     static propTypes = {
//         title: PropTypes.string,
//         error: PropTypes.any,
//         containerStyle: PropTypes.any,
//         titleStyle: PropTypes.any
//     }

//     render() {
//         const { title, error, iconName, style, containerStyle, icon_color, onPress_icon, ForgetPassword, forget } = this.props;
//         return (
//             <View style={[this.props.containerStyle]} >
//                 <Text style={[this.props.titleStyle]}>{this.props.title}</Text>
//                 <View>
//                     <TextInput
//                         {...this.props}
//                         autoCapitalize="none"
//                     />
//                 </View>
//                 {this.props.error && <AppText style={{ color: "red" }} >{this.props.error}</AppText>}
//             </View>
//         );
//     }
// }

// class RadioButton extends Component {

//     static propTypes = {
//         error: PropTypes.any,
//         containerStyle: PropTypes.any,
//         err_text: PropTypes.any
//     }

//     render() {
//         const { title, error, iconName, style, containerStyle, icon_color, onPress_icon, ForgetPassword, forget } = this.props;
//         return (
//             <View style={[this.props.containerStyle]} >
//                 <View>
//                     <RadioButtonRN
//                         {...this.props}
//                     />
//                 </View>
//                 {this.props.error && <AppText style={[this.props.err_text, { color: "red" }]} >{this.props.error}</AppText>}
//             </View>
//         );
//     }
// }

// class Picker extends Component {

//     static propTypes = {
//         error: PropTypes.any,
//         containerStyle: PropTypes.any,
//         err_text: PropTypes.any
//     }

//     render() {
//         const { title, error, iconName, style, containerStyle, icon_color, onPress_icon, ForgetPassword, forget } = this.props;
//         return (
//             <View style={[this.props.containerStyle]} >
//                 <View>
//                     <RNPickerSelect
//                         {...this.props}
//                     />
//                 </View>
//                 {this.props.error && <AppText style={[this.props.err_text, { color: "red" }]} >{this.props.error}</AppText>}
//             </View>
//         );
//     }
// }

// class Dates extends Component {

//     static propTypes = {
//         error: PropTypes.any,
//         containerStyle: PropTypes.any,
//         err_text: PropTypes.any,
//         text: PropTypes.string,
//         onPress: PropTypes.func
//     }

//     render() {
//         const { title, error, iconName, style, containerStyle, icon_color, onPress_icon, ForgetPassword, forget } = this.props;
//         return (
//             <View style={[this.props.containerStyle]} >
//                         <TouchableOpacity onPress={this.props.onPress}>
//                             <Text style={{ color: '#383838', flex: 1, }}>{this.props.text}</Text>
//                         </TouchableOpacity>
//                 {this.props.error && <AppText style={[this.props.err_text, { color: "red" }]} >{this.props.error}</AppText>}
//             </View>
//         );
//     }
// }

// class S_Date extends Component {

//     static propTypes = {
//         error: PropTypes.any,
//         containerStyle: PropTypes.any,
//         err_text: PropTypes.any,
//         text: PropTypes.string,
//         onPress: PropTypes.func
//     }

//     render() {
//         const { title, error, iconName, style, containerStyle, icon_color, onPress_icon, ForgetPassword, forget } = this.props;
//         return (
//             <View style={[this.props.containerStyle]} >
//                         <TouchableOpacity onPress={this.props.onPress}>
//                             <Text style={{ color: '#383838', flex: 1, }}>{this.props.text}</Text>
//                         </TouchableOpacity>
//                 {this.props.error && <AppText style={[this.props.err_text, { color: "red" }]} >{this.props.error}</AppText>}
//             </View>
//         );
//     }
// }

// class E_Date extends Component {

//     static propTypes = {
//         error: PropTypes.any,
//         containerStyle: PropTypes.any,
//         err_text: PropTypes.any,
//         text: PropTypes.string,
//         onPress: PropTypes.func
//     }

//     render() {
//         const { title, error, iconName, style, containerStyle, icon_color, onPress_icon, ForgetPassword, forget } = this.props;
//         return (
//             <View style={[this.props.containerStyle]} >
//                         <TouchableOpacity onPress={this.props.onPress}>
//                             <Text style={{ color: '#383838', flex: 1, }}>{this.props.text}</Text>
//                         </TouchableOpacity>
//                 {this.props.error && <AppText style={[this.props.err_text, { color: "red" }]} >{this.props.error}</AppText>}
//             </View>
//         );
//     }
// }




// export { FormInput, Simple_input, PostJobForm, RadioButton, Picker, Dates, S_Date, E_Date }
export { FormInput }
