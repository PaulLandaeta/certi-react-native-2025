import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { useFavorites } from "../src/store/useFavorites";
export default function RootLayout() {
    const hydrate = useFavorites((s) => s.hydrate);
    useEffect(() => { hydrate(); }, []);
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="vendor/[id]" options={{ presentation: "modal", headerShown: true, title: "Detalle" }} />
        </Stack>
    );
}