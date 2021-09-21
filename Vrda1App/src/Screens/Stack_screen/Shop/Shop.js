import React,{useRef} from "react";
import {View, Text, FlatList, SafeAreaView, TouchableOpacity, Image, ImageBackground} from "react-native";
import Colors from "../../../Style_Sheet/Colors";
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from "react-native-raw-bottom-sheet";

const Shop=()=>{
    const refRBSheet = useRef();
    const Data=[
        {id: '1', title: 'Apex',amount:"$50000",percent:"150%"},
        {id: '2', title: 'Premium',amount:"$25000",percent:"100%"},
        {id: '3', title: 'Master',amount:"$20000",percent:"90%"},
        {id: "4",title: "Super",amount:"$10000",percent:"80%"},
        {id: "5",title: "Pro",amount:"$5000",percent:"70%"},
        {id: "6",title: "Classic",amount:"$1000",percent:"60%"},
        {id: "7",title: "Beginner",amount:"$500",percent:"50%"},
        {id: "8",title: "Kick Start",amount:"$200",percent:"40%"},
    ]
    const renderItem=({item})=>(
        <View style={{flex:1}}>
        <TouchableOpacity onPress={() => refRBSheet.current.open()} style={{flex:1,marginHorizontal:5}}>
            <LinearGradient colors={['#333232', '#a9a6a6']} style={{paddingHorizontal:15, borderRadius: 10, margin:4,flex:1}}>
                <View style={{padding:10}}>
                <Text style={{fontWeight:"bold",color:Colors.white,fontSize:18}}>{item.title}</Text>
                <Text style={{color:Colors.white}}>{item.amount}</Text>
                <Text style={{textAlign:"center",marginVertical:40,padding:7,borderRadius:5,borderWidth:1,borderColor:Colors.white,color:Colors.white,fontSize:12}}>Subscription $50</Text>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                <Text style={{paddingVertical:5,paddingHorizontal:10,backgroundColor:Colors.primary,borderRadius:6,fontSize:10,color:Colors.white}}>{item.percent}</Text>
                    <Text style={{color:Colors.white,fontSize:11}}>  VREIT Bonus Point</Text>
                </View>
                </View>
            </LinearGradient>
            </TouchableOpacity>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0,0,0,0.47)"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <Text>{item.title}</Text>
            </RBSheet>
        </View>
    )
    return(
        <SafeAreaView style={{flex:1}}>
            <Text style={{textAlign:"center",fontSize:18,fontWeight:"bold",color:Colors.secondary}}>Buy Package</Text>
            <FlatList
                data={Data}
                renderItem={renderItem}
                numColumns={2}
                style={{ flex: 1 }}
            />
        </SafeAreaView>
    )
}
export default Shop;
