import React from "react";
import {View,Text,SafeAreaView} from "react-native";
import Dialog from "react-native-dialog";

const Dialogs=({visible,title,description,onPress,children,description1})=>{
    return(
        <SafeAreaView>
            <Dialog.Container visible={visible}>
                {title && <Dialog.Title style={{fontSize:18}}> {title}:</Dialog.Title> }
                {description && <Dialog.Description style={{fontSize:14,marginHorizontal:5}}>{description}</Dialog.Description> }
                {description1 &&
                <View style={{marginHorizontal:15}}>
                    <Text style={{fontSize:15,fontWeight:"bold"}}>Feedback</Text>
                    <Dialog.Description style={{fontSize:14}}>{description1}</Dialog.Description>
                </View>}
                {onPress && <Dialog.Button label="Cancel" onPress={onPress} /> }
                {children}
                </Dialog.Container>
        </SafeAreaView>
    )
}
export default Dialogs;
