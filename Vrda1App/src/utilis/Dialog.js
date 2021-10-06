import React from "react";
import {View,Text,SafeAreaView} from "react-native";
import Dialog from "react-native-dialog";

const Dialogs=({visible,title,description,onPress,children})=>{
    return(
        <SafeAreaView>
            <Dialog.Container visible={visible}>
                {title && <Dialog.Title>{title}:</Dialog.Title> }
                {description && <Dialog.Description>{description}</Dialog.Description> }
                {onPress && <Dialog.Button label="Cancel" onPress={onPress} /> }
                {children}
                </Dialog.Container>
        </SafeAreaView>
    )
}
export default Dialogs;
