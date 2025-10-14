import React from "react";
import { View, Pressable, Text, Linking, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as IntentLauncher from "expo-intent-launcher";
export const ActionRow: React.FC<{ phone?: string; whatsapp?: string; instagram?: string; coords?: { latitude: number; longitude: number }; vendorName: string }>
    = ({ phone, whatsapp, instagram, coords, vendorName }) => {
        const openDial = () => phone ? Linking.openURL(`tel:${phone}`) : Alert.alert("Sin teléfono");
        const openWA = () => whatsapp ? Linking.openURL(`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hola, vengo de la app de la Feria 16 de Julio 😊")}`) : Alert.alert("Sin WhatsApp");
        const openIG = () => instagram ? Linking.openURL(instagram.startsWith("http") ? instagram : `https://instagram.com/${instagram.replace("@", "")}`) : Alert.alert("Sin Instagram");
        const openMaps = () => {
            if (!coords) return;
            const { latitude, longitude } = coords;
            const url = Platform.select({ ios: `maps://?q=${encodeURIComponent(vendorName)}&ll=${latitude},${longitude}`, android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${encodeURIComponent(vendorName)})` });
            Linking.openURL(url!);
        };
        const Btn: React.FC<{ icon: any; label: string; onPress: () => void }>
            = ({ icon, label, onPress }) => (
                <Pressable onPress={onPress} style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 10, backgroundColor: "#111827", borderRadius: 10 }}>
                    <Ionicons name={icon} size={16} color="#fff" />
                    <Text style={{ color: "#fff", fontWeight: "700" }}>{label}</Text>
                </Pressable>
            );
        return (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                <Btn icon="call" label="Llamar" onPress={openDial} />
                <Btn icon="logo-whatsapp" label="WhatsApp" onPress={openWA} />
                <Btn icon="navigate" label="Ir" onPress={openMaps} />
                <Btn icon="logo-instagram" label="Instagram" onPress={openIG} />
            </View>
        );
    };