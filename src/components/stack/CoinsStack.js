import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../splash/Splash';
import Home from '../home/Home';




const Stack = createStackNavigator();

const CoinsStack = () => {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );

}
export default CoinsStack;