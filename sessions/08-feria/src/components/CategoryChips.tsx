import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { CATEGORIES } from "../data/vendors";
export const CategoryChips: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => (
<View style={s.row}>
{CATEGORIES.map((c) => (
<Pressable key={c} onPress={() => onChange(c)} style={[s.chip, value === c && s.chipActive]}>
<Text style={[s.text, value === c && s.textActive]}>{c}</Text>
</Pressable>
))}
</View>
);
const s = StyleSheet.create({ row: { flexDirection: "row", flexWrap: "wrap", gap: 8 }, chip: { paddingHorizontal: 10, paddingVertical: 8, borderRadius: 999, backgroundColor: "#f4f4f5" }, chipActive: { backgroundColor: "#111827" }, text: { fontSize: 13, color: "#111827" }, textActive: { color: "white" } });