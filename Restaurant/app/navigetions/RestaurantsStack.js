import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddRestaurant from "../screeens/Restaurans/AddRestaurant";
import Restaurants from "../screeens/Restaurans/Restaurants";

const Stack = createStackNavigator()

export default function RestaurantsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="restaurants"
        component={Restaurants}
        options={{ title: "Restarantes" }}

      /> 
        <Stack.Screen
        name="add-restauran"
        component={AddRestaurant}
        options={{ title: "crear Restaurante" }}

      />  
    </Stack.Navigator>
  )
}

