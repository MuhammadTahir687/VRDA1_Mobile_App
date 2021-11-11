import React, {useEffect, useState} from "react";
import { Text, View, ImageBackground, Image, ScrollView, } from "react-native";
import Colors from "../../Style_Sheet/Colors";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import { loginValidation } from "../../utilis/validation";
import { get_data, save_data } from "../../utilis/AsyncStorage/Controller";
import Loader from "../../utilis/Loader";
import {LoginApi} from "../../utilis/Api/Api_controller";
import Toast from "react-native-simple-toast";


const Login = ({navigation}) => {
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [isloading, setLoading] = useState(false);

    const login=async ()=>{
    let validate = loginValidation(email,password)
    if (validate.valid === false) {
      setErrors(validate.errors)
    } else {
        setErrors("")
        let body = {email: email, password: password,};
        setLoading(true)
        let response = await LoginApi(body)
        if (response !== "Error") {
            if (response.data.status == true) {
                let Bearer = response.data.access_token;
                await save_data("ACCOUNT_DATA", Bearer)
                setLoading(false);
                navigation.replace("Drawers");
            }else {
                Toast.show("Invalid Email or Password !", Toast.LONG);
                setLoading(false);
            }
        }else {
            alert(JSON.stringify(response))
            Toast.show("Network Error: There is something wrong!", Toast.LONG);
            setLoading(false);
        }
    }
  }
  return (
    <ImageBackground style={{flex: 1 }} source={require("../../Assets/background.png")}>
        <Loader animating={isloading} />
        <View style={{marginHorizontal:30,justifyContent:"space-evenly",bottom:5}}>
      <ScrollView>
      <Image resizeMode="contain" style={{ alignSelf: "center", height: 250, width: 219,marginTop:20 }} source={require("../../Assets/vector.png")} />
      <Text style={{ fontSize: 40, color: Colors.white, fontWeight: "bold" }}>Login</Text>
      <FormInput
        placeholder={"Email"}
        placeholderTextColor={Colors.white}
        iconName_s="user"
        icon_color={Colors.white}
        value={email}
        color={Colors.white}
        keyboardType={'email-address'}
        containerStyle={{ marginTop: 15 }}
        onChangeText={(text) => { setErrors(""), setEmail(text) }}
        error={errors === "Please Enter Your Email" ? "Please Enter Your Email" : null || errors === "Email format is invalid" ? "Email format is invalid" : null}
      />
      <FormInput
        placeholder={"Password"}
        placeholderTextColor={Colors.white}
        iconName_s="lock"
        forget={true}
        containerStyle={{ marginTop: 10 }}
        color={Colors.white}
        text_input_container={{ flexDirection: "row" }}
        iconName={secure ? "eye-with-line" : "eye"}
        icon_color={Colors.white}
        value={password}
        onPress_icon={() => { setSecure(!secure) }}
        secureTextEntry={secure}
        onChangeText={(text) => { setErrors(""), setPassword(text) }}
        ForgetPassword={() => { alert("adadadada") }}
        error={errors === "Please Enter Your Password" ? "Please Enter Your Password" : null ||errors === "Password must should contain 6 digits"?"Password must should contain 6 digits":null}
      />
      </ScrollView>
      <Btn text={"Login"} onPress={() =>{login()}}  containerStyle={{ backgroundColor: Colors.white, padding: 15, borderRadius: 25, marginTop: 15,marginHorizontal:50 }}/>
      </View>
    </ImageBackground>
  );
};
export default Login;
