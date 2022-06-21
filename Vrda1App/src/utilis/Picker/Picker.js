import React from "react";
import RNPickerSelect from 'react-native-picker-select';
import {Platform} from "react-native";
import { Icon } from 'react-native-elements';

const Dropdown = ({onValueChange,PickerData,onDonePress,onClose,disable,placeholder,value}) => {
  return (
    <RNPickerSelect
      onDonePress={onDonePress}
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
          // viewContainer:{paddingTop:Platform.OS === 'ios' ? 25 : null,marginBottom:Platform.OS === 'ios' ? 5:null,paddingHorizontal:Platform.OS === 'ios' ? 15 : null,}
      }}
        // items={[{ label: 'Football', value: 'football' },{ label: 'Baseball', value: 'baseball' },{ label: 'Hockey', value: 'hockey' },]}

      disabled={disable}
      placeholder={{
        label:"Select User",
        value:placeholder}}
      // Icon={() => {
      //     return <Icon
      //         name="chevron-down"
      //         type="feather"
      //         underlayColor="transparent"
      //         iconStyle={{color: '#333333', fontSize:25}}
      //     />
      // }}
      style={{
          inputAndroid: {
              backgroundColor: 'transparent',
              color: 'black',
              fontSize: 14,
              paddingLeft:5
          },
          inputIOS: {
              color: 'black',
              fontSize: 14,
              // lineHeight: 17,
              paddingBottom:10,
              paddingTop:20,
              paddingLeft:5,
              alignItems: 'center' }, }}
      useNativeAndroidPickerStyle={false}
      // textInputProps={{ underlineColorAndroid: 'red' }}
    />

  );
};
export default Dropdown;
