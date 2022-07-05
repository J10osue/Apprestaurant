import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "react-native-elements";

import RestaurantsStack from "./RestaurantsStack";
import FavoritesStack from "./FavoritesStack ";
import TopRestaurantsStack from "./TopRestaurantsStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();

export default function navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName=" restaurants "
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "#00a680",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />

        <Tab.Screen
          name="favorites"
          component={FavoritesStack}
          options={{ title: "Favoritos" }}
        />

        <Tab.Screen
          name="restaurants"
          component={RestaurantsStack}
          options={{ title: "Restaurante" }}
        />

        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Buscar" }}
        />

        <Tab.Screen
          name="toprestaurants"
          component={TopRestaurantsStack}
          options={{ title: "principales restaurantes" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function screenOptions(route, color) {
  let iconname;
  switch (route.name) {
    case "restaurants":
        iconname = "compass-outline";
        break
    case "favorites":
        iconname = "heart-outline";
        break
    case "toprestaurants":
        iconname = "star-outline";
        break
    case 'search':
        iconname='magnify'    
        break
    case 'account':
        iconname= 'home-outline'  
        break
  }
  return (
      <Icon type= 'material-community' name={iconname} size={22} color={color}/>
  )

}


