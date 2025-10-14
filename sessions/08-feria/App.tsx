import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen } from "./src/screens/MapScreen";
import { VendorListScreen } from "./src/screens/VendorListScreen";
import { useFavorites } from "./src/store/useFavorites";
import { Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Mapa" component={MapScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="map" color={color} size={size} /> }} />
      <Tab.Screen name="Lista" component={VendorListScreen} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} /> }} />
    </Tab.Navigator>
  );
}


export default function App() {
  const hydrate = useFavorites((s) => s.hydrate);
  useEffect(() => { hydrate(); }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Feria 16 de Julio" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}