import React from "react";
import {Text, View, SafeAreaView, Image,Platform} from "react-native";
import {Tooltip} from "react-native-elements";
import Colors from "../Style_Sheet/Colors";

const DoubleText = ({text1,text2,textstyle,containerstyle,textstyle1,sourceimg}) => {
    return (
            <View style={[{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start',margin:3,paddingHorizontal:17.5},containerstyle]}>
                <Text style={[{ width: '50%',fontWeight:"bold"},textstyle1]}>{text1}</Text>
                {text2 &&
                <Text style={[{width: '50%', fontSize: 13}, textstyle]}>
                    {text2.length > 13 ?
                        <Tooltip width={220} backgroundColor={Colors.primary}
                                 popover={<Text style={{color: Colors.white}}>{text2}</Text>}>
                            {Platform.OS == "ios" ?
                                <Text>{text2.slice(0, 13) + "..."}</Text>
                                : <Text>{text2.slice(0, 15) + "..."}</Text>
                            }
                        </Tooltip>
                        : text2
                    }
                </Text>
                }
                {sourceimg &&
                    <Image source={sourceimg} style={{height:100,width:100}}/>

                }
            </View>
    )
}
export default DoubleText;
