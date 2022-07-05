import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Account from '../screeens/Account/Account'
import Login from "../screeens/Account/Login";
import Register from "../screeens/Account/Register";

const Stack = createStackNavigator();

export default function  AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ title: " mi Cuenta" }}
        
      />

      <Stack.Screen
       name='login'
       component={Login}
       options={{title:'inicie sesion'}}
      />



<Stack.Screen
 name='register'
 component={Register}
 options={{title:'Registro'}}
/>

    </Stack.Navigator>
  )
}
