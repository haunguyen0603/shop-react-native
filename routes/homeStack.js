import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from 'react-native';


const screens = {
    Home: {
        screen: Home
    },
    Review: {
        screen: Review
    }
}

const HomeStack = createStackNavigator();

export default createAppContainer(HomeStack);
