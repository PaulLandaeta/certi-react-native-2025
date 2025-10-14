import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
export default function TabsLayout() {
return (
<Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#111827" }}>
<Tabs.Screen name="map" options={{ title: "Mapa", tabBarIcon: ({ color, size }) => <Ionicons name="map" color={color} size={size} /> }} />
<Tabs.Screen name="list" options={{ title: "Lista", tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} /> }} />
</Tabs>
);
}