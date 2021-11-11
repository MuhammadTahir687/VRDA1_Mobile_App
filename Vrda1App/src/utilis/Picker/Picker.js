import React from "react";
import RNPickerSelect from 'react-native-picker-select';
import {Text} from "react-native";
import {placeholderName} from "react-native/template.config";
import {placeholderTextColor} from "react-native/Libraries/DeprecatedPropTypes/DeprecatedTextInputPropTypes";
import Colors from "../../Style_Sheet/Colors";

const Dropdown = ({onValueChange,PickerData,onDonePress,onClose,disable,placeholder,value}) => {
  return (
    <RNPickerSelect
      onDonePress={onDonePress}
      // onValueChange={(value) => console.log(value)}
      onValueChange={onValueChange}
      items={PickerData}
      style={{
        iconContainer: {
          top: 40,
          right: 10,
        },
        placeholder: {
          color: 'rgba(157,153,153,0.98)',
          fontSize: 18,
          fontWeight: 'bold',
        },

      }}      // items={[
      //   { label: 'Football', value: 'football' },
      //   { label: 'Baseball', value: 'baseball' },
      //   { label: 'Hockey', value: 'hockey' },
      // ]}
        disabled={disable}
      placeholder={placeholder}
    />

  );
};
export default Dropdown;
