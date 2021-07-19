import React, {Components} from "react";
import { View, Text } from "react-native";

export default class manHinhA extends Components {
    render(){
        return(
            <View style={style.container}>
                <Text style={{font:100, color:white}}>C</Text>
            </View>
        )
    }
}

var style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "red", 
        alignItems: 'center',
        justifyContent: 'center',
    }
})