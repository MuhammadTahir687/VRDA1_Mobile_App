import React,{useEffect,useRef} from "react";
import {Animated,Text,View} from "react-native";
import Colors from "../Style_Sheet/Colors";
const getRandomMessage=()=>{
    const number=Math.trunc(Math.random()*10000)
    return "Random Message"+number
};
const Message=(props)=>{
    const opacity=useRef(new Animated.Value(0)).current;
    useEffect(()=>{
        Animated.sequence([
            Animated.timing(opacity,{toValue:1,duration:500,useNativeDriver:true}),
            Animated.delay(2000),
            Animated.timing(opacity,{toValue:0,duration:500,useNativeDriver:true})
        ]).start();
    },[]);
    return(
        <Animated.View style={{opacity,transform:[{translateY:opacity.interpolate({inputRange:[0,1],outputRange:[-20,0],})}], margin:10,marginBottom:5,backgroundColor:Colors.white,padding:10,borderRadius:4,shadowColor:Colors.dark,shadowOffset:{width:0,height:3},shadowOpacity:0.15,shadowRadius:5,elevation:6}}>
            <Text>{props.message}</Text>
        </Animated.View>
    )
}
export default ()=>{
    return <Message message="Hello World"/>
}
