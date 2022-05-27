import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView, ImageBackground } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../Style_Sheet/Colors";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { source } from "react-native/Libraries/DeprecatedPropTypes/DeprecatedImagePropType";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
const ProfileView = ({ children, onPress, screen_title, username, firstname, lastname, onPressForUpdate, source, update }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: "center", paddingVertical: 20, margin: 35 }}>
                <TouchableOpacity>
                    <Entypo color={Colors.white} size={25} name={"chevron-left"} onPress={onPress} />
                </TouchableOpacity>
                <Text style={{ flex: 5, fontSize: 20, color: Colors.white }}> {screen_title}</Text>
            </View>
            <View style={{ backgroundColor: Colors.white, marginHorizontal: "7.5%", borderRadius: 8 }}>
                <View style={{ bottom: 50 }}>
                    {/* <Image source={source} style={{height:90,width:90,alignSelf:"center",borderWidth:4,borderColor:Colors.white,borderRadius:45,position:"absolute",zIndex:1}}/> */}
                    <View style={{alignItems:"center",marginBottom:0,paddingVertical:0}}>
                        <Avatar
                            size="large"
                            rounded
                            icon={{ name: 'user', type: 'font-awesome' }}
                            onPress={() => console.log("Works!")}
                            containerStyle={{ backgroundColor: "gray", borderWidth: 5,borderColor:"white" }}
                        />
                        
                      
                   
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center",paddingTop:10,marginTop:0 }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>{username}</Text>
                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>{firstname}</Text>
                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}>{lastname}</Text>
                    </View>
                    {onPressForUpdate &&
                        <TouchableOpacity onPress={onPressForUpdate} style={{ backgroundColor: Colors.secondary, borderRadius: 25, flexDirection: "row", padding: 5, justifyContent: "space-evenly", width: 145, alignSelf: "center", marginTop: 8 }}>
                            <EvilIcons color={Colors.white} size={22} name={"user"} />
                            <Text style={{ color: Colors.white, fontSize: 12 }}>Update {update}</Text>
                        </TouchableOpacity>
                    }
                </View>
                {children}
            </View>
        </View>
    )
}
export default ProfileView;
