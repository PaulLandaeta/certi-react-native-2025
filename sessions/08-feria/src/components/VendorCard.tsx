import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Vendor } from "../types";
import { useFavorites } from "../store/useFavorites";
import { Ionicons } from "@expo/vector-icons";
export const VendorCard: React.FC<{ v: Vendor; onPress?: () => void }> = ({ v, onPress }) => {
    const { favs, toggle } = useFavorites();
    const isFav = !!favs[v.id];
    return (
        <Pressable onPress={onPress} style={c.card}>
            <View style={{ flex: 1 }}>
                <Text style={c.title}>{v.name}</Text>
                <Text style={c.meta}>{v.category} • {v.zone ?? "Sin zona"} {v.priceRange ? `• ${v.priceRange}` : ""}</Text>
                {!!v.tags?.length && <Text style={c.tags}>{v.tags.slice(0, 3).join(" • ")}</Text>}
            </View>
            <Pressable onPress={() => toggle(v.id)} hitSlop={10}>
                <Ionicons name={isFav ? "heart" : "heart-outline"} size={22} color={isFav ? "#ef4444" : "#6b7280"} />
            </Pressable>
        </Pressable>
    );
};
const c = StyleSheet.create({ card: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#e5e7eb" }, title: { fontSize: 15, fontWeight: "700" }, meta: { fontSize: 12, color: "#6b7280" }, tags: { fontSize: 12, color: "#374151", marginTop: 2 } });