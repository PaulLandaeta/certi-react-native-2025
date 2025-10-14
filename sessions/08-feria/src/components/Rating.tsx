import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export const Rating: React.FC<{ value: number }>
    = ({ value }) => {
        const full = Math.floor(value);
        const dots = Array.from({ length: 5 });
        return (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                {dots.map((_, i) => <Ionicons key={i} name={i < full ? "star" : "star-outline"} size={16} color="#f59e0b" />)}
                <Text style={{ fontSize: 12, color: "#6b7280" }}>{value.toFixed(1)}</Text>
            </View>
        );
    };