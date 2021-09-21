import React, { useState } from "react";
import { Text, View, ImageBackground, Image, ScrollView } from "react-native";
import Colors from "../../Style_Sheet/Colors";
import { FormInput } from "../../utilis/Text_input";
import { Btn } from "../../utilis/Btn";
import { loginValidation } from "../../utilis/validation";

const Login = ({navigation}) => {

  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState("talha@yahoo.com");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const Login=()=>{
    let validate = loginValidation(email)
    if (validate.valid === false) {
      setErrors(validate.errors)
    } else {
      navigation.replace("Drawers");
    }
  }
  return (
    <ImageBackground style={{flex: 1 }} source={require("../../Assets/background.png")}>
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
      error={errors === "Please Enter Your Password" ? "Please Enter Your Password" : null}
      />
      </ScrollView>
      <Btn text={"Login"} onPress={()=>Login()} containerStyle={{ backgroundColor: Colors.white, padding: 15, borderRadius: 25, marginTop: 15,marginHorizontal:50 }}/>
      </View>
    </ImageBackground>
  );
};
export default Login;
