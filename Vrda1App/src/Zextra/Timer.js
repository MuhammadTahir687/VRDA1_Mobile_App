import React,{useState,useEffect} from "react";
import {SafeAreaView, Text, View} from 'react-native';
const Timer = ({date}) => {

    const [days,setDays]=useState(0);
    const [hours,setHours]=useState(0);
    const [minutes,setMinutes]=useState(0)
    const [seconds,setSeconds]=useState(0)
   
    useEffect(() => {
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            var deadline = new Date(date).getTime();
            var now = new Date().getTime();
            var t= deadline-now;
            setDays(Math.floor(t / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinutes(Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)));
            setSeconds(Math.floor((t % (1000 * 60)) / 1000));
            if(Math.floor(t / (1000 * 60 * 60 * 24)) <0){
                setDays(0)
                setHours(0)
                setMinutes(0)
                setHours(0)

            }
        }, 1000)
      
        return () => clearInterval(intervalId); //This is important
       
      }, [])

        // var deadline = new Date(date).getTime();
        //  var now = new Date().getTime();
        //  var t= deadline-now;
        //  setTimeout(()=>{
        //     setDays(Math.floor(t / (1000 * 60 * 60 * 24)));
        //     setHours(Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        //     setMinutes(Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)));
        //     setSeconds(Math.floor((t % (1000 * 60)) / 1000));
        //    } ,  10000);
  return(
      <View style={{flexDirection:"row"}}>
          <Text style={{fontWeight:"bold",fontSize:20,textAlign:"center"}}>{days} : {hours} : {minutes} : {seconds}</Text>
      </View>
     
  )
}
export default Timer
