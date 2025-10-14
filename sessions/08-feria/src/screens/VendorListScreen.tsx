import React, { useMemo, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { VENDORS } from "../data/vendors";
import { Vendor } from "../types";
import { VendorCard } from "../components/VendorCard";
import { CategoryChips } from "../components/CategoryChips";
import { SearchBar } from "../components/SearchBar";


export const VendorListScreen: React.FC = () => {
const [search, setSearch] = useState("");
const [category, setCategory] = useState<string>("Todos");
const [zone, setZone] = useState<string>("");


const data = useMemo(() => {
const q = search.trim().toLowerCase();
return VENDORS.filter(v => {
const matchesText = !q || v.name.toLowerCase().includes(q) || v.description?.toLowerCase().includes(q);
const matchesCat = category === "Todos" || v.category === category;
const matchesZone = !zone || v.zone === zone;
return matchesText && matchesCat && matchesZone;
});
}, [search, category, zone]);


const empty = (
<View style={{ padding: 24 }}>
<Text>No hay resultados. Ajusta filtros o busca otro término.</Text>
</View>
);


return (
<View style={{ flex: 1, padding: 12, gap: 8 }}>
<SearchBar value={search} onChange={setSearch} placeholder="Buscar por nombre o descripción..." />
<CategoryChips value={category} onChange={setCategory} />
<FlatList data={data} keyExtractor={(v: Vendor) => v.id} renderItem={({ item }) => <VendorCard v={item} />} ListEmptyComponent={empty} />
</View>
);
};