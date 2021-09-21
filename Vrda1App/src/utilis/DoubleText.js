import React from "react";
import {Text, View, SafeAreaView} from "react-native";

const DoubleText = ({text1,text2,textstyle,containerstyle}) => {
    return (
            <View style={[{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start',margin:3,paddingHorizontal:17.5},containerstyle]}>
                <Text style={{ width: '50%',fontWeight:"bold"}}>{text1}</Text>
                <Text style={[{ width: '50%',fontSize:13},textstyle]}>{text2.length>15?text2.slice(0,15)+"...":text2}</Text>
            </View>
    )
}
export default DoubleText;
