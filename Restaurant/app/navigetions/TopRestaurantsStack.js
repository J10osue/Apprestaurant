import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopRestaurants from '../screeens/TopRestaurants'

const Stack = createStackNavigator();

export default function TopRestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="toprestaurante"
        component={TopRestaurants}
        options={{ title: "toprestaurante" }}
        
      />
    </Stack.Navigator>
  );
}
