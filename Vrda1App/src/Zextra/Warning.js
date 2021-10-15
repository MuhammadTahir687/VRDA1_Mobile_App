import React from "react";
import {SafeAreaView, Text, View} from 'react-native';
const Warning = () => {
  return(
      <View style={{borderWidth:1,margin:10,borderRadius:15,padding:5,backgroundColor:"rgba(255,0,0,0.16)"}}>
          <Text style={{color:"#ff0000",fontWeight:"bold",fontStyle:"italic"}}>Warning !!!</Text>
          <Text style={{fontSize:9}}>* Upon transfer request kindly make sure your wallet is secured.</Text>
          <Text style={{fontSize:9}}>* Any wrong hash address can cause loss of funds.</Text>
          <Text style={{fontSize:9}}>* Other then TRC20 USDT address may result in loss of your funds</Text>
          <Text style={{fontSize:9}}>* Funds will appear after 3rd party or block chain confirmation.</Text>
          <Text style={{fontSize:9}}>* VRDa1 is not responsible for any delay related to block chain confirmation time.</Text>
      </View>
  )
}
export default Warning
