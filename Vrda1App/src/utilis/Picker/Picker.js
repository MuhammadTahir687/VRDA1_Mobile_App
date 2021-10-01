import React from "react";
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = ({onValueChange,PickerData,onDonePress,onClose,}) => {
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
    />
  );
};
export default Dropdown;
