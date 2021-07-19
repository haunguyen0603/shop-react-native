import React, {Components} from "react";
import { View, Text } from "react-native";

export default class manHinhA extends Components {
    render(){
        return(
            <View style={style.container}>
                <Text style={{font:100, color:white}}>B</Text>
            </View>
        )
    }
}

var style = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "yellow", 
        alignItems: 'center',
        justifyContent: 'center',
    }
})